import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ButtonSetModal } from './ButtonSetModal';
import { BTN_STYLE, ANIMATED_BTN_STYLES } from '@/shared/constants';
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

    const simpleStyle = BTN_STYLE['SimpleBtn'];
    const gradationStyle = BTN_STYLE['GradationBtn'];

    return (
        <ButtonBoxStyle>
            <CategoryLabel>{t('editor.simpleButtons')}</CategoryLabel>
            <ButtonWrapper $delay={0} onClick={() => setSelectedBtn('SimpleBtn')}>
                <SimpleBtn
                    $backgroundColor={simpleStyle.backgroundColor}
                    $textColor={simpleStyle.textColor}
                    $borderRadius={Number(simpleStyle.borderRadius)}
                    style={{
                        borderWidth: `${simpleStyle.borderWidth}px`,
                        borderStyle: 'solid',
                        borderColor: simpleStyle.borderColor,
                        boxShadow: `${simpleStyle.shadowOffsetX}px ${simpleStyle.shadowOffsetY}px ${simpleStyle.shadowBlurRadius}px ${simpleStyle.shadowColor}`,
                        padding: '0.5rem 1rem',
                        fontSize: '0.875rem',
                    }}
                >
                    {simpleStyle.buttonText}
                </SimpleBtn>
            </ButtonWrapper>

            <CategoryLabel>{t('editor.gradientButtons')}</CategoryLabel>
            <ButtonWrapper $delay={50} onClick={() => setSelectedBtn('GradationBtn')}>
                <GradationBtn
                    $textColor={gradationStyle.textColor}
                    $gradationColor1={gradationStyle.gradationColor1}
                    $gradationColor2={gradationStyle.gradationColor2}
                    $gradationColor3={gradationStyle.gradationColor3}
                    $gradationColor4={gradationStyle.gradationColor4}
                    $borderRadius={Number(gradationStyle.borderRadius)}
                    style={{
                        borderWidth: `${gradationStyle.borderWidth}px`,
                        borderStyle: 'solid',
                        borderColor: gradationStyle.borderColor,
                        boxShadow: `${gradationStyle.shadowOffsetX}px ${gradationStyle.shadowOffsetY}px ${gradationStyle.shadowBlurRadius}px ${gradationStyle.shadowColor}`,
                        padding: '0.5rem 1rem',
                        fontSize: '0.875rem',
                    }}
                >
                    {gradationStyle.buttonText}
                </GradationBtn>
            </ButtonWrapper>

            <CategoryLabel>{t('editor.animatedButtons')}</CategoryLabel>
            {ANIMATED_BTN_STYLES.map((styleName, index) => {
                const style = BTN_STYLE[styleName];
                const Component = AnimatedComponents[styleName as AnimatedBtnStyle];
                return (
                    <ButtonWrapper key={styleName} $delay={100 + index * 50} onClick={() => setSelectedBtn(styleName)}>
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
                                fontSize: '0.875rem',
                            }}
                        >
                            {style.buttonText}
                        </Component>
                    </ButtonWrapper>
                );
            })}

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
