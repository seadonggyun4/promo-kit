import { ButtonStyle, ButtonStyleDataLegacy } from './button';

export interface ElementData {
    id: string;
    type: string;
    style: ButtonStyle;
    styleData: ButtonStyleDataLegacy;
    x: number;
    y: number;
}

export interface ElementsContextType {
    elementsData: ElementData[];
    selected: ElementData | null;
    createSampleButton: (style: ButtonStyle, styleData: ButtonStyleDataLegacy, elKey: string) => void;
    updateElement: (id: string, style: ButtonStyle, styleData: ButtonStyleDataLegacy) => void;
    removeElement: (id: string) => void;
    setSelected: (element: ElementData | null) => void;
    updateElementPosition: (id: string, x: number, y: number) => void;
    updateSampleButton: (id: string, style: ButtonStyle, styleData: ButtonStyleDataLegacy) => void;
}
