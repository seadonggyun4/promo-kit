import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { SimpleBtnForm } from './SimpleBtnForm';
import { GradationBtnForm } from './GradationBtnForm';
import { AnimatedBtnForm } from './AnimatedBtnForm';
import { SimpleBtn, GradationBtn, BounceBtn, GlowBtn, PulseBtn, ShakeBtn, SlideBtn, RippleBtn } from '@/entities/button';
import { useElementsStore } from '@/shared/store';
import { useSimpleBtn, useGradationBtn, useAnimatedBtn } from '../model';
import { ButtonStyle, ButtonStyleDataLegacy, SimpleBtnStyle, AnimatedBtnStyle } from '@/shared/types';
import { SIMPLE_BTN_STYLES, ANIMATED_BTN_STYLES } from '@/shared/constants';

interface ButtonSetModalProps {
    selectedBtn: ButtonStyle;
    closeModal: () => void;
}

// Helper to determine if a button style is a simple (solid) button
const isSimpleBtnStyle = (style: ButtonStyle): style is SimpleBtnStyle => {
    return (SIMPLE_BTN_STYLES as readonly string[]).includes(style);
};

// Helper to determine if a button style is an animated button
const isAnimatedBtnStyle = (style: ButtonStyle): style is AnimatedBtnStyle => {
    return (ANIMATED_BTN_STYLES as readonly string[]).includes(style);
};

