import styled from 'styled-components';

interface SimpleBtnProps {
    $backgroundColor?: string;
    $textColor?: string;
    $borderRadius?: number;
    $borderWidth?: number;
    $borderColor?: string;
    $shadowOffsetX?: number;
    $shadowOffsetY?: number;
    $shadowBlurRadius?: number;
    $shadowColor?: string;
}

export const SimpleBtn = styled.a<SimpleBtnProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.5rem 0;
    width: 100%;
    height: 100%;
    border-radius: ${({ $borderRadius }) => $borderRadius}px;
    background-color: ${({ $backgroundColor }) => $backgroundColor};
    color: ${({ $textColor }) => $textColor};
    border: ${({ $borderWidth, $borderColor }) =>
        $borderWidth ? `${$borderWidth}px solid ${$borderColor}` : 'none'};
    box-shadow: ${({ $shadowOffsetX, $shadowOffsetY, $shadowBlurRadius, $shadowColor }) =>
        $shadowOffsetX || $shadowOffsetY || $shadowBlurRadius
            ? `${$shadowOffsetX || 0}px ${$shadowOffsetY || 0}px ${$shadowBlurRadius || 0}px ${$shadowColor || 'transparent'}`
            : 'none'};
    cursor: pointer;
    transition: 0.3s ease-in-out;
    text-decoration: none;

    &:hover {
        opacity: 0.9;
    }
`;
