import { useState } from 'react';
import { BTN_STYLE, BOUNCE_BTN, FORM_MENU } from '@/shared/constants';
import { useButtonForm } from './useButtonForm';
import { AnimatedBtnStyleData, AnimatedBtnStyle } from '@/shared/types';

// Animation 메뉴가 추가된 확장 메뉴
const ANIMATED_FORM_MENU = [...FORM_MENU, '애니메이션'];

export function useAnimatedBtn(styleName?: string) {
    const initialStyle = (styleName ? BTN_STYLE[styleName] : BOUNCE_BTN) as AnimatedBtnStyleData;
    const currentAnimationType = (styleName as AnimatedBtnStyle) || 'BounceBtn';

    const [menuActive, setMenuActive] = useState(ANIMATED_FORM_MENU[0]);

    const baseForm = useButtonForm({
        buttonText: initialStyle.buttonText,
        buttonLink: initialStyle.buttonLink,
        textColor: initialStyle.textColor,
        borderRadius: initialStyle.borderRadius,
        borderWidth: initialStyle.borderWidth,
        borderColor: initialStyle.borderColor,
        shadowOffsetX: initialStyle.shadowOffsetX,
        shadowOffsetY: initialStyle.shadowOffsetY,
        shadowBlurRadius: initialStyle.shadowBlurRadius,
        shadowColor: initialStyle.shadowColor,
        width: initialStyle.width,
        height: initialStyle.height,
    });

    // AnimatedBtn 전용 상태
    const [backgroundColor, setBackgroundColor] = useState(initialStyle.backgroundColor);
    const handleBackgroundColorChange = baseForm.handleInputChange(setBackgroundColor);

    const [secondaryColor, setSecondaryColor] = useState(initialStyle.secondaryColor || initialStyle.backgroundColor);
    const handleSecondaryColorChange = baseForm.handleInputChange(setSecondaryColor);

    const [animationDuration, setAnimationDuration] = useState(initialStyle.animationDuration || '0.5');
    const handleAnimationDurationChange = baseForm.handleInputChange(setAnimationDuration);

    const [animationIntensity, setAnimationIntensity] = useState(initialStyle.animationIntensity || '8');
    const handleAnimationIntensityChange = baseForm.handleInputChange(setAnimationIntensity);

    const [glowSize, setGlowSize] = useState(initialStyle.glowSize || '20');
    const handleGlowSizeChange = baseForm.handleInputChange(setGlowSize);

    const [glowIntensity, setGlowIntensity] = useState(initialStyle.glowIntensity || '1');
    const handleGlowIntensityChange = baseForm.handleInputChange(setGlowIntensity);

    // 전체 버튼 스타일 데이터
    const buttonStyle = {
        ...baseForm.baseButtonStyle,
        backgroundColor,
        secondaryColor,
        animationDuration,
        animationIntensity,
        glowSize,
        glowIntensity,
    };

    return {
        // 공통 속성 (애니메이션 메뉴 추가된 확장 버전)
        menu: ANIMATED_FORM_MENU,
        menuActive,
        setMenuActive,
        buttonText: baseForm.buttonText,
        handleTextChange: baseForm.handleTextChange,
        buttonLink: baseForm.buttonLink,
        handleLinkChange: baseForm.handleLinkChange,
        textColor: baseForm.textColor,
        handleTextColorChange: baseForm.handleTextColorChange,
        borderRadius: baseForm.borderRadius,
        handleBorderRadiusChange: baseForm.handleBorderRadiusChange,
        borderWidth: baseForm.borderWidth,
        handleBorderWidthChange: baseForm.handleBorderWidthChange,
        borderColor: baseForm.borderColor,
        handleBorderColorChange: baseForm.handleBorderColorChange,
        shadowOffsetX: baseForm.shadowOffsetX,
        handleShadowOffsetXChange: baseForm.handleShadowOffsetXChange,
        shadowOffsetY: baseForm.shadowOffsetY,
        handleShadowOffsetYChange: baseForm.handleShadowOffsetYChange,
        shadowBlurRadius: baseForm.shadowBlurRadius,
        handleShadowBlurRadiusChange: baseForm.handleShadowBlurRadiusChange,
        shadowColor: baseForm.shadowColor,
        handleShadowColorChange: baseForm.handleShadowColorChange,
        width: baseForm.width,
        handleWidthChange: baseForm.handleWidthChange,
        height: baseForm.height,
        handleHeightChange: baseForm.handleHeightChange,

        // AnimatedBtn 전용
        backgroundColor,
        handleBackgroundColorChange,
        secondaryColor,
        handleSecondaryColorChange,
        animationDuration,
        handleAnimationDurationChange,
        animationIntensity,
        handleAnimationIntensityChange,
        glowSize,
        handleGlowSizeChange,
        glowIntensity,
        handleGlowIntensityChange,

        // 현재 애니메이션 타입
        currentAnimationType,

        // 결과
        buttonStyle,
    };
}
