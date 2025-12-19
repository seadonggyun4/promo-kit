import { TextStyleData, TextStyleDataLegacy } from '../types';

// ============================================
// Heading Text Styles
// ============================================

export const H1_TEXT: TextStyleData = {
    text: 'Heading 1',
    textLink: '',
    fontFamily: 'Pretendard, sans-serif',
    fontSize: '48',
    fontWeight: '700',
    lineHeight: '1.2',
    letterSpacing: '-0.02',
    textColor: '#1f2937',
    textAlign: 'center',
    textDecoration: 'none',
    textTransform: 'none',
    shadowOffsetX: '0',
    shadowOffsetY: '0',
    shadowBlurRadius: '0',
    shadowColor: '#000000',
    width: '400',
    height: '60',
};

export const H2_TEXT: TextStyleData = {
    text: 'Heading 2',
    textLink: '',
    fontFamily: 'Pretendard, sans-serif',
    fontSize: '36',
    fontWeight: '700',
    lineHeight: '1.3',
    letterSpacing: '-0.01',
    textColor: '#1f2937',
    textAlign: 'center',
    textDecoration: 'none',
    textTransform: 'none',
    shadowOffsetX: '0',
    shadowOffsetY: '0',
    shadowBlurRadius: '0',
    shadowColor: '#000000',
    width: '350',
    height: '50',
};

export const H3_TEXT: TextStyleData = {
    text: 'Heading 3',
    textLink: '',
    fontFamily: 'Pretendard, sans-serif',
    fontSize: '28',
    fontWeight: '600',
    lineHeight: '1.4',
    letterSpacing: '0',
    textColor: '#374151',
    textAlign: 'center',
    textDecoration: 'none',
    textTransform: 'none',
    shadowOffsetX: '0',
    shadowOffsetY: '0',
    shadowBlurRadius: '0',
    shadowColor: '#000000',
    width: '300',
    height: '45',
};

// ============================================
// Body Text Styles
// ============================================

export const P_TEXT: TextStyleData = {
    text: 'Paragraph text content goes here',
    textLink: '',
    fontFamily: 'Pretendard, sans-serif',
    fontSize: '16',
    fontWeight: '400',
    lineHeight: '1.6',
    letterSpacing: '0',
    textColor: '#4b5563',
    textAlign: 'left',
    textDecoration: 'none',
    textTransform: 'none',
    shadowOffsetX: '0',
    shadowOffsetY: '0',
    shadowBlurRadius: '0',
    shadowColor: '#000000',
    width: '300',
    height: '30',
};

export const STRONG_TEXT: TextStyleData = {
    text: 'Strong text',
    textLink: '',
    fontFamily: 'Pretendard, sans-serif',
    fontSize: '16',
    fontWeight: '700',
    lineHeight: '1.6',
    letterSpacing: '0',
    textColor: '#1f2937',
    textAlign: 'left',
    textDecoration: 'none',
    textTransform: 'none',
    shadowOffsetX: '0',
    shadowOffsetY: '0',
    shadowBlurRadius: '0',
    shadowColor: '#000000',
    width: '200',
    height: '30',
};

// ============================================
// Text Style Mapping
// ============================================

export const TEXT_STYLE: Record<string, TextStyleDataLegacy> = {
    // Heading
    H1Text: H1_TEXT,
    H2Text: H2_TEXT,
    H3Text: H3_TEXT,
    // Body
    PText: P_TEXT,
    StrongText: STRONG_TEXT,
};

// Text categories for UI organization
export const HEADING_TEXT_STYLES = [
    'H1Text',
    'H2Text',
    'H3Text',
] as const;

export const BODY_TEXT_STYLES = [
    'PText',
    'StrongText',
] as const;

export const TEXT_FORM_MENU = ['텍스트 & 링크', '글꼴', '색상', '그림자', '크기'];
