import { create } from 'zustand';
import { ElementData, ButtonStyle, ButtonStyleDataLegacy } from '@/shared/types';

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
    createSampleButton: (style: ButtonStyle, styleData: ButtonStyleDataLegacy, elKey: string) => void;
    updateSampleButton: (id: string, style: ButtonStyle, styleData: ButtonStyleDataLegacy) => void;
}

export const useElementsStore = create<ElementsState & ElementsActions>((set) => ({
    elementsData: [],
    selected: null,

    addElement: (type, style, styleData, elKey) => {
        const newElement: ElementData = {
            id: elKey,
            type,
            style,
            x: 0,
            y: 0,
            styleData,
        };
        set((state) => ({
            elementsData: [...state.elementsData, newElement],
        }));
    },

    updateElement: (id, style, styleData) => {
        set((state) => ({
            elementsData: state.elementsData.map((elem) =>
                elem.id === id ? { ...elem, style, styleData } : elem
            ),
        }));
    },

    removeElement: (id) => {
        set((state) => ({
            elementsData: state.elementsData.filter((elem) => elem.id !== id),
        }));
    },

    updateElementPosition: (id, x, y) => {
        set((state) => ({
            elementsData: state.elementsData.map((el) =>
                el.id === id ? { ...el, x, y } : el
            ),
        }));
    },

    setSelected: (element) => {
        set({ selected: element });
    },

    createSampleButton: (style, styleData, elKey) => {
        const newElement: ElementData = {
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
    },

    updateSampleButton: (id, style, styleData) => {
        set((state) => ({
            elementsData: state.elementsData.map((elem) =>
                elem.id === id ? { ...elem, style, styleData } : elem
            ),
        }));
    },
}));
