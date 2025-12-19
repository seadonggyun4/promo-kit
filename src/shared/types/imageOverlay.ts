// ============================================
// Image Overlay Style Types
// ============================================

export type SimpleImageStyle = 'SimpleImage' | 'RoundedImage' | 'CircleImage' | 'PillImage';

export type FramedImageStyle = 'BorderedImage' | 'ShadowImage' | 'NeonBorderImage' | 'DoubleFrameImage';

export type DecorativeImageStyle = 'PolaroidImage' | 'GradientBorderImage' | 'GlowImage' | 'VintageImage';

export type ImageOverlayStyle = SimpleImageStyle | FramedImageStyle | DecorativeImageStyle;

// ============================================
// Image Overlay Style Data Interfaces
// ============================================

export interface ImageOverlayStyleData {
    imageUrl: string;
    imageLink: string;
    altText: string;
    objectFit: 'cover' | 'contain' | 'fill' | 'none';
    opacity: string;
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

// Legacy type for backwards compatibility
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ImageOverlayStyleDataLegacy = Record<string, any>;

// ============================================
// Styled Component Props
// ============================================

export interface ImageOverlayElementProps {
    $objectFit?: string;
    $opacity?: number;
    $borderRadius?: number;
    $borderWidth?: number;
    $borderColor?: string;
    $shadowOffsetX?: number;
    $shadowOffsetY?: number;
    $shadowBlurRadius?: number;
    $shadowColor?: string;
}
