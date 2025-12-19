import { ImageOverlayStyleData, ImageOverlayStyleDataLegacy } from '../types';

// ============================================
// Simple Image Styles
// ============================================

export const SIMPLE_IMAGE: ImageOverlayStyleData = {
    imageUrl: '',
    imageLink: '',
    altText: 'Image',
    objectFit: 'cover',
    opacity: '100',
    borderRadius: '0',
    borderWidth: '0',
    borderColor: '#000000',
    shadowOffsetX: '0',
    shadowOffsetY: '0',
    shadowBlurRadius: '0',
    shadowColor: '#000000',
    width: '200',
    height: '150',
};

export const ROUNDED_IMAGE: ImageOverlayStyleData = {
    imageUrl: '',
    imageLink: '',
    altText: 'Image',
    objectFit: 'cover',
    opacity: '100',
    borderRadius: '12',
    borderWidth: '0',
    borderColor: '#000000',
    shadowOffsetX: '0',
    shadowOffsetY: '0',
    shadowBlurRadius: '0',
    shadowColor: '#000000',
    width: '200',
    height: '150',
};

export const CIRCLE_IMAGE: ImageOverlayStyleData = {
    imageUrl: '',
    imageLink: '',
    altText: 'Image',
    objectFit: 'cover',
    opacity: '100',
    borderRadius: '50',
    borderWidth: '0',
    borderColor: '#000000',
    shadowOffsetX: '0',
    shadowOffsetY: '0',
    shadowBlurRadius: '0',
    shadowColor: '#000000',
    width: '150',
    height: '150',
};

export const PILL_IMAGE: ImageOverlayStyleData = {
    imageUrl: '',
    imageLink: '',
    altText: 'Image',
    objectFit: 'cover',
    opacity: '100',
    borderRadius: '100',
    borderWidth: '0',
    borderColor: '#000000',
    shadowOffsetX: '0',
    shadowOffsetY: '0',
    shadowBlurRadius: '0',
    shadowColor: '#000000',
    width: '250',
    height: '100',
};

// ============================================
// Framed Image Styles
// ============================================

export const BORDERED_IMAGE: ImageOverlayStyleData = {
    imageUrl: '',
    imageLink: '',
    altText: 'Image',
    objectFit: 'cover',
    opacity: '100',
    borderRadius: '8',
    borderWidth: '3',
    borderColor: '#d1d5db',
    shadowOffsetX: '0',
    shadowOffsetY: '0',
    shadowBlurRadius: '0',
    shadowColor: '#000000',
    width: '200',
    height: '150',
};

export const SHADOW_IMAGE: ImageOverlayStyleData = {
    imageUrl: '',
    imageLink: '',
    altText: 'Image',
    objectFit: 'cover',
    opacity: '100',
    borderRadius: '8',
    borderWidth: '0',
    borderColor: '#000000',
    shadowOffsetX: '0',
    shadowOffsetY: '8',
    shadowBlurRadius: '24',
    shadowColor: '#00000030',
    width: '200',
    height: '150',
};

export const NEON_BORDER_IMAGE: ImageOverlayStyleData = {
    imageUrl: '',
    imageLink: '',
    altText: 'Image',
    objectFit: 'cover',
    opacity: '100',
    borderRadius: '8',
    borderWidth: '3',
    borderColor: '#00ff88',
    shadowOffsetX: '0',
    shadowOffsetY: '0',
    shadowBlurRadius: '15',
    shadowColor: '#00ff88',
    width: '200',
    height: '150',
};

export const DOUBLE_FRAME_IMAGE: ImageOverlayStyleData = {
    imageUrl: '',
    imageLink: '',
    altText: 'Image',
    objectFit: 'cover',
    opacity: '100',
    borderRadius: '4',
    borderWidth: '6',
    borderColor: '#ffffff',
    shadowOffsetX: '0',
    shadowOffsetY: '4',
    shadowBlurRadius: '12',
    shadowColor: '#00000025',
    width: '200',
    height: '150',
};

// ============================================
// Decorative Image Styles
// ============================================

export const POLAROID_IMAGE: ImageOverlayStyleData = {
    imageUrl: '',
    imageLink: '',
    altText: 'Image',
    objectFit: 'cover',
    opacity: '100',
    borderRadius: '0',
    borderWidth: '0',
    borderColor: '#000000',
    shadowOffsetX: '0',
    shadowOffsetY: '4',
    shadowBlurRadius: '15',
    shadowColor: '#00000030',
    width: '180',
    height: '220',
};

export const GRADIENT_BORDER_IMAGE: ImageOverlayStyleData = {
    imageUrl: '',
    imageLink: '',
    altText: 'Image',
    objectFit: 'cover',
    opacity: '100',
    borderRadius: '12',
    borderWidth: '4',
    borderColor: '#8b5cf6',
    shadowOffsetX: '0',
    shadowOffsetY: '0',
    shadowBlurRadius: '0',
    shadowColor: '#000000',
    width: '200',
    height: '150',
};

export const GLOW_IMAGE: ImageOverlayStyleData = {
    imageUrl: '',
    imageLink: '',
    altText: 'Image',
    objectFit: 'cover',
    opacity: '100',
    borderRadius: '16',
    borderWidth: '0',
    borderColor: '#000000',
    shadowOffsetX: '0',
    shadowOffsetY: '0',
    shadowBlurRadius: '30',
    shadowColor: '#3b82f680',
    width: '200',
    height: '150',
};

export const VINTAGE_IMAGE: ImageOverlayStyleData = {
    imageUrl: '',
    imageLink: '',
    altText: 'Image',
    objectFit: 'cover',
    opacity: '90',
    borderRadius: '4',
    borderWidth: '8',
    borderColor: '#f5f5dc',
    shadowOffsetX: '2',
    shadowOffsetY: '2',
    shadowBlurRadius: '8',
    shadowColor: '#8b4513',
    width: '200',
    height: '150',
};

// ============================================
// Image Style Mapping
// ============================================

export const IMAGE_OVERLAY_STYLE: Record<string, ImageOverlayStyleDataLegacy> = {
    // Simple
    SimpleImage: SIMPLE_IMAGE,
    RoundedImage: ROUNDED_IMAGE,
    CircleImage: CIRCLE_IMAGE,
    PillImage: PILL_IMAGE,
    // Framed
    BorderedImage: BORDERED_IMAGE,
    ShadowImage: SHADOW_IMAGE,
    NeonBorderImage: NEON_BORDER_IMAGE,
    DoubleFrameImage: DOUBLE_FRAME_IMAGE,
    // Decorative
    PolaroidImage: POLAROID_IMAGE,
    GradientBorderImage: GRADIENT_BORDER_IMAGE,
    GlowImage: GLOW_IMAGE,
    VintageImage: VINTAGE_IMAGE,
};

// Image categories for UI organization
export const SIMPLE_IMAGE_STYLES = [
    'SimpleImage',
    'RoundedImage',
    'CircleImage',
    'PillImage',
] as const;

export const FRAMED_IMAGE_STYLES = [
    'BorderedImage',
    'ShadowImage',
    'NeonBorderImage',
    'DoubleFrameImage',
] as const;

export const DECORATIVE_IMAGE_STYLES = [
    'PolaroidImage',
    'GradientBorderImage',
    'GlowImage',
    'VintageImage',
] as const;

export const IMAGE_FORM_MENU = ['이미지 & 링크', '효과', '테두리', '그림자', '크기'];
