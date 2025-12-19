import styled from 'styled-components';

interface ImageOverlayProps {
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

export const ImageOverlayElement = styled.a<ImageOverlayProps>`
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: ${({ $borderRadius }) => $borderRadius}px;
    border: ${({ $borderWidth, $borderColor }) =>
        $borderWidth ? `${$borderWidth}px solid ${$borderColor}` : 'none'};
    box-shadow: ${({ $shadowOffsetX, $shadowOffsetY, $shadowBlurRadius, $shadowColor }) =>
        $shadowOffsetX || $shadowOffsetY || $shadowBlurRadius
            ? `${$shadowOffsetX || 0}px ${$shadowOffsetY || 0}px ${$shadowBlurRadius || 0}px ${$shadowColor || 'transparent'}`
            : 'none'};
    cursor: pointer;
    transition: 0.3s ease-in-out;

    img {
        width: 100%;
        height: 100%;
        object-fit: ${({ $objectFit }) => $objectFit || 'cover'};
        opacity: ${({ $opacity }) => ($opacity !== undefined ? $opacity / 100 : 1)};
        transition: 0.3s ease-in-out;
    }

    &:hover {
        opacity: 0.9;
    }
`;

interface ImageOverlayContainerProps {
    $borderRadius?: number;
    $borderWidth?: number;
    $borderColor?: string;
    $shadowOffsetX?: number;
    $shadowOffsetY?: number;
    $shadowBlurRadius?: number;
    $shadowColor?: string;
}

export const ImageOverlayContainer = styled.div<ImageOverlayContainerProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: ${({ $borderRadius }) => $borderRadius}px;
    border: ${({ $borderWidth, $borderColor }) =>
        $borderWidth ? `${$borderWidth}px solid ${$borderColor}` : 'none'};
    box-shadow: ${({ $shadowOffsetX, $shadowOffsetY, $shadowBlurRadius, $shadowColor }) =>
        $shadowOffsetX || $shadowOffsetY || $shadowBlurRadius
            ? `${$shadowOffsetX || 0}px ${$shadowOffsetY || 0}px ${$shadowBlurRadius || 0}px ${$shadowColor || 'transparent'}`
            : 'none'};
    background-color: #f3f4f6;
    color: #9ca3af;
    font-size: 14px;
    transition: 0.3s ease-in-out;
`;

// Polaroid style with padding at bottom
interface PolaroidImageProps extends ImageOverlayProps {
    $paddingBottom?: number;
}

export const PolaroidImageElement = styled.a<PolaroidImageProps>`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    padding: 8px;
    padding-bottom: ${({ $paddingBottom }) => $paddingBottom || 40}px;
    border-radius: ${({ $borderRadius }) => $borderRadius}px;
    box-shadow: ${({ $shadowOffsetX, $shadowOffsetY, $shadowBlurRadius, $shadowColor }) =>
        $shadowOffsetX || $shadowOffsetY || $shadowBlurRadius
            ? `${$shadowOffsetX || 0}px ${$shadowOffsetY || 0}px ${$shadowBlurRadius || 0}px ${$shadowColor || 'transparent'}`
            : '0 4px 15px rgba(0, 0, 0, 0.2)'};
    cursor: pointer;
    transition: 0.3s ease-in-out;

    img {
        width: 100%;
        flex: 1;
        object-fit: ${({ $objectFit }) => $objectFit || 'cover'};
        opacity: ${({ $opacity }) => ($opacity !== undefined ? $opacity / 100 : 1)};
    }

    &:hover {
        opacity: 0.9;
    }
`;