export function ButtonSetModal({ selectedBtn, closeModal }: ButtonSetModalProps) {
    const { t } = useTranslation();
    const { createSampleButton, updateSampleButton } = useElementsStore();
    const isSimpleBtn = isSimpleBtnStyle(selectedBtn);
    const isAnimatedBtn = isAnimatedBtnStyle(selectedBtn);
    // Each button type uses its own hook
    const simpleBtnHook = useSimpleBtn(isSimpleBtn ? selectedBtn : undefined);
    const gradationBtnHook = useGradationBtn(!isSimpleBtn && !isAnimatedBtn ? selectedBtn : undefined);
    const animatedBtnHook = useAnimatedBtn(isAnimatedBtn ? selectedBtn : undefined);

    const getButtonStyleData = (): ButtonStyleDataLegacy => {
        if (isAnimatedBtn) {
            return animatedBtnHook.buttonStyle;
        }
        if (isSimpleBtn) {
            return simpleBtnHook.buttonStyle;
        }
        return gradationBtnHook.buttonStyle;
    };

    const renderAnimatedButton = (style: ButtonStyleDataLegacy) => {
        const commonProps = {
            $backgroundColor: style.backgroundColor,
            $textColor: style.textColor,
            $borderRadius: Number(style.borderRadius),
            $secondaryColor: style.secondaryColor,
            $animationDuration: style.animationDuration ? Number(style.animationDuration) : undefined,
            $animationIntensity: style.animationIntensity ? Number(style.animationIntensity) : undefined,
            $glowSize: style.glowSize ? Number(style.glowSize) : undefined,
            $glowIntensity: style.glowIntensity ? Number(style.glowIntensity) : undefined,
            href: style.buttonLink,
            target: '_blank' as const,
            onClick: (e: React.MouseEvent) => e.preventDefault(),
            style: {
                width: `${style.width}px`,
                height: `${style.height}px`,
                borderWidth: `${style.borderWidth}px`,
                borderStyle: 'solid' as const,
                borderColor: style.borderColor,
                boxShadow: `${style.shadowOffsetX}px ${style.shadowOffsetY}px ${style.shadowBlurRadius}px ${style.shadowColor}`,
            },
        };

        const AnimatedComponents: Record<AnimatedBtnStyle, typeof BounceBtn> = {
            BounceBtn,
            GlowBtn,
            PulseBtn,
            ShakeBtn,
            SlideBtn,
            RippleBtn,
        };

        const Component = AnimatedComponents[selectedBtn as AnimatedBtnStyle];
        return <Component {...commonProps}>{style.buttonText}</Component>;
    };

    const renderPreviewButton = () => {
        if (isAnimatedBtn) {
            const style = animatedBtnHook.buttonStyle;
            return renderAnimatedButton(style);
        }

        if (isSimpleBtn) {
            const style = simpleBtnHook.buttonStyle;
            return (
                <SimpleBtn
                    $backgroundColor={style.backgroundColor}
                    $textColor={style.textColor}
                    $borderRadius={Number(style.borderRadius)}
                    href={style.buttonLink}
                    target="_blank"
                    onClick={(e) => e.preventDefault()}
                    style={{
                        width: `${style.width}px`,
                        height: `${style.height}px`,
                        borderWidth: `${style.borderWidth}px`,
                        borderStyle: 'solid',
                        borderColor: style.borderColor,
                        boxShadow: `${style.shadowOffsetX}px ${style.shadowOffsetY}px ${style.shadowBlurRadius}px ${style.shadowColor}`,
                    }}
                >
                    {style.buttonText}
                </SimpleBtn>
            );
        }

        const style = gradationBtnHook.buttonStyle;
        return (
            <GradationBtn
                $textColor={style.textColor}
                $gradationColor1={style.gradationColor1}
                $gradationColor2={style.gradationColor2}
                $gradationColor3={style.gradationColor3}
                $gradationColor4={style.gradationColor4}
                $borderRadius={Number(style.borderRadius)}
                href={style.buttonLink}
                target="_blank"
                onClick={(e) => e.preventDefault()}
                style={{
                    width: `${style.width}px`,
                    height: `${style.height}px`,
                    borderWidth: `${style.borderWidth}px`,
                    borderStyle: 'solid',
                    borderColor: style.borderColor,
                    boxShadow: `${style.shadowOffsetX}px ${style.shadowOffsetY}px ${style.shadowBlurRadius}px ${style.shadowColor}`,
                }}
            >
                {style.buttonText}
            </GradationBtn>
        );
    };

    const addButton = () => {
        const currentSelected = useElementsStore.getState().selected;
        if (!currentSelected) return;
        const styleData = getButtonStyleData();
        if (currentSelected.id === '') {
            createSampleButton(selectedBtn, styleData, Date.now().toString());
        } else {
            updateSampleButton(currentSelected.id, selectedBtn, styleData);
        }
        closeModal();
    };

    return (
        <ModalWrapper>
            <ModalInner>
                <ElementWrapper>
                    {renderPreviewButton()}
                </ElementWrapper>
                <ElementSettingBox>
                    {isSimpleBtn && <SimpleBtnForm simpleBtnHook={simpleBtnHook} />}
                    {isAnimatedBtn && <AnimatedBtnForm animatedBtnHook={animatedBtnHook} />}
                    {!isSimpleBtn && !isAnimatedBtn && <GradationBtnForm gradationBtnHook={gradationBtnHook} />}
                    <BtnWrapper>
                        <button type="button" className="activeBtn" onClick={addButton}>{t('common.register')}</button>
                        <button type="button" className="cancelBtn" onClick={closeModal}>{t('common.cancel')}</button>
                    </BtnWrapper>
                </ElementSettingBox>
            </ModalInner>
        </ModalWrapper>
    );
}

const ModalWrapper = styled.div`
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    animation: show 0.3s ease-in-out forwards;

    @keyframes show {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`;

const ModalInner = styled.div`
    display: flex;
    align-items: center;
    column-gap: 2rem;
    width: 1000px;
    height: 500px;
    background-color: var(--c-background-secondary);
    border-radius: 15px;
    padding: 20px;
    animation: popUp 0.3s ease-in-out forwards;

    @keyframes popUp {
        0% {
            transform: scale(0.9);
        }
        100% {
            transform: scale(1);
        }
    }
`;

const ElementWrapper = styled.div`
    height: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--c-background-tertiary);
`;

const ElementSettingBox = styled.article`
    width: 400px;
    height: 100%;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
`;

const BtnWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 1rem;
    margin-top: auto;
    padding-top: 1rem;

    & .activeBtn,
    & .cancelBtn {
        padding: 0.5rem 1rem;
        border-radius: 5px;
        transition: 0.3s ease-in-out;
    }

    & .activeBtn:hover {
        color: #ffffff;
        background-color: var(--c-accent-primary);
    }

    & .cancelBtn:hover {
        color: #ffffff;
        background-color: var(--c-accent-warning);
    }
`;
