import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import {
    ElementData,
    ButtonStyle,
    ButtonStyleDataLegacy,
    TextStyle,
    TextStyleDataLegacy,
    ImageOverlayStyle,
    ImageOverlayStyleDataLegacy,
    ButtonElementData,
    TextElementData,
    ImageOverlayElementData,
} from '@/shared/types';
import { pushToHistory, debouncedPushToHistory } from './historyStore';

interface ElementsState {
    elementsData: ElementData[];
    selected: ElementData | null;
}

interface ElementsActions {
    addElement: (type: string, style: ButtonStyle, styleData: ButtonStyleDataLegacy, elKey: string) => void;
    updateElement: (id: string, style: ButtonStyle, styleData: ButtonStyleDataLegacy) => void;
    removeElement: (id: string) => void;
    updateElementPosition: (id: string, x: number, y: number) => void;
    setSelected: (element: ElementData | null) => void;
    // Button actions
    createSampleButton: (style: ButtonStyle, styleData: ButtonStyleDataLegacy, elKey: string) => void;
    updateSampleButton: (id: string, style: ButtonStyle, styleData: ButtonStyleDataLegacy) => void;
    // Text actions
    createTextElement: (style: TextStyle, styleData: TextStyleDataLegacy, elKey: string) => void;
    updateTextElement: (id: string, style: TextStyle, styleData: TextStyleDataLegacy) => void;
    // Image overlay actions
    createImageOverlay: (style: ImageOverlayStyle, styleData: ImageOverlayStyleDataLegacy, elKey: string) => void;
    updateImageOverlay: (id: string, style: ImageOverlayStyle, styleData: ImageOverlayStyleDataLegacy) => void;
}

// Helper to get background image from uploadImageStore
const getBackgroundImage = (): string | null => {
    try {
        // Dynamic import to avoid circular dependency
        const { useUploadImageStore } = require('./uploadImageStore');
        return useUploadImageStore.getState().uploadedImage as string | null;
    } catch {
        return null;
    }
};

export const useElementsStore = create<ElementsState & ElementsActions>()(
    subscribeWithSelector((set, get) => ({
        elementsData: [],
        selected: null,

        addElement: (_type, style, styleData, elKey) => {
            const newElement: ButtonElementData = {
                id: elKey,
                type: 'button',
                style,
                x: 0,
                y: 0,
                styleData,
            };
            set((state) => ({
                elementsData: [...state.elementsData, newElement],
            }));
            // Push to history
            const newElements = get().elementsData;
            pushToHistory(newElements, getBackgroundImage(), elKey, `버튼 추가`, 'element_add');
        },

        updateElement: (id, style, styleData) => {
            set((state) => ({
                elementsData: state.elementsData.map((elem) =>
                    elem.id === id ? { ...elem, style, styleData } as ElementData : elem
                ),
            }));
            // Debounced push to history
            const newElements = get().elementsData;
            debouncedPushToHistory(newElements, getBackgroundImage(), id, `스타일 변경`, 'element_style');
        },

        removeElement: (id) => {
            set((state) => ({
                elementsData: state.elementsData.filter((elem) => elem.id !== id),
            }));
            // Push to history
            const newElements = get().elementsData;
            pushToHistory(newElements, getBackgroundImage(), null, `요소 삭제`, 'element_remove');
        },

        updateElementPosition: (id, x, y) => {
            set((state) => ({
                elementsData: state.elementsData.map((el) =>
                    el.id === id ? { ...el, x, y } : el
                ),
            }));
            // Debounced push to history (for drag operations)
            const newElements = get().elementsData;
            debouncedPushToHistory(newElements, getBackgroundImage(), id, `위치 이동`, 'element_move', 500);
        },

        setSelected: (element) => {
            set({ selected: element });
        },

        // Button actions
        createSampleButton: (style, styleData, elKey) => {
            const newElement: ButtonElementData = {
                id: elKey,
                type: 'button',
                style,
                x: 0,
                y: 0,
                styleData,
            };
            set((state) => ({
                elementsData: [...state.elementsData, newElement],
            }));
            // Push to history
            const newElements = get().elementsData;
            pushToHistory(newElements, getBackgroundImage(), elKey, `버튼 추가: ${styleData.buttonText || style}`, 'element_add');
        },

        updateSampleButton: (id, style, styleData) => {
            set((state) => ({
                elementsData: state.elementsData.map((elem) =>
                    elem.id === id ? { ...elem, style, styleData } as ButtonElementData : elem
                ),
            }));
            // Debounced push to history
            const newElements = get().elementsData;
            debouncedPushToHistory(newElements, getBackgroundImage(), id, `버튼 스타일 변경`, 'element_style');
        },

        // Text actions
        createTextElement: (style, styleData, elKey) => {
            const newElement: TextElementData = {
                id: elKey,
                type: 'text',
                style,
                x: 0,
                y: 0,
                styleData,
            };
            set((state) => ({
                elementsData: [...state.elementsData, newElement],
            }));
            // Push to history
            const newElements = get().elementsData;
            pushToHistory(newElements, getBackgroundImage(), elKey, `텍스트 추가: ${style}`, 'element_add');
        },

        updateTextElement: (id, style, styleData) => {
            set((state) => ({
                elementsData: state.elementsData.map((elem) =>
                    elem.id === id ? { ...elem, style, styleData } as TextElementData : elem
                ),
            }));
            // Debounced push to history
            const newElements = get().elementsData;
            debouncedPushToHistory(newElements, getBackgroundImage(), id, `텍스트 스타일 변경`, 'element_style');
        },

        // Image overlay actions
        createImageOverlay: (style, styleData, elKey) => {
            const newElement: ImageOverlayElementData = {
                id: elKey,
                type: 'image-overlay',
                style,
                x: 0,
                y: 0,
                styleData,
            };
            set((state) => ({
                elementsData: [...state.elementsData, newElement],
            }));
            // Push to history
            const newElements = get().elementsData;
            pushToHistory(newElements, getBackgroundImage(), elKey, `이미지 오버레이 추가`, 'element_add');
        },

        updateImageOverlay: (id, style, styleData) => {
            set((state) => ({
                elementsData: state.elementsData.map((elem) =>
                    elem.id === id ? { ...elem, style, styleData } as ImageOverlayElementData : elem
                ),
            }));
            // Debounced push to history
            const newElements = get().elementsData;
            debouncedPushToHistory(newElements, getBackgroundImage(), id, `이미지 오버레이 스타일 변경`, 'element_style');
        },
    }))
);
