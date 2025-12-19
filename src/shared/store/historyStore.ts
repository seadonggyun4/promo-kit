import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import {
    HistoryStore,
    EditorSnapshot,
    HistoryActionType,
    MAX_HISTORY_SIZE,
    SNAPSHOT_DEBOUNCE_MS,
    createSnapshot,
    DEFAULT_HISTORY_STATE,
} from '@/shared/types/history';
import { ElementData } from '@/shared/types';

/**
 * History store using Zustand
 * Implements undo/redo functionality with snapshot-based state management
 */
export const useHistoryStore = create<HistoryStore>()(
    subscribeWithSelector((set, get) => {
        let debounceTimer: ReturnType<typeof setTimeout> | null = null;

        return {
            // Initial state
            ...DEFAULT_HISTORY_STATE,

            /**
             * Undo - restore previous state
             */
            undo: () => {
                const { past, present, future, isEnabled } = get();

                if (!isEnabled || past.length === 0 || !present) {
                    return null;
                }

                const previous = past[past.length - 1];
                const newPast = past.slice(0, -1);

                set({
                    past: newPast,
                    present: previous,
                    future: [present, ...future],
                });

                return previous;
            },

            /**
             * Redo - restore next state
             */
            redo: () => {
                const { past, present, future, isEnabled } = get();

                if (!isEnabled || future.length === 0 || !present) {
                    return null;
                }

                const next = future[0];
                const newFuture = future.slice(1);

                set({
                    past: [...past, present],
                    present: next,
                    future: newFuture,
                });

                return next;
            },

            /**
             * Jump to a specific snapshot by ID
             */
            jumpToSnapshot: (snapshotId: string) => {
                const { past, present, future } = get();

                // Check in past
                const pastIndex = past.findIndex((s) => s.id === snapshotId);
                if (pastIndex !== -1) {
                    const target = past[pastIndex];
                    const newPast = past.slice(0, pastIndex);
                    const skippedPast = past.slice(pastIndex + 1);

                    set({
                        past: newPast,
                        present: target,
                        future: present ? [...skippedPast, present, ...future] : future,
                    });

                    return target;
                }

                // Check if it's the present
                if (present?.id === snapshotId) {
                    return present;
                }

                // Check in future
                const futureIndex = future.findIndex((s) => s.id === snapshotId);
                if (futureIndex !== -1) {
                    const target = future[futureIndex];
                    const skippedFuture = future.slice(0, futureIndex);
                    const newFuture = future.slice(futureIndex + 1);

                    set({
                        past: present ? [...past, present, ...skippedFuture] : past,
                        present: target,
                        future: newFuture,
                    });

                    return target;
                }

                return null;
            },

            /**
             * Jump to a specific index in history
             * Negative indices count from the end
             */
            jumpToIndex: (index: number) => {
                const { past, present, future } = get();
                const timeline = [...past, ...(present ? [present] : []), ...future];

                const normalizedIndex = index < 0 ? timeline.length + index : index;

                if (normalizedIndex < 0 || normalizedIndex >= timeline.length) {
                    return null;
                }

                const target = timeline[normalizedIndex];
                return get().jumpToSnapshot(target.id);
            },

            /**
             * Capture current state as a new snapshot
             */
            captureSnapshot: (_description: string, _actionType: HistoryActionType) => {
                const { isEnabled, isBatching } = get();

                if (!isEnabled) return;

                // If batching, queue the change
                if (isBatching) {
                    set((state) => ({
                        batchChanges: [
                            ...state.batchChanges,
                            { description: _description, actionType: _actionType },
                        ],
                    }));
                    return;
                }

                // Clear debounce timer
                if (debounceTimer) {
                    clearTimeout(debounceTimer);
                    debounceTimer = null;
                }
            },

            /**
             * Replace current present state without adding to history
             * Used for intermediate updates that shouldn't create undo points
             */
            replacePresent: (snapshotData: Partial<EditorSnapshot>) => {
                const { present } = get();

                if (!present) return;

                set({
                    present: {
                        ...present,
                        ...snapshotData,
                        timestamp: new Date().toISOString(),
                    },
                });
            },

            /**
             * Start a batch operation
             * Multiple changes will be grouped as one undo step
             */
            startBatch: () => {
                set({ isBatching: true, batchChanges: [] });
            },

            /**
             * End batch operation and commit as single snapshot
             */
            endBatch: (_description: string) => {
                const { isBatching } = get();

                if (!isBatching) return;

                set({
                    isBatching: false,
                    batchChanges: [],
                });
            },

            /**
             * Cancel batch operation without committing
             */
            cancelBatch: () => {
                set({ isBatching: false, batchChanges: [] });
            },

            /**
             * Clear all history
             */
            clearHistory: () => {
                set({
                    past: [],
                    future: [],
                    // Keep present state
                });
            },

            /**
             * Trim history to max size
             * Removes oldest entries when limit exceeded
             */
            trimHistory: () => {
                const { past } = get();

                if (past.length > MAX_HISTORY_SIZE) {
                    set({
                        past: past.slice(-MAX_HISTORY_SIZE),
                    });
                }
            },

            /**
             * Enable or disable history tracking
             */
            setEnabled: (enabled: boolean) => {
                set({ isEnabled: enabled });
            },

            /**
             * Check if undo is available
             */
            canUndo: () => {
                const { past, isEnabled } = get();
                return isEnabled && past.length > 0;
            },

            /**
             * Check if redo is available
             */
            canRedo: () => {
                const { future, isEnabled } = get();
                return isEnabled && future.length > 0;
            },

            /**
             * Get number of undo steps available
             */
            getUndoCount: () => get().past.length,

            /**
             * Get number of redo steps available
             */
            getRedoCount: () => get().future.length,

            /**
             * Get all history entries for timeline view
             */
            getTimeline: () => {
                const { past, present, future } = get();
                return [...past, ...(present ? [present] : []), ...future];
            },
        };
    })
);

