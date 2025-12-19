// ============================================
// Text Style Types
// ============================================

export type HeadingTextStyle = 'H1Text' | 'H2Text' | 'H3Text';

export type BodyTextStyle = 'PText' | 'StrongText';

export type TextStyle = HeadingTextStyle | BodyTextStyle;

// ============================================
// Text Style Data Interfaces
// ============================================

export interface TextStyleData {
    text: string;
    textLink: string;
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
    letterSpacing: string;
    textColor: string;
    textAlign: 'left' | 'center' | 'right';
    textDecoration: 'none' | 'underline' | 'line-through';
    textTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
    shadowOffsetX: string;
    shadowOffsetY: string;
    shadowBlurRadius: string;
    shadowColor: string;
    width: string;
    height: string;
}

// Legacy type for backwards compatibility
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TextStyleDataLegacy = Record<string, any>;

// ============================================
// Styled Component Props
// ============================================

export interface TextElementProps {
    $fontFamily?: string;
    $fontSize?: number;
    $fontWeight?: string;
    $lineHeight?: string;
    $letterSpacing?: string;
    $textColor?: string;
    $textAlign?: string;
    $textDecoration?: string;
    $textTransform?: string;
    $shadowOffsetX?: number;
    $shadowOffsetY?: number;
    $shadowBlurRadius?: number;
    $shadowColor?: string;
}

export interface GradientTextProps extends Omit<TextElementProps, '$textColor'> {
    $gradientColor1: string;
    $gradientColor2: string;
    $gradientAngle: string;
}
