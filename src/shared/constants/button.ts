import { SimpleBtnStyleData, GradationBtnStyleData, AnimatedBtnStyleData, ButtonStyleDataLegacy } from '../types';

// ============================================
// Simple Button Styles
// ============================================

export const SIMPLE_BTN: SimpleBtnStyleData = {
    buttonText: 'BUTTON',
    buttonLink: '',
    textColor: '#ffffff',
    backgroundColor: '#434ce8',
    borderRadius: '5',
    borderWidth: '0',
    borderColor: '#000000',
    shadowOffsetX: '0',
    shadowOffsetY: '0',
    shadowBlurRadius: '0',
    shadowColor: '#000000',
    width: '200',
    height: '50',
};

export const PRIMARY_BTN: SimpleBtnStyleData = {
    buttonText: 'BUTTON',
    buttonLink: '',
    textColor: '#ffffff',
    backgroundColor: '#2563eb',
    borderRadius: '8',
    borderWidth: '0',
    borderColor: '#000000',
    shadowOffsetX: '0',
    shadowOffsetY: '4',
    shadowBlurRadius: '6',
    shadowColor: '#2563eb50',
    width: '200',
    height: '50',
};

export const SECONDARY_BTN: SimpleBtnStyleData = {
    buttonText: 'BUTTON',
    buttonLink: '',
    textColor: '#374151',
    backgroundColor: '#f3f4f6',
    borderRadius: '8',
    borderWidth: '1',
    borderColor: '#d1d5db',
    shadowOffsetX: '0',
    shadowOffsetY: '1',
    shadowBlurRadius: '2',
    shadowColor: '#00000010',
    width: '200',
    height: '50',
};

export const SUCCESS_BTN: SimpleBtnStyleData = {
    buttonText: 'BUTTON',
    buttonLink: '',
    textColor: '#ffffff',
    backgroundColor: '#10b981',
    borderRadius: '8',
    borderWidth: '0',
    borderColor: '#000000',
    shadowOffsetX: '0',
    shadowOffsetY: '4',
    shadowBlurRadius: '6',
    shadowColor: '#10b98150',
    width: '200',
    height: '50',
};

export const DANGER_BTN: SimpleBtnStyleData = {
    buttonText: 'BUTTON',
    buttonLink: '',
    textColor: '#ffffff',
    backgroundColor: '#ef4444',
    borderRadius: '8',
    borderWidth: '0',
    borderColor: '#000000',
    shadowOffsetX: '0',
    shadowOffsetY: '4',
    shadowBlurRadius: '6',
    shadowColor: '#ef444450',
    width: '200',
    height: '50',
};

export const WARNING_BTN: SimpleBtnStyleData = {
    buttonText: 'BUTTON',
    buttonLink: '',
    textColor: '#ffffff',
    backgroundColor: '#f59e0b',
    borderRadius: '8',
    borderWidth: '0',
    borderColor: '#000000',
    shadowOffsetX: '0',
    shadowOffsetY: '4',
    shadowBlurRadius: '6',
    shadowColor: '#f59e0b50',
    width: '200',
    height: '50',
};

export const DARK_BTN: SimpleBtnStyleData = {
    buttonText: 'BUTTON',
    buttonLink: '',
    textColor: '#ffffff',
    backgroundColor: '#1f2937',
    borderRadius: '8',
    borderWidth: '0',
    borderColor: '#000000',
    shadowOffsetX: '0',
    shadowOffsetY: '4',
    shadowBlurRadius: '8',
    shadowColor: '#1f293750',
    width: '200',
    height: '50',
};

export const OUTLINE_BTN: SimpleBtnStyleData = {
    buttonText: 'BUTTON',
    buttonLink: '',
    textColor: '#2563eb',
    backgroundColor: '#ffffff',
    borderRadius: '8',
    borderWidth: '2',
    borderColor: '#2563eb',
    shadowOffsetX: '0',
    shadowOffsetY: '0',
    shadowBlurRadius: '0',
    shadowColor: '#000000',
    width: '200',
    height: '50',
};

export const PILL_BTN: SimpleBtnStyleData = {
    buttonText: 'BUTTON',
    buttonLink: '',
    textColor: '#ffffff',
    backgroundColor: '#8b5cf6',
    borderRadius: '50',
    borderWidth: '0',
    borderColor: '#000000',
    shadowOffsetX: '0',
    shadowOffsetY: '4',
    shadowBlurRadius: '6',
    shadowColor: '#8b5cf650',
    width: '200',
    height: '50',
};

