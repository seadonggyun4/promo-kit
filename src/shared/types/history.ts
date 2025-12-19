import { ElementData } from './element';

/**
 * Maximum number of history entries to keep
 * Prevents memory issues with large undo stacks
 */
export const MAX_HISTORY_SIZE = 50;

/**
 * Auto-snapshot interval in milliseconds
 */
export const AUTO_SNAPSHOT_INTERVAL = 30000; // 30 seconds

/**
 * Debounce time for capturing snapshots after changes
 */
export const SNAPSHOT_DEBOUNCE_MS = 1000; // 1 second

/**
 * Action type for categorizing changes
 */
export type HistoryActionType =
    | 'element_add'
    | 'element_remove'
    | 'element_update'
    | 'element_move'
    | 'element_style'
    | 'image_change'
    | 'batch'
    | 'restore'
    | 'manual';

/**
 * Single snapshot of the editor state
 * Immutable record of state at a point in time
 */
export interface EditorSnapshot {
    /** Unique snapshot ID */
    id: string;
    /** When this snapshot was created */
    timestamp: string;
    /** Human-readable description of what changed */
    description: string;
    /** Type of action that triggered this snapshot */
    actionType: HistoryActionType;
    /** Elements state at this point */
    elements: ElementData[];
    /** Background image at this point (can be large, consider compression) */
    backgroundImage: string | null;
    /** Selected element ID at this point */
    selectedElementId: string | null;
}

/**
 * Compressed snapshot for storage optimization
 * Used for older snapshots to save memory
 */
export interface CompressedSnapshot {
    id: string;
    timestamp: string;
    description: string;
    actionType: HistoryActionType;
    /** Compressed JSON string */
    compressedData: string;
    /** Original size in bytes for metrics */
    originalSize: number;
}

/**
 * History state following the command pattern
 * Maintains past, present, and future states for undo/redo
 */
export interface HistoryState {
    /** Stack of past states (most recent at end) */
    past: EditorSnapshot[];
    /** Current state */
    present: EditorSnapshot | null;
    /** Stack of future states for redo (most recent at start) */
    future: EditorSnapshot[];
    /** Whether history tracking is enabled */
    isEnabled: boolean;
    /** Whether a batch operation is in progress */
    isBatching: boolean;
    /** Pending changes during batch */
    batchChanges: Partial<EditorSnapshot>[];
}

/**
 * History actions for Zustand store
 */
export interface HistoryActions {
    // Navigation
    /** Undo last action */
    undo: () => EditorSnapshot | null;
    /** Redo previously undone action */
    redo: () => EditorSnapshot | null;
    /** Jump to a specific snapshot by ID */
    jumpToSnapshot: (snapshotId: string) => EditorSnapshot | null;
    /** Jump to a specific index in history */
    jumpToIndex: (index: number) => EditorSnapshot | null;

    // Snapshot management
    /** Capture current state as a snapshot */
    captureSnapshot: (description: string, actionType: HistoryActionType) => void;
    /** Replace the current present state without adding to history */
    replacePresent: (snapshot: Partial<EditorSnapshot>) => void;

    // Batch operations
    /** Start a batch operation (multiple changes = one undo) */
    startBatch: () => void;
    /** End batch operation and commit as single snapshot */
    endBatch: (description: string) => void;
    /** Cancel batch operation without committing */
    cancelBatch: () => void;

    // History management
    /** Clear all history */
    clearHistory: () => void;
    /** Trim history to max size */
    trimHistory: () => void;
    /** Enable/disable history tracking */
    setEnabled: (enabled: boolean) => void;

    // Queries
    /** Check if undo is available */
    canUndo: () => boolean;
    /** Check if redo is available */
    canRedo: () => boolean;
    /** Get number of undo steps available */
    getUndoCount: () => number;
    /** Get number of redo steps available */
    getRedoCount: () => number;
    /** Get all history entries for timeline view */
    getTimeline: () => EditorSnapshot[];
}

/**
 * History store type (state + actions)
 */
export type HistoryStore = HistoryState & HistoryActions;

/**
 * Diff between two snapshots
 * Used for visualizing changes in history view
 */
export interface SnapshotDiff {
    /** Elements added */
    addedElements: ElementData[];
    /** Elements removed */
    removedElements: ElementData[];
    /** Elements modified (before and after) */
    modifiedElements: Array<{
        before: ElementData;
        after: ElementData;
        changes: string[];
    }>;
    /** Whether background image changed */
    imageChanged: boolean;
}

/**
 * Generate a unique snapshot ID
 */
export const generateSnapshotId = (): string => {
    return `snap_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
};

/**
 * Create a new snapshot
 */
export const createSnapshot = (
    elements: ElementData[],
    backgroundImage: string | null,
    selectedElementId: string | null,
    description: string,
    actionType: HistoryActionType
): EditorSnapshot => ({
    id: generateSnapshotId(),
    timestamp: new Date().toISOString(),
    description,
    actionType,
    elements: JSON.parse(JSON.stringify(elements)), // Deep clone
    backgroundImage,
    selectedElementId,
});

/**
 * Get i18n key for action type
 * Returns the translation key to be used with t() function
 */
export const getActionTypeI18nKey = (actionType: HistoryActionType): string => {
    const keys: Record<HistoryActionType, string> = {
        element_add: 'history.actions.elementAdd',
        element_remove: 'history.actions.elementRemove',
        element_update: 'history.actions.elementUpdate',
        element_move: 'history.actions.elementMove',
        element_style: 'history.actions.styleChange',
        image_change: 'history.actions.imageChange',
        batch: 'history.actions.batch',
        restore: 'history.actions.restore',
        manual: 'history.actions.manual',
    };
    return keys[actionType];
};

/**
 * Calculate diff between two snapshots
 */
export const calculateSnapshotDiff = (
    before: EditorSnapshot,
    after: EditorSnapshot
): SnapshotDiff => {
    const beforeIds = new Set(before.elements.map((e) => e.id));
    const afterIds = new Set(after.elements.map((e) => e.id));

    const addedElements = after.elements.filter((e) => !beforeIds.has(e.id));
    const removedElements = before.elements.filter((e) => !afterIds.has(e.id));

    const modifiedElements: SnapshotDiff['modifiedElements'] = [];

    for (const afterEl of after.elements) {
        if (beforeIds.has(afterEl.id)) {
            const beforeEl = before.elements.find((e) => e.id === afterEl.id)!;
            const changes: string[] = [];

            if (beforeEl.x !== afterEl.x || beforeEl.y !== afterEl.y) {
                changes.push('position');
            }
            if (beforeEl.style !== afterEl.style) {
                changes.push('style');
            }
            if (JSON.stringify(beforeEl.styleData) !== JSON.stringify(afterEl.styleData)) {
                changes.push('styleData');
            }

            if (changes.length > 0) {
                modifiedElements.push({
                    before: beforeEl,
                    after: afterEl,
                    changes,
                });
            }
        }
    }

    return {
        addedElements,
        removedElements,
        modifiedElements,
        imageChanged: before.backgroundImage !== after.backgroundImage,
    };
};

/**
 * Default initial history state
 */
export const DEFAULT_HISTORY_STATE: HistoryState = {
    past: [],
    present: null,
    future: [],
    isEnabled: true,
    isBatching: false,
    batchChanges: [],
};
