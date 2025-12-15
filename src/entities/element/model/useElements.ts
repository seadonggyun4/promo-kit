import { useState } from 'react';
import { ElementData, ButtonStyle, ButtonStyleDataLegacy } from '@/shared/types';

export function useElements() {
    const [elementsData, setElementsData] = useState<ElementData[]>([]);
    const [selected, setSelected] = useState<ElementData | null>(null);

    const addElement = (type: string, style: ButtonStyle, styleData: ButtonStyleDataLegacy, elKey: string) => {
        const newElementData: ElementData = {
            id: elKey,
            type,
            style,
            x: 0,
            y: 0,
            styleData,
        };
        setElementsData((prevElements) => [...prevElements, newElementData]);
    };

    const updateElement = (id: string, style: ButtonStyle, styleData: ButtonStyleDataLegacy) => {
        setElementsData((prevElements) =>
            prevElements.map((elem) =>
                elem.id === id ? { ...elem, style, styleData } : elem
            )
        );
    };

    const removeElement = (id: string) => {
        setElementsData((prevElements) => prevElements.filter((elem) => elem.id !== id));
    };

    const updateElementPosition = (id: string, x: number, y: number) => {
        setElementsData((prevElements) =>
            prevElements.map((el) =>
                el.id === id ? { ...el, x, y } : el
            )
        );
    };

    const createSampleButton = (style: ButtonStyle, styleData: ButtonStyleDataLegacy, elKey: string) => {
        addElement('button', style, styleData, elKey);
    };

    const updateSampleButton = (id: string, style: ButtonStyle, styleData: ButtonStyleDataLegacy) => {
        updateElement(id, style, styleData);
    };

    return {
        elementsData,
        createSampleButton,
        updateElementPosition,
        selected,
        setSelected,
        updateElement,
        updateSampleButton,
        removeElement,
    };
}

export type UseElementsReturnType = ReturnType<typeof useElements>;