export const GHOST_BTN: SimpleBtnStyleData = {
    buttonText: 'BUTTON',
    buttonLink: '',
    textColor: '#6b7280',
    backgroundColor: '#00000000',
    borderRadius: '8',
    borderWidth: '1',
    borderColor: '#e5e7eb',
    shadowOffsetX: '0',
    shadowOffsetY: '0',
    shadowBlurRadius: '0',
    shadowColor: '#000000',
    width: '200',
    height: '50',
};

export const NEON_BTN: SimpleBtnStyleData = {
    buttonText: 'BUTTON',
    buttonLink: '',
    textColor: '#00ff88',
    backgroundColor: '#0a0a0a',
    borderRadius: '5',
    borderWidth: '2',
    borderColor: '#00ff88',
    shadowOffsetX: '0',
    shadowOffsetY: '0',
    shadowBlurRadius: '15',
    shadowColor: '#00ff88',
    width: '200',
    height: '50',
};

// ============================================
// Gradient Button Styles
// ============================================

export const GRADATION_BTN: GradationBtnStyleData = {
    buttonText: 'BUTTON',
    buttonLink: '',
    textColor: '#ffffff',
    gradationColor1: '#03a9f4',
    gradationColor2: '#434ce8',
    gradationColor3: '#404089',
    gradationColor4: '#03a9f4',
    borderRadius: '20',
    borderWidth: '0',
    borderColor: '#000000',
    shadowOffsetX: '0',
    shadowOffsetY: '0',
    shadowBlurRadius: '0',
    shadowColor: '#000000',
    width: '200',
    height: '50',
};

export const SUNSET_BTN: GradationBtnStyleData = {
    buttonText: 'BUTTON',
    buttonLink: '',
    textColor: '#ffffff',
    gradationColor1: '#f97316',
    gradationColor2: '#ec4899',
    gradationColor3: '#f97316',
    gradationColor4: '#ec4899',
    borderRadius: '12',
    borderWidth: '0',
    borderColor: '#000000',
    shadowOffsetX: '0',
    shadowOffsetY: '4',
    shadowBlurRadius: '15',
    shadowColor: '#f9731680',
    width: '200',
    height: '50',
};

export const OCEAN_BTN: GradationBtnStyleData = {
    buttonText: 'BUTTON',
    buttonLink: '',
    textColor: '#ffffff',
    gradationColor1: '#06b6d4',
    gradationColor2: '#3b82f6',
    gradationColor3: '#06b6d4',
    gradationColor4: '#3b82f6',
    borderRadius: '12',
    borderWidth: '0',
    borderColor: '#000000',
    shadowOffsetX: '0',
    shadowOffsetY: '4',
    shadowBlurRadius: '15',
    shadowColor: '#3b82f680',
    width: '200',
    height: '50',
};

export const FOREST_BTN: GradationBtnStyleData = {
    buttonText: 'BUTTON',
    buttonLink: '',
    textColor: '#ffffff',
    gradationColor1: '#10b981',
    gradationColor2: '#059669',
    gradationColor3: '#10b981',
    gradationColor4: '#059669',
    borderRadius: '12',
    borderWidth: '0',
    borderColor: '#000000',
    shadowOffsetX: '0',
    shadowOffsetY: '4',
    shadowBlurRadius: '15',
    shadowColor: '#10b98180',
    width: '200',
    height: '50',
};

export const PURPLE_HAZE_BTN: GradationBtnStyleData = {
    buttonText: 'BUTTON',
    buttonLink: '',
    textColor: '#ffffff',
    gradationColor1: '#8b5cf6',
    gradationColor2: '#a855f7',
    gradationColor3: '#d946ef',
    gradationColor4: '#8b5cf6',
    borderRadius: '25',
    borderWidth: '0',
    borderColor: '#000000',
    shadowOffsetX: '0',
    shadowOffsetY: '4',
    shadowBlurRadius: '20',
    shadowColor: '#8b5cf680',
    width: '200',
    height: '50',
};

