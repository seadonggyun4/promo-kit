import { useState } from 'react';
import { FORM_MENU } from '@/shared/constants';

interface ButtonFormConfig {
    buttonText: string;
    buttonLink: string;
    textColor: string;
    borderRadius: string;
    borderWidth: string;
    borderColor: string;
    shadowOffsetX: string;
    shadowOffsetY: string;
    shadowBlurRadius: string;
    shadowColor: string;
    width: string;
    height: string;
}

export function useButtonForm(initialConfig: ButtonFormConfig) {
    const [menuActive, setMenuActive] = useState(FORM_MENU[0]);

    // 텍스트 & 링크
    const [buttonText, setButtonText] = useState(initialConfig.buttonText);
    const [buttonLink, setButtonLink] = useState(initialConfig.buttonLink);

    // 색상
    const [textColor, setTextColor] = useState(initialConfig.textColor);

    // 테두리
    const [borderRadius, setBorderRadius] = useState(initialConfig.borderRadius);
    const [borderWidth, setBorderWidth] = useState(initialConfig.borderWidth);
    const [borderColor, setBorderColor] = useState(initialConfig.borderColor);

    // 그림자
    const [shadowOffsetX, setShadowOffsetX] = useState(initialConfig.shadowOffsetX);
    const [shadowOffsetY, setShadowOffsetY] = useState(initialConfig.shadowOffsetY);
    const [shadowBlurRadius, setShadowBlurRadius] = useState(initialConfig.shadowBlurRadius);
    const [shadowColor, setShadowColor] = useState(initialConfig.shadowColor);

    // 크기
    const [width, setWidth] = useState(initialConfig.width);
    const [height, setHeight] = useState(initialConfig.height);

    // 공통 핸들러 생성 함수
    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setter(event.target.value);
        };

    // 핸들러들
    const handleTextChange = handleInputChange(setButtonText);
    const handleLinkChange = handleInputChange(setButtonLink);
    const handleTextColorChange = handleInputChange(setTextColor);
    const handleBorderRadiusChange = handleInputChange(setBorderRadius);
    const handleBorderWidthChange = handleInputChange(setBorderWidth);
    const handleBorderColorChange = handleInputChange(setBorderColor);
    const handleShadowOffsetXChange = handleInputChange(setShadowOffsetX);
    const handleShadowOffsetYChange = handleInputChange(setShadowOffsetY);
    const handleShadowBlurRadiusChange = handleInputChange(setShadowBlurRadius);
    const handleShadowColorChange = handleInputChange(setShadowColor);
    const handleWidthChange = handleInputChange(setWidth);
    const handleHeightChange = handleInputChange(setHeight);

    // 공통 buttonStyle 객체
    const baseButtonStyle = {
        buttonText,
        buttonLink,
        textColor,
        borderRadius,
        borderWidth,
        borderColor,
        shadowOffsetX,
        shadowOffsetY,
        shadowBlurRadius,
        shadowColor,
        width,
        height,
    };

    return {
        // 메뉴
        menu: FORM_MENU,
        menuActive,
        setMenuActive,

        // 텍스트 & 링크
        buttonText,
        handleTextChange,
        buttonLink,
        handleLinkChange,

        // 색상
        textColor,
        handleTextColorChange,

        // 테두리
        borderRadius,
        handleBorderRadiusChange,
        borderWidth,
        handleBorderWidthChange,
        borderColor,
        handleBorderColorChange,

        // 그림자
        shadowOffsetX,
        handleShadowOffsetXChange,
        shadowOffsetY,
        handleShadowOffsetYChange,
        shadowBlurRadius,
        handleShadowBlurRadiusChange,
        shadowColor,
        handleShadowColorChange,

        // 크기
        width,
        handleWidthChange,
        height,
        handleHeightChange,

        // 유틸리티
        handleInputChange,
        baseButtonStyle,
    };
}
