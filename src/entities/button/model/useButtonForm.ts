import { useState, ChangeEvent } from 'react';
import { FORM_MENU } from '@/shared/constants';

export function useSimpleBtnForm() {
    const menu = FORM_MENU;
    const [menuActive, setMenuActive] = useState(menu[0]);

    const [buttonText, setButtonText] = useState('');
    const [buttonLink, setButtonLink] = useState('');
    const [textColor, setTextColor] = useState('#000000');
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [borderRadius, setBorderRadius] = useState(0);
    const [borderWidth, setBorderWidth] = useState(0);
    const [borderColor, setBorderColor] = useState('#000000');
    const [shadowOffsetX, setShadowOffsetX] = useState(0);
    const [shadowOffsetY, setShadowOffsetY] = useState(0);
    const [shadowBlurRadius, setShadowBlurRadius] = useState(0);
    const [shadowColor, setShadowColor] = useState('#000000');

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => setButtonText(e.target.value);
    const handleLinkChange = (e: ChangeEvent<HTMLInputElement>) => setButtonLink(e.target.value);
    const handleTextColorChange = (e: ChangeEvent<HTMLInputElement>) => setTextColor(e.target.value);
    const handleBackgroundColorChange = (e: ChangeEvent<HTMLInputElement>) => setBackgroundColor(e.target.value);
    const handleBorderRadiusChange = (e: ChangeEvent<HTMLInputElement>) => setBorderRadius(Number(e.target.value));
    const handleBorderWidthChange = (e: ChangeEvent<HTMLInputElement>) => setBorderWidth(Number(e.target.value));
    const handleBorderColorChange = (e: ChangeEvent<HTMLInputElement>) => setBorderColor(e.target.value);
    const handleShadowOffsetXChange = (e: ChangeEvent<HTMLInputElement>) => setShadowOffsetX(Number(e.target.value));
    const handleShadowOffsetYChange = (e: ChangeEvent<HTMLInputElement>) => setShadowOffsetY(Number(e.target.value));
    const handleShadowBlurRadiusChange = (e: ChangeEvent<HTMLInputElement>) => setShadowBlurRadius(Number(e.target.value));
    const handleShadowColorChange = (e: ChangeEvent<HTMLInputElement>) => setShadowColor(e.target.value);

    return {
        menu,
        menuActive,
        setMenuActive,
        buttonText,
        handleTextChange,
        buttonLink,
        handleLinkChange,
        textColor,
        handleTextColorChange,
        backgroundColor,
        handleBackgroundColorChange,
        borderRadius,
        handleBorderRadiusChange,
        borderWidth,
        handleBorderWidthChange,
        borderColor,
        handleBorderColorChange,
        shadowOffsetX,
        handleShadowOffsetXChange,
        shadowOffsetY,
        handleShadowOffsetYChange,
        shadowBlurRadius,
        handleShadowBlurRadiusChange,
        shadowColor,
        handleShadowColorChange,
    };
}

export function useGradationBtnForm() {
    const menu = FORM_MENU;
    const [menuActive, setMenuActive] = useState(menu[0]);

    const [buttonText, setButtonText] = useState('');
    const [buttonLink, setButtonLink] = useState('');
    const [textColor, setTextColor] = useState('#000000');
    const [gradationColor1, setGradationColor1] = useState('#ff0000');
    const [gradationColor2, setGradationColor2] = useState('#00ff00');
    const [gradationColor3, setGradationColor3] = useState('#0000ff');
    const [gradationColor4, setGradationColor4] = useState('#ffff00');
    const [borderRadius, setBorderRadius] = useState(0);
    const [borderWidth, setBorderWidth] = useState(0);
    const [borderColor, setBorderColor] = useState('#000000');
    const [shadowOffsetX, setShadowOffsetX] = useState(0);
    const [shadowOffsetY, setShadowOffsetY] = useState(0);
    const [shadowBlurRadius, setShadowBlurRadius] = useState(0);
    const [shadowColor, setShadowColor] = useState('#000000');

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => setButtonText(e.target.value);
    const handleLinkChange = (e: ChangeEvent<HTMLInputElement>) => setButtonLink(e.target.value);
    const handleTextColorChange = (e: ChangeEvent<HTMLInputElement>) => setTextColor(e.target.value);
    const handleGradationColor1Change = (e: ChangeEvent<HTMLInputElement>) => setGradationColor1(e.target.value);
    const handleGradationColor2Change = (e: ChangeEvent<HTMLInputElement>) => setGradationColor2(e.target.value);
    const handleGradationColor3Change = (e: ChangeEvent<HTMLInputElement>) => setGradationColor3(e.target.value);
    const handleGradationColor4Change = (e: ChangeEvent<HTMLInputElement>) => setGradationColor4(e.target.value);
    const handleBorderRadiusChange = (e: ChangeEvent<HTMLInputElement>) => setBorderRadius(Number(e.target.value));
    const handleBorderWidthChange = (e: ChangeEvent<HTMLInputElement>) => setBorderWidth(Number(e.target.value));
    const handleBorderColorChange = (e: ChangeEvent<HTMLInputElement>) => setBorderColor(e.target.value);
    const handleShadowOffsetXChange = (e: ChangeEvent<HTMLInputElement>) => setShadowOffsetX(Number(e.target.value));
    const handleShadowOffsetYChange = (e: ChangeEvent<HTMLInputElement>) => setShadowOffsetY(Number(e.target.value));
    const handleShadowBlurRadiusChange = (e: ChangeEvent<HTMLInputElement>) => setShadowBlurRadius(Number(e.target.value));
    const handleShadowColorChange = (e: ChangeEvent<HTMLInputElement>) => setShadowColor(e.target.value);

    return {
        menu,
        menuActive,
        setMenuActive,
        buttonText,
        handleTextChange,
        buttonLink,
        handleLinkChange,
        textColor,
        handleTextColorChange,
        gradationColor1,
        handleGradationColor1Change,
        gradationColor2,
        handleGradationColor2Change,
        gradationColor3,
        handleGradationColor3Change,
        gradationColor4,
        handleGradationColor4Change,
        borderRadius,
        handleBorderRadiusChange,
        borderWidth,
        handleBorderWidthChange,
        borderColor,
        handleBorderColorChange,
        shadowOffsetX,
        handleShadowOffsetXChange,
        shadowOffsetY,
        handleShadowOffsetYChange,
        shadowBlurRadius,
        handleShadowBlurRadiusChange,
        shadowColor,
        handleShadowColorChange,
    };
}