export const FIRE_BTN: GradationBtnStyleData = {
    buttonText: 'BUTTON',
    buttonLink: '',
    textColor: '#ffffff',
    gradationColor1: '#ef4444',
    gradationColor2: '#f97316',
    gradationColor3: '#fbbf24',
    gradationColor4: '#ef4444',
    borderRadius: '8',
    borderWidth: '0',
    borderColor: '#000000',
    shadowOffsetX: '0',
    shadowOffsetY: '4',
    shadowBlurRadius: '15',
    shadowColor: '#ef444480',
    width: '200',
    height: '50',
};

export const AURORA_BTN: GradationBtnStyleData = {
    buttonText: 'BUTTON',
    buttonLink: '',
    textColor: '#ffffff',
    gradationColor1: '#22d3ee',
    gradationColor2: '#a78bfa',
    gradationColor3: '#f472b6',
    gradationColor4: '#22d3ee',
    borderRadius: '30',
    borderWidth: '0',
    borderColor: '#000000',
    shadowOffsetX: '0',
    shadowOffsetY: '6',
    shadowBlurRadius: '20',
    shadowColor: '#a78bfa60',
    width: '200',
    height: '50',
};

export const MIDNIGHT_BTN: GradationBtnStyleData = {
    buttonText: 'BUTTON',
    buttonLink: '',
    textColor: '#ffffff',
    gradationColor1: '#1e3a8a',
    gradationColor2: '#312e81',
    gradationColor3: '#1e3a8a',
    gradationColor4: '#312e81',
    borderRadius: '10',
    borderWidth: '0',
    borderColor: '#000000',
    shadowOffsetX: '0',
    shadowOffsetY: '4',
    shadowBlurRadius: '15',
    shadowColor: '#1e3a8a80',
    width: '200',
    height: '50',
};

export const ROSE_GOLD_BTN: GradationBtnStyleData = {
    buttonText: 'BUTTON',
    buttonLink: '',
    textColor: '#ffffff',
    gradationColor1: '#f43f5e',
    gradationColor2: '#fb7185',
    gradationColor3: '#fda4af',
    gradationColor4: '#f43f5e',
    borderRadius: '50',
    borderWidth: '0',
    borderColor: '#000000',
    shadowOffsetX: '0',
    shadowOffsetY: '4',
    shadowBlurRadius: '15',
    shadowColor: '#f43f5e60',
    width: '200',
    height: '50',
};

export const CYBER_BTN: GradationBtnStyleData = {
    buttonText: 'BUTTON',
    buttonLink: '',
    textColor: '#00ffff',
    gradationColor1: '#0f172a',
    gradationColor2: '#1e293b',
    gradationColor3: '#0f172a',
    gradationColor4: '#1e293b',
    borderRadius: '5',
    borderWidth: '2',
    borderColor: '#00ffff',
    shadowOffsetX: '0',
    shadowOffsetY: '0',
    shadowBlurRadius: '20',
    shadowColor: '#00ffff80',
    width: '200',
    height: '50',
};

// ============================================
// Animated Button Styles
// ============================================

export const BOUNCE_BTN: AnimatedBtnStyleData = {
    buttonText: 'BOUNCE',
    buttonLink: '',
    textColor: '#ffffff',
    backgroundColor: '#8b5cf6',
    borderRadius: '12',
    borderWidth: '0',
    borderColor: '#000000',
    shadowOffsetX: '0',
    shadowOffsetY: '4',
    shadowBlurRadius: '15',
    shadowColor: '#8b5cf680',
    width: '200',
    height: '50',
    animationDuration: '0.5',
    animationIntensity: '8',
};

export const GLOW_BTN: AnimatedBtnStyleData = {
    buttonText: 'GLOW',
    buttonLink: '',
    textColor: '#ffffff',
    backgroundColor: '#06b6d4',
    borderRadius: '8',
    borderWidth: '0',
    borderColor: '#000000',
    shadowOffsetX: '0',
    shadowOffsetY: '0',
    shadowBlurRadius: '10',
    shadowColor: '#06b6d480',
    width: '200',
    height: '50',
    glowSize: '20',
    glowIntensity: '1',
};

export const PULSE_BTN: AnimatedBtnStyleData = {
    buttonText: 'PULSE',
    buttonLink: '',
    textColor: '#ffffff',
    backgroundColor: '#ef4444',
    borderRadius: '50',
    borderWidth: '0',
    borderColor: '#000000',
    shadowOffsetX: '0',
    shadowOffsetY: '4',
    shadowBlurRadius: '10',
    shadowColor: '#ef444480',
    width: '200',
    height: '50',
    animationDuration: '2',
    animationIntensity: '1.05',
};

