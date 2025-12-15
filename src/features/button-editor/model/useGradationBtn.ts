import { useState } from 'react';
import { GRADATION_BTN } from '@/shared/constants';
import { useButtonForm } from './useButtonForm';

export function useGradationBtn() {
    const baseForm = useButtonForm({
        buttonText: GRADATION_BTN.buttonText,
        buttonLink: GRADATION_BTN.buttonLink,
        textColor: GRADATION_BTN.textColor,
        borderRadius: GRADATION_BTN.borderRadius,
        borderWidth: GRADATION_BTN.borderWidth,
        borderColor: GRADATION_BTN.borderColor,
        shadowOffsetX: GRADATION_BTN.shadowOffsetX,
        shadowOffsetY: GRADATION_BTN.shadowOffsetY,
        shadowBlurRadius: GRADATION_BTN.shadowBlurRadius,
        shadowColor: GRADATION_BTN.shadowColor,
    });

    // GradationBtn 전용 상태
    const [gradationColor1, setGradationColor1] = useState(GRADATION_BTN.gradationColor1);
    const [gradationColor2, setGradationColor2] = useState(GRADATION_BTN.gradationColor2);
    const [gradationColor3, setGradationColor3] = useState(GRADATION_BTN.gradationColor3);
    const [gradationColor4, setGradationColor4] = useState(GRADATION_BTN.gradationColor4);

    const handleGradationColor1Change = baseForm.handleInputChange(setGradationColor1);
    const handleGradationColor2Change = baseForm.handleInputChange(setGradationColor2);
    const handleGradationColor3Change = baseForm.handleInputChange(setGradationColor3);
    const handleGradationColor4Change = baseForm.handleInputChange(setGradationColor4);

    // 전체 버튼 스타일 데이터
    const buttonStyle = {
        ...baseForm.baseButtonStyle,
        gradationColor1,
        gradationColor2,
        gradationColor3,
        gradationColor4,
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

        // GradationBtn 전용
        gradationColor1,
        handleGradationColor1Change,
        gradationColor2,
        handleGradationColor2Change,
        gradationColor3,
        handleGradationColor3Change,
        gradationColor4,
        handleGradationColor4Change,

        // 결과
        buttonStyle,
    };
}
