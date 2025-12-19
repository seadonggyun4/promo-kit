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

// Animated button style types
export type AnimatedBtnStyle =
    | 'BounceBtn'
    | 'GlowBtn'
    | 'PulseBtn'
    | 'ShakeBtn'
    | 'SlideBtn'
    | 'RippleBtn';

export type ButtonStyle = SimpleBtnStyle | GradientBtnStyle | AnimatedBtnStyle;

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

export interface AnimatedBtnStyleData extends SimpleBtnStyleData {
    secondaryColor?: string;
    // Animation parameters
    animationDuration?: string;   // e.g., "0.5" (seconds)
    animationIntensity?: string;  // e.g., "8" (pixels or scale factor)
    glowSize?: string;            // e.g., "20" (pixels) - for GlowBtn
    glowIntensity?: string;       // e.g., "1" (opacity multiplier) - for GlowBtn
}

export type ButtonStyleData = SimpleBtnStyleData | GradationBtnStyleData | AnimatedBtnStyleData;

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

export interface AnimatedBtnProps {
    $backgroundColor: string;
    $textColor: string;
    $borderRadius: string | number;
    $secondaryColor?: string;
    $animationDuration?: number;
    $animationIntensity?: number;
    $glowSize?: number;
    $glowIntensity?: number;
}
