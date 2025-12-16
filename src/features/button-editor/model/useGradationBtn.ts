import { useState } from 'react';
import { BTN_STYLE, GRADATION_BTN } from '@/shared/constants';
import { useButtonForm } from './useButtonForm';
import { GradationBtnStyleData } from '@/shared/types';

export function useGradationBtn(styleName?: string) {
    const initialStyle = (styleName ? BTN_STYLE[styleName] : GRADATION_BTN) as GradationBtnStyleData;

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

    // GradationBtn 전용 상태
    const [gradationColor1, setGradationColor1] = useState(initialStyle.gradationColor1);
    const [gradationColor2, setGradationColor2] = useState(initialStyle.gradationColor2);
    const [gradationColor3, setGradationColor3] = useState(initialStyle.gradationColor3);
    const [gradationColor4, setGradationColor4] = useState(initialStyle.gradationColor4);

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
        width: baseForm.width,
        handleWidthChange: baseForm.handleWidthChange,
        height: baseForm.height,
        handleHeightChange: baseForm.handleHeightChange,

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
