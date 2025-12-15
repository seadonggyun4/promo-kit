import { useState } from 'react';
import { SIMPLE_BTN } from '@/shared/constants';
import { useButtonForm } from './useButtonForm';

export function useSimpleBtn() {
    const baseForm = useButtonForm({
        buttonText: SIMPLE_BTN.buttonText,
        buttonLink: SIMPLE_BTN.buttonLink,
        textColor: SIMPLE_BTN.textColor,
        borderRadius: SIMPLE_BTN.borderRadius,
        borderWidth: SIMPLE_BTN.borderWidth,
        borderColor: SIMPLE_BTN.borderColor,
        shadowOffsetX: SIMPLE_BTN.shadowOffsetX,
        shadowOffsetY: SIMPLE_BTN.shadowOffsetY,
        shadowBlurRadius: SIMPLE_BTN.shadowBlurRadius,
        shadowColor: SIMPLE_BTN.shadowColor,
    });

    // SimpleBtn 전용 상태
    const [backgroundColor, setBackgroundColor] = useState(SIMPLE_BTN.backgroundColor);
    const handleBackgroundColorChange = baseForm.handleInputChange(setBackgroundColor);

    // 전체 버튼 스타일 데이터
    const buttonStyle = {
        ...baseForm.baseButtonStyle,
        backgroundColor,
    };

    return {
        // 공통 속성
        menu: baseForm.menu,
        menuActive: baseForm.menuActive,
        setMenuActive: baseForm.setMenuActive,
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

        // SimpleBtn 전용
        backgroundColor,
        handleBackgroundColorChange,

        // 결과
        buttonStyle,
    };
}
