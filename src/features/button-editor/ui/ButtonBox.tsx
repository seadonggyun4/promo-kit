import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ButtonSetModal } from './ButtonSetModal';
import { BTN_STYLE, SIMPLE_BTN_STYLES, GRADIENT_BTN_STYLES, ANIMATED_BTN_STYLES } from '@/shared/constants';
import { useElementsStore } from '@/shared/store';
import { ButtonStyle, AnimatedBtnStyle } from '@/shared/types';
import { SimpleBtn, GradationBtn, BounceBtn, GlowBtn, PulseBtn, ShakeBtn, SlideBtn, RippleBtn } from '@/entities/button';

const AnimatedComponents = {
    BounceBtn,
    GlowBtn,
    PulseBtn,
    ShakeBtn,
    SlideBtn,
    RippleBtn,
} as const;

export function ButtonBox() {
    const { t } = useTranslation();
    const { selected, setSelected } = useElementsStore();

    const setSelectedBtn = (style: ButtonStyle) => {
        setSelected({
            id: '',
            type: 'button',
            style,
            styleData: BTN_STYLE[style],
            x: 0,
            y: 0,
        });
    };

    return (
        <ButtonBoxStyle>
            {/* Simple Buttons */}
            <CategoryLabel>{t('editor.simpleButtons')}</CategoryLabel>
            <ButtonGrid>
                {SIMPLE_BTN_STYLES.map((styleName, index) => {
                    const style = BTN_STYLE[styleName];
                    return (
                        <ButtonWrapper key={styleName} $delay={index * 30} onClick={() => setSelectedBtn(styleName)}>
                            <SimpleBtn
                                $backgroundColor={style.backgroundColor}
                                $textColor={style.textColor}
                                $borderRadius={Number(style.borderRadius)}
                                style={{
                                    borderWidth: `${style.borderWidth}px`,
                                    borderStyle: 'solid',
                                    borderColor: style.borderColor,
                                    boxShadow: `${style.shadowOffsetX}px ${style.shadowOffsetY}px ${style.shadowBlurRadius}px ${style.shadowColor}`,
                                    padding: '0.5rem 1rem',
                                    fontSize: '0.75rem',
                                }}
                            >
                                {style.buttonText}
                            </SimpleBtn>
                        </ButtonWrapper>
                    );
                })}
            </ButtonGrid>

            {/* Gradient Buttons */}
            <CategoryLabel>{t('editor.gradientButtons')}</CategoryLabel>
            <ButtonGrid>
                {GRADIENT_BTN_STYLES.map((styleName, index) => {
                    const style = BTN_STYLE[styleName];
                    return (
                        <ButtonWrapper key={styleName} $delay={330 + index * 30} onClick={() => setSelectedBtn(styleName)}>
                            <GradationBtn
                                $textColor={style.textColor}
                                $gradationColor1={style.gradationColor1}
                                $gradationColor2={style.gradationColor2}
                                $gradationColor3={style.gradationColor3}
                                $gradationColor4={style.gradationColor4}
                                $borderRadius={Number(style.borderRadius)}
                                style={{
                                    borderWidth: `${style.borderWidth}px`,
                                    borderStyle: 'solid',
                                    borderColor: style.borderColor,
                                    boxShadow: `${style.shadowOffsetX}px ${style.shadowOffsetY}px ${style.shadowBlurRadius}px ${style.shadowColor}`,
                                    padding: '0.5rem 1rem',
                                    fontSize: '0.75rem',
                                }}
                            >
                                {style.buttonText}
                            </GradationBtn>
                        </ButtonWrapper>
                    );
                })}
            </ButtonGrid>

            {/* Animated Buttons */}
            <CategoryLabel>{t('editor.animatedButtons')}</CategoryLabel>
            <ButtonGrid>
                {ANIMATED_BTN_STYLES.map((styleName, index) => {
                    const style = BTN_STYLE[styleName];
                    const Component = AnimatedComponents[styleName as AnimatedBtnStyle];
                    return (
                        <ButtonWrapper key={styleName} $delay={630 + index * 30} onClick={() => setSelectedBtn(styleName)}>
                            <Component
                                $backgroundColor={style.backgroundColor}
                                $textColor={style.textColor}
                                $borderRadius={Number(style.borderRadius)}
                                $secondaryColor={style.secondaryColor}
                                style={{
                                    borderWidth: `${style.borderWidth}px`,
                                    borderStyle: 'solid',
                                    borderColor: style.borderColor,
                                    boxShadow: `${style.shadowOffsetX}px ${style.shadowOffsetY}px ${style.shadowBlurRadius}px ${style.shadowColor}`,
                                    padding: '0.5rem 1rem',
                                    fontSize: '0.75rem',
                                }}
                            >
                                {style.buttonText}
                            </Component>
                        </ButtonWrapper>
                    );
                })}
            </ButtonGrid>

            {selected?.type === 'button' && (
                <ButtonSetModal
                    selectedBtn={selected?.style}
                    closeModal={() => setSelected(null)}
                />
            )}
        </ButtonBoxStyle>
    );
}

const ButtonBoxStyle = styled.article`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const ButtonGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
`;

const popIn = keyframes`
    0% {
        opacity: 0;
        transform: translateY(10px) scale(0.95);
    }
    100% {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
`;

const ButtonWrapper = styled.div<{ $delay: number }>`
    cursor: pointer;
    opacity: 0;
    animation: ${popIn} 0.3s ease-out forwards;
    animation-delay: ${({ $delay }) => $delay}ms;

    &:hover {
        transform: scale(1.02);
    }

    &:active {
        transform: scale(0.98);
    }
`;

const CategoryLabel = styled.span`
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--c-text-secondary, #6b7280);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-top: 0.5rem;

    &:first-child {
        margin-top: 0;
    }
`;