/**
 * Push a new state to history
 * This is the main function to call when state changes
 */
export const pushToHistory = (
    elements: ElementData[],
    backgroundImage: string | null,
    selectedElementId: string | null,
    description: string,
    actionType: HistoryActionType
) => {
    const { past, present, isEnabled, isBatching } = useHistoryStore.getState();

    if (!isEnabled || isBatching) return;

    const newSnapshot = createSnapshot(
        elements,
        backgroundImage,
        selectedElementId,
        description,
        actionType
    );

    // Add current present to past, set new snapshot as present, clear future
    useHistoryStore.setState({
        past: present ? [...past, present].slice(-MAX_HISTORY_SIZE) : past,
        present: newSnapshot,
        future: [], // Clear redo stack on new action
    });
};

/**
 * Initialize history with initial state
 * Call this when editor first loads
 */
export const initializeHistory = (
    elements: ElementData[],
    backgroundImage: string | null,
    description?: string
) => {
    const initialSnapshot = createSnapshot(
        elements,
        backgroundImage,
        null,
        description || 'Initial State',
        'manual'
    );

    useHistoryStore.setState({
        ...DEFAULT_HISTORY_STATE,
        present: initialSnapshot,
    });
};

/**
 * Debounced history push for frequent updates (like dragging)
 */
let debouncedPushTimer: ReturnType<typeof setTimeout> | null = null;

export const debouncedPushToHistory = (
    elements: ElementData[],
    backgroundImage: string | null,
    selectedElementId: string | null,
    description: string,
    actionType: HistoryActionType,
    debounceMs: number = SNAPSHOT_DEBOUNCE_MS
) => {
    if (debouncedPushTimer) {
        clearTimeout(debouncedPushTimer);
    }

    debouncedPushTimer = setTimeout(() => {
        pushToHistory(elements, backgroundImage, selectedElementId, description, actionType);
        debouncedPushTimer = null;
    }, debounceMs);
};

/**
 * Cancel pending debounced push
 */
export const cancelDebouncedPush = () => {
    if (debouncedPushTimer) {
        clearTimeout(debouncedPushTimer);
        debouncedPushTimer = null;
    }
};

/**
 * Selectors for common history queries
 */
export const selectCanUndo = (state: HistoryStore) => state.isEnabled && state.past.length > 0;
export const selectCanRedo = (state: HistoryStore) => state.isEnabled && state.future.length > 0;
export const selectCurrentSnapshot = (state: HistoryStore) => state.present;
export const selectHistoryTimeline = (state: HistoryStore) => [
    ...state.past,
    ...(state.present ? [state.present] : []),
    ...state.future,
];
