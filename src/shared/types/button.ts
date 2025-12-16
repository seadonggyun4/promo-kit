import { ChangeEvent, Dispatch, SetStateAction } from 'react';

// ============================================
// Button Style Types
// ============================================

// Simple button style types
export type SimpleBtnStyle =
    | 'SimpleBtn'
    | 'PrimaryBtn'
    | 'SecondaryBtn'
    | 'SuccessBtn'
    | 'DangerBtn'
    | 'WarningBtn'
    | 'DarkBtn'
    | 'OutlineBtn'
    | 'PillBtn'
    | 'GhostBtn'
    | 'NeonBtn';

// Gradient button style types
export type GradientBtnStyle =
    | 'GradationBtn'
    | 'SunsetBtn'
    | 'OceanBtn'
    | 'ForestBtn'
    | 'PurpleHazeBtn'
    | 'FireBtn'
    | 'AuroraBtn'
    | 'MidnightBtn'
    | 'RoseGoldBtn'
    | 'CyberBtn';

export type ButtonStyle = SimpleBtnStyle | GradientBtnStyle;

export interface SimpleBtnStyleData {
    buttonText: string;
    buttonLink: string;
    textColor: string;
    backgroundColor: string;
    borderRadius: string;
    borderWidth: string;
    borderColor: string;
    shadowOffsetX: string;
    shadowOffsetY: string;
    shadowBlurRadius: string;
    shadowColor: string;
    width: string;
    height: string;
}

export interface GradationBtnStyleData {
    buttonText: string;
    buttonLink: string;
    textColor: string;
    gradationColor1: string;
    gradationColor2: string;
    gradationColor3: string;
    gradationColor4: string;
    borderRadius: string;
    borderWidth: string;
    borderColor: string;
    shadowOffsetX: string;
    shadowOffsetY: string;
    shadowBlurRadius: string;
    shadowColor: string;
    width: string;
    height: string;
}

export type ButtonStyleData = SimpleBtnStyleData | GradationBtnStyleData;

// Legacy type with index signature for backwards compatibility
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ButtonStyleDataLegacy = Record<string, any>;

// ============================================
// Styled Component Props
// ============================================

export interface SimpleBtnProps {
    $backgroundColor: string;
    $textColor: string;
    $borderRadius: string;
    $borderWidth: string;
    $borderColor: string;
    $shadowOffsetX: string;
    $shadowOffsetY: string;
    $shadowBlurRadius: string;
    $shadowColor: string;
}

export interface GradationBtnProps {
    $gradationColor1: string;
    $gradationColor2: string;
    $gradationColor3: string;
    $gradationColor4: string;
    $textColor: string;
    $borderRadius: string;
    $borderWidth: string;
    $borderColor: string;
    $shadowOffsetX: string;
    $shadowOffsetY: string;
    $shadowBlurRadius: string;
    $shadowColor: string;
}

// ============================================
// Hook Types
// ============================================

export interface ButtonFormState {
    buttonText: string;
    buttonLink: string;
    textColor: string;
    borderRadius: string;
    borderWidth: string;
    borderColor: string;
    shadowOffsetX: string;
    shadowOffsetY: string;
    shadowBlurRadius: string;
    shadowColor: string;
    width: string;
    height: string;
}

export interface ButtonFormActions {
    handleTextChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleLinkChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleTextColorChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleBorderRadiusChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleBorderWidthChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleBorderColorChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleShadowOffsetXChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleShadowOffsetYChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleShadowBlurRadiusChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleShadowColorChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleWidthChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleHeightChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface MenuState {
    menu: string[];
    menuActive: string;
    setMenuActive: Dispatch<SetStateAction<string>>;
}

export interface SimpleBtnHook extends ButtonFormState, ButtonFormActions, MenuState {
    backgroundColor: string;
    handleBackgroundColorChange: (e: ChangeEvent<HTMLInputElement>) => void;
    buttonStyle: SimpleBtnStyleData;
}

export interface GradationBtnHook extends ButtonFormState, ButtonFormActions, MenuState {
    gradationColor1: string;
    handleGradationColor1Change: (e: ChangeEvent<HTMLInputElement>) => void;
    gradationColor2: string;
    handleGradationColor2Change: (e: ChangeEvent<HTMLInputElement>) => void;
    gradationColor3: string;
    handleGradationColor3Change: (e: ChangeEvent<HTMLInputElement>) => void;
    gradationColor4: string;
    handleGradationColor4Change: (e: ChangeEvent<HTMLInputElement>) => void;
    buttonStyle: GradationBtnStyleData;
}
