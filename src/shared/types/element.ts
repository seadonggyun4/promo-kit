import { ButtonStyle, ButtonStyleDataLegacy } from './button';
import { TextStyle, TextStyleDataLegacy } from './text';
import { ImageOverlayStyle, ImageOverlayStyleDataLegacy } from './imageOverlay';

// ============================================
// Element Types
// ============================================

export type ElementType = 'button' | 'text' | 'image-overlay';

export type ElementStyle = ButtonStyle | TextStyle | ImageOverlayStyle;

export type ElementStyleData = ButtonStyleDataLegacy | TextStyleDataLegacy | ImageOverlayStyleDataLegacy;

// ============================================
// Element Data Interfaces
// ============================================

export interface BaseElementData {
    id: string;
    type: ElementType;
    x: number;
    y: number;
}

export interface ButtonElementData extends BaseElementData {
    type: 'button';
    style: ButtonStyle;
    styleData: ButtonStyleDataLegacy;
}

export interface TextElementData extends BaseElementData {
    type: 'text';
    style: TextStyle;
    styleData: TextStyleDataLegacy;
}

export interface ImageOverlayElementData extends BaseElementData {
    type: 'image-overlay';
    style: ImageOverlayStyle;
    styleData: ImageOverlayStyleDataLegacy;
}

export type ElementData = ButtonElementData | TextElementData | ImageOverlayElementData;
