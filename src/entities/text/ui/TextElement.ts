import styled, { css } from 'styled-components';

interface TextElementProps {
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

const textShadowStyles = css<TextElementProps>`
    text-shadow: ${({ $shadowOffsetX, $shadowOffsetY, $shadowBlurRadius, $shadowColor }) =>
        $shadowOffsetX || $shadowOffsetY || $shadowBlurRadius
            ? `${$shadowOffsetX || 0}px ${$shadowOffsetY || 0}px ${$shadowBlurRadius || 0}px ${$shadowColor || 'transparent'}`
            : 'none'};
`;

export const TextElement = styled.a<TextElementProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-family: ${({ $fontFamily }) => $fontFamily || 'Pretendard, sans-serif'};
    font-size: ${({ $fontSize }) => $fontSize}px;
    font-weight: ${({ $fontWeight }) => $fontWeight || '400'};
    line-height: ${({ $lineHeight }) => $lineHeight || '1.5'};
    letter-spacing: ${({ $letterSpacing }) => $letterSpacing}em;
    color: ${({ $textColor }) => $textColor};
    text-align: ${({ $textAlign }) => $textAlign || 'center'};
    text-decoration: ${({ $textDecoration }) => $textDecoration || 'none'};
    text-transform: ${({ $textTransform }) => $textTransform || 'none'};
    ${textShadowStyles}
    cursor: pointer;
    transition: 0.3s ease-in-out;
    word-break: keep-all;
    white-space: pre-wrap;

    &:hover {
        opacity: 0.9;
    }
`;

interface GradientTextProps extends Omit<TextElementProps, '$textColor'> {
    $gradientColor1?: string;
    $gradientColor2?: string;
    $gradientAngle?: string;
}

export const GradientTextElement = styled.a<GradientTextProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-family: ${({ $fontFamily }) => $fontFamily || 'Pretendard, sans-serif'};
    font-size: ${({ $fontSize }) => $fontSize}px;
    font-weight: ${({ $fontWeight }) => $fontWeight || '400'};
    line-height: ${({ $lineHeight }) => $lineHeight || '1.5'};
    letter-spacing: ${({ $letterSpacing }) => $letterSpacing}em;
    text-align: ${({ $textAlign }) => $textAlign || 'center'};
    text-decoration: ${({ $textDecoration }) => $textDecoration || 'none'};
    text-transform: ${({ $textTransform }) => $textTransform || 'none'};
    background: ${({ $gradientColor1, $gradientColor2, $gradientAngle }) =>
        `linear-gradient(${$gradientAngle || '90'}deg, ${$gradientColor1}, ${$gradientColor2})`};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    word-break: keep-all;
    white-space: pre-wrap;

    &:hover {
        opacity: 0.9;
    }
`;

interface OutlineTextProps extends TextElementProps {
    $strokeWidth?: string;
    $strokeColor?: string;
}

export const OutlineTextElement = styled.a<OutlineTextProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-family: ${({ $fontFamily }) => $fontFamily || 'Pretendard, sans-serif'};
    font-size: ${({ $fontSize }) => $fontSize}px;
    font-weight: ${({ $fontWeight }) => $fontWeight || '700'};
    line-height: ${({ $lineHeight }) => $lineHeight || '1.5'};
    letter-spacing: ${({ $letterSpacing }) => $letterSpacing}em;
    color: transparent;
    text-align: ${({ $textAlign }) => $textAlign || 'center'};
    text-decoration: ${({ $textDecoration }) => $textDecoration || 'none'};
    text-transform: ${({ $textTransform }) => $textTransform || 'none'};
    -webkit-text-stroke: ${({ $strokeWidth, $strokeColor }) =>
        `${$strokeWidth || '2'}px ${$strokeColor || '#1f2937'}`};
    cursor: pointer;
    transition: 0.3s ease-in-out;
    word-break: keep-all;
    white-space: pre-wrap;

    &:hover {
        opacity: 0.9;
    }
`;
