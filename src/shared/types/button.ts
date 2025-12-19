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
    $borderRadius: string | number;
}

export interface GradationBtnProps {
    $gradationColor1: string;
    $gradationColor2: string;
    $gradationColor3: string;
    $gradationColor4: string;
    $textColor: string;
    $borderRadius: string | number;
}