export const SHAKE_BTN: AnimatedBtnStyleData = {
    buttonText: 'SHAKE',
    buttonLink: '',
    textColor: '#ffffff',
    backgroundColor: '#f97316',
    borderRadius: '8',
    borderWidth: '0',
    borderColor: '#000000',
    shadowOffsetX: '0',
    shadowOffsetY: '4',
    shadowBlurRadius: '10',
    shadowColor: '#f9731680',
    width: '200',
    height: '50',
    animationDuration: '0.5',
    animationIntensity: '5',
};

export const SLIDE_BTN: AnimatedBtnStyleData = {
    buttonText: 'SLIDE',
    buttonLink: '',
    textColor: '#ffffff',
    backgroundColor: '#10b981',
    borderRadius: '8',
    borderWidth: '0',
    borderColor: '#000000',
    shadowOffsetX: '0',
    shadowOffsetY: '4',
    shadowBlurRadius: '10',
    shadowColor: '#10b98180',
    width: '200',
    height: '50',
    secondaryColor: '#059669',
    animationDuration: '0.4',
};

export const RIPPLE_BTN: AnimatedBtnStyleData = {
    buttonText: 'RIPPLE',
    buttonLink: '',
    textColor: '#ffffff',
    backgroundColor: '#3b82f6',
    borderRadius: '8',
    borderWidth: '0',
    borderColor: '#000000',
    shadowOffsetX: '0',
    shadowOffsetY: '4',
    shadowBlurRadius: '10',
    shadowColor: '#3b82f680',
    width: '200',
    height: '50',
    animationDuration: '0.8',
};

// ============================================
// Button Style Mapping
// ============================================

export const BTN_STYLE: Record<string, ButtonStyleDataLegacy> = {
    // Simple Buttons
    SimpleBtn: SIMPLE_BTN,
    PrimaryBtn: PRIMARY_BTN,
    SecondaryBtn: SECONDARY_BTN,
    SuccessBtn: SUCCESS_BTN,
    DangerBtn: DANGER_BTN,
    WarningBtn: WARNING_BTN,
    DarkBtn: DARK_BTN,
    OutlineBtn: OUTLINE_BTN,
    PillBtn: PILL_BTN,
    GhostBtn: GHOST_BTN,
    NeonBtn: NEON_BTN,
    // Gradient Buttons
    GradationBtn: GRADATION_BTN,
    SunsetBtn: SUNSET_BTN,
    OceanBtn: OCEAN_BTN,
    ForestBtn: FOREST_BTN,
    PurpleHazeBtn: PURPLE_HAZE_BTN,
    FireBtn: FIRE_BTN,
    AuroraBtn: AURORA_BTN,
    MidnightBtn: MIDNIGHT_BTN,
    RoseGoldBtn: ROSE_GOLD_BTN,
    CyberBtn: CYBER_BTN,
    // Animated Buttons
    BounceBtn: BOUNCE_BTN,
    GlowBtn: GLOW_BTN,
    PulseBtn: PULSE_BTN,
    ShakeBtn: SHAKE_BTN,
    SlideBtn: SLIDE_BTN,
    RippleBtn: RIPPLE_BTN,
};

// Button categories for UI organization
export const SIMPLE_BTN_STYLES = [
    'SimpleBtn',
    'PrimaryBtn',
    'SecondaryBtn',
    'SuccessBtn',
    'DangerBtn',
    'WarningBtn',
    'DarkBtn',
    'OutlineBtn',
    'PillBtn',
    'GhostBtn',
    'NeonBtn',
] as const;

export const GRADIENT_BTN_STYLES = [
    'GradationBtn',
    'SunsetBtn',
    'OceanBtn',
    'ForestBtn',
    'PurpleHazeBtn',
    'FireBtn',
    'AuroraBtn',
    'MidnightBtn',
    'RoseGoldBtn',
    'CyberBtn',
] as const;

export const ANIMATED_BTN_STYLES = [
    'BounceBtn',
    'GlowBtn',
    'PulseBtn',
    'ShakeBtn',
    'SlideBtn',
    'RippleBtn',
] as const;

export const FORM_MENU = ['텍스트 & 링크', '색상', '테두리', '그림자', '크기'];
