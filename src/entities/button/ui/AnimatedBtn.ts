import styled, { css } from 'styled-components';

interface AnimatedBtnProps {
    $backgroundColor?: string;
    $textColor?: string;
    $borderRadius?: number;
    $borderWidth?: number;
    $borderColor?: string;
    $shadowOffsetX?: number;
    $shadowOffsetY?: number;
    $shadowBlurRadius?: number;
    $shadowColor?: string;
    $secondaryColor?: string;
    $animationDuration?: number;
    $animationIntensity?: number;
    $glowSize?: number;
    $glowIntensity?: number;
}

// Base styles shared by all animated buttons
const baseStyles = css<AnimatedBtnProps>`
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
    text-decoration: none;
`;

// Bounce Button - bounces up on hover
export const BounceBtn = styled.a<AnimatedBtnProps>`
    ${baseStyles}
    --bounce-height: ${({ $animationIntensity }) => $animationIntensity || 8}px;
    --bounce-duration: ${({ $animationDuration }) => $animationDuration || 0.5}s;
    transition: transform 0.2s ease;

    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(calc(-1 * var(--bounce-height))); }
    }

    &:hover {
        animation: bounce var(--bounce-duration) ease;
    }
`;

// Glow Button - glows on hover
export const GlowBtn = styled.a<AnimatedBtnProps>`
    ${baseStyles}
    --glow-size: ${({ $glowSize }) => $glowSize || 20}px;
    --glow-intensity: ${({ $glowIntensity }) => $glowIntensity || 1};
    transition: box-shadow 0.3s ease, transform 0.2s ease, filter 0.3s ease;

    &:hover {
        box-shadow: 0 0 var(--glow-size) ${({ $backgroundColor }) => $backgroundColor},
                    0 0 calc(var(--glow-size) * 2) ${({ $backgroundColor }) => $backgroundColor},
                    0 0 calc(var(--glow-size) * 3) ${({ $backgroundColor }) => $backgroundColor}80 !important;
        filter: brightness(calc(1 + var(--glow-intensity) * 0.2));
        transform: translateY(-2px);
    }
`;

// Pulse Button - continuously pulses
export const PulseBtn = styled.a<AnimatedBtnProps>`
    ${baseStyles}
    --pulse-scale: ${({ $animationIntensity }) => $animationIntensity || 1.05};
    --pulse-duration: ${({ $animationDuration }) => $animationDuration || 2}s;

    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(var(--pulse-scale)); }
    }

    animation: pulse var(--pulse-duration) ease-in-out infinite;

    &:hover {
        animation-play-state: paused;
        transform: scale(calc(var(--pulse-scale) + 0.03));
        transition: transform 0.2s ease;
    }
`;

// Shake Button - shakes on hover
export const ShakeBtn = styled.a<AnimatedBtnProps>`
    ${baseStyles}
    --shake-distance: ${({ $animationIntensity }) => $animationIntensity || 5}px;
    --shake-duration: ${({ $animationDuration }) => $animationDuration || 0.5}s;
    transition: transform 0.2s ease;

    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(calc(-1 * var(--shake-distance))); }
        40% { transform: translateX(var(--shake-distance)); }
        60% { transform: translateX(calc(-1 * var(--shake-distance))); }
        80% { transform: translateX(var(--shake-distance)); }
    }

    &:hover {
        animation: shake var(--shake-duration) ease;
    }
`;

// Slide Button - background slides on hover
export const SlideBtn = styled.a<AnimatedBtnProps>`
    ${baseStyles}
    --slide-duration: ${({ $animationDuration }) => $animationDuration || 0.4}s;
    position: relative;
    overflow: hidden;
    background: linear-gradient(
        90deg,
        ${({ $backgroundColor }) => $backgroundColor} 0%,
        ${({ $backgroundColor }) => $backgroundColor} 50%,
        ${({ $secondaryColor, $backgroundColor }) => $secondaryColor || $backgroundColor} 50%,
        ${({ $secondaryColor, $backgroundColor }) => $secondaryColor || $backgroundColor} 100%
    );
    background-size: 200% 100%;
    background-position: 0% 0%;
    transition: background-position var(--slide-duration) ease, transform 0.2s ease;

    &:hover {
        background-position: 100% 0%;
        transform: translateY(-2px);
    }
`;

// Ripple Button - ripple effect on click/hover
export const RippleBtn = styled.a<AnimatedBtnProps>`
    ${baseStyles}
    --ripple-duration: ${({ $animationDuration }) => $animationDuration || 0.8}s;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s ease;

    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 0.6;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }

    &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%);
        border-radius: 50%;
        opacity: 0;
    }

    &:hover {
        transform: translateY(-2px);
    }

    &:hover::after {
        animation: ripple var(--ripple-duration) ease-out;
    }

    &:active {
        transform: scale(0.98);
    }
`;
