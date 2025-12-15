import styled from 'styled-components';

interface GradationBtnProps {
    $textColor?: string;
    $gradationColor1?: string;
    $gradationColor2?: string;
    $gradationColor3?: string;
    $gradationColor4?: string;
    $borderRadius?: number;
    $borderWidth?: number;
    $borderColor?: string;
    $shadowOffsetX?: number;
    $shadowOffsetY?: number;
    $shadowBlurRadius?: number;
    $shadowColor?: string;
}

export const GradationBtn = styled.a<GradationBtnProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.5rem 0;
    width: 100%;
    height: 100%;
    border-radius: ${({ $borderRadius }) => $borderRadius}px;
    background: ${({ $gradationColor1, $gradationColor2, $gradationColor3, $gradationColor4 }) =>
        `linear-gradient(90deg, ${$gradationColor1}, ${$gradationColor2}, ${$gradationColor3}, ${$gradationColor4})`};
    background-size: 400%;
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
        animation-name: gradient;
        animation-duration: 8s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
    }

    @keyframes gradient {
        0% {
            background-position: 0%;
        }
        100% {
            background-position: 400%;
        }
    }
`;
