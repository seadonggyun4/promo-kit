import { useState } from 'react';
import { BTN_STYLE, SIMPLE_BTN } from '@/shared/constants';
import { useButtonForm } from './useButtonForm';
import { SimpleBtnStyleData } from '@/shared/types';

export function useSimpleBtn(styleName?: string) {
    const initialStyle = (styleName ? BTN_STYLE[styleName] : SIMPLE_BTN) as SimpleBtnStyleData;

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

    // SimpleBtn 전용 상태
    const [backgroundColor, setBackgroundColor] = useState(initialStyle.backgroundColor);
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
        width: baseForm.width,
        handleWidthChange: baseForm.handleWidthChange,
        height: baseForm.height,
        handleHeightChange: baseForm.handleHeightChange,

        // SimpleBtn 전용
        backgroundColor,
        handleBackgroundColorChange,

        // 결과
        buttonStyle,
    };
}
