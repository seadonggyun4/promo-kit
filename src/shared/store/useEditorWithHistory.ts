import { useCallback, useEffect, useRef } from 'react';
import { useElementsStore } from './elementsStore';
import { useUploadImageStore } from './uploadImageStore';
import {
    useHistoryStore,
    pushToHistory,
    debouncedPushToHistory,
    initializeHistory,
    cancelDebouncedPush,
} from './historyStore';
import { EditorSnapshot } from '@/shared/types/history';
import { ButtonStyle, ButtonStyleDataLegacy } from '@/shared/types';

/**
 * Hook that integrates elements store with history
 * Provides undo/redo aware element operations
 */
export const useEditorWithHistory = () => {
    const isInitialized = useRef(false);

    // Elements store
    const elementsData = useElementsStore((state) => state.elementsData);
    const selected = useElementsStore((state) => state.selected);
    const addElementBase = useElementsStore((state) => state.addElement);
    const updateElementBase = useElementsStore((state) => state.updateElement);
    const removeElementBase = useElementsStore((state) => state.removeElement);
    const updateElementPositionBase = useElementsStore((state) => state.updateElementPosition);
    const setSelected = useElementsStore((state) => state.setSelected);

    // Image store
    const uploadedImage = useUploadImageStore((state) => state.uploadedImage);

    // History store
    const undo = useHistoryStore((state) => state.undo);
    const redo = useHistoryStore((state) => state.redo);
    const canUndo = useHistoryStore((state) => state.canUndo);
    const canRedo = useHistoryStore((state) => state.canRedo);
    const present = useHistoryStore((state) => state.present);
    const startBatch = useHistoryStore((state) => state.startBatch);
    const endBatch = useHistoryStore((state) => state.endBatch);

    /**
     * Initialize history on mount
     */
    useEffect(() => {
        if (!isInitialized.current) {
            initializeHistory(elementsData, uploadedImage as string | null);
            isInitialized.current = true;
        }
    }, []);

    /**
     * Restore editor state from a snapshot
     */
    const restoreFromSnapshot = useCallback((snapshot: EditorSnapshot) => {
        // Restore elements
        useElementsStore.setState({ elementsData: snapshot.elements });

        // Restore background image
        useUploadImageStore.setState({ uploadedImage: snapshot.backgroundImage });

        // Restore selection
        if (snapshot.selectedElementId) {
            const selectedElement = snapshot.elements.find(
                (el) => el.id === snapshot.selectedElementId
            );
            setSelected(selectedElement || null);
        } else {
            setSelected(null);
        }
    }, [setSelected]);

    /**
     * Add element with history tracking
     */
    const addElement = useCallback(
        (type: string, style: ButtonStyle, styleData: ButtonStyleDataLegacy, elKey: string) => {
            addElementBase(type, style, styleData, elKey);

            // Get updated state after add
            const newElements = useElementsStore.getState().elementsData;

            pushToHistory(
                newElements,
                uploadedImage as string | null,
                elKey,
                `버튼 추가: ${styleData.buttonText || style}`,
                'element_add'
            );
        },
        [addElementBase, uploadedImage]
    );

    /**
     * Update element with history tracking
     */
    const updateElement = useCallback(
        (id: string, style: ButtonStyle, styleData: ButtonStyleDataLegacy) => {
            updateElementBase(id, style, styleData);

            const newElements = useElementsStore.getState().elementsData;

            debouncedPushToHistory(
                newElements,
                uploadedImage as string | null,
                id,
                `스타일 변경`,
                'element_style'
            );
        },
        [updateElementBase, uploadedImage]
    );

    /**
     * Remove element with history tracking
     */
    const removeElement = useCallback(
        (id: string) => {
            const elementToRemove = elementsData.find((el) => el.id === id);
            removeElementBase(id);

            const newElements = useElementsStore.getState().elementsData;

            pushToHistory(
                newElements,
                uploadedImage as string | null,
                null,
                `버튼 삭제: ${elementToRemove?.styleData.buttonText || id}`,
                'element_remove'
            );
        },
        [removeElementBase, elementsData, uploadedImage]
    );

    /**
     * Update element position with debounced history
     * (for drag operations)
     */
    const updateElementPosition = useCallback(
        (id: string, x: number, y: number) => {
            updateElementPositionBase(id, x, y);

            const newElements = useElementsStore.getState().elementsData;

            // Debounce position updates to avoid flooding history
            debouncedPushToHistory(
                newElements,
                uploadedImage as string | null,
                id,
                `위치 이동`,
                'element_move',
                500 // Shorter debounce for position updates
            );
        },
        [updateElementPositionBase, uploadedImage]
    );

    /**
     * Finalize position update (call when drag ends)
     */
    const finalizePositionUpdate = useCallback(
        (id: string) => {
            cancelDebouncedPush();

            const newElements = useElementsStore.getState().elementsData;

            pushToHistory(
                newElements,
                uploadedImage as string | null,
                id,
                `위치 이동 완료`,
                'element_move'
            );
        },
        [uploadedImage]
    );

    /**
     * Undo with state restoration
     */
    const handleUndo = useCallback(() => {
        const previousSnapshot = undo();
        if (previousSnapshot) {
            restoreFromSnapshot(previousSnapshot);
        }
    }, [undo, restoreFromSnapshot]);

    /**
     * Redo with state restoration
     */
    const handleRedo = useCallback(() => {
        const nextSnapshot = redo();
        if (nextSnapshot) {
            restoreFromSnapshot(nextSnapshot);
        }
    }, [redo, restoreFromSnapshot]);

    /**
     * Batch operations (multiple changes = one undo)
     */
    const batchOperation = useCallback(
        <T>(operation: () => T, description: string): T => {
            startBatch();
            try {
                const result = operation();
                endBatch(description);
                return result;
            } catch (error) {
                useHistoryStore.getState().cancelBatch();
                throw error;
            }
        },
        [startBatch, endBatch]
    );

    /**
     * Handle keyboard shortcuts for undo/redo
     */
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Check for Ctrl+Z (Windows) or Cmd+Z (Mac)
            if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
                e.preventDefault();

                if (e.shiftKey) {
                    // Ctrl+Shift+Z = Redo
                    handleRedo();
                } else {
                    // Ctrl+Z = Undo
                    handleUndo();
                }
            }

            // Check for Ctrl+Y (Windows) for Redo
            if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
                e.preventDefault();
                handleRedo();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleUndo, handleRedo]);

    return {
        // State
        elementsData,
        selected,
        uploadedImage,

        // Element operations (with history)
        addElement,
        updateElement,
        removeElement,
        updateElementPosition,
        finalizePositionUpdate,
        setSelected,

        // History operations
        undo: handleUndo,
        redo: handleRedo,
        canUndo: canUndo(),
        canRedo: canRedo(),
        batchOperation,

        // Current snapshot info
        currentSnapshot: present,
    };
};

/**
 * Hook for history-only operations (without element operations)
 */
export const useHistory = () => {
    const undo = useHistoryStore((state) => state.undo);
    const redo = useHistoryStore((state) => state.redo);
    const canUndo = useHistoryStore((state) => state.canUndo);
    const canRedo = useHistoryStore((state) => state.canRedo);
    const getUndoCount = useHistoryStore((state) => state.getUndoCount);
    const getRedoCount = useHistoryStore((state) => state.getRedoCount);
    const getTimeline = useHistoryStore((state) => state.getTimeline);
    const jumpToSnapshot = useHistoryStore((state) => state.jumpToSnapshot);
    const clearHistory = useHistoryStore((state) => state.clearHistory);

    return {
        undo,
        redo,
        canUndo: canUndo(),
        canRedo: canRedo(),
        undoCount: getUndoCount(),
        redoCount: getRedoCount(),
        timeline: getTimeline(),
        jumpToSnapshot,
        clearHistory,
    };
};
