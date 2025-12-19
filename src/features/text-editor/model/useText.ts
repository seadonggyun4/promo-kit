import { useEffect, useState, ChangeEvent } from 'react';
import { TEXT_STYLE, TEXT_FORM_MENU } from '@/shared/constants';
import { TextStyle, TextStyleData } from '@/shared/types';

export function useText(selectedStyle?: TextStyle) {
    const menu = TEXT_FORM_MENU;
    const [menuActive, setMenuActive] = useState(menu[0]);

    const defaultStyle = selectedStyle ? TEXT_STYLE[selectedStyle] : TEXT_STYLE['H1Text'];

    const [text, setText] = useState(defaultStyle.text || '');
    const [textLink, setTextLink] = useState(defaultStyle.textLink || '');
    const [fontFamily, setFontFamily] = useState(defaultStyle.fontFamily || 'Pretendard, sans-serif');
    const [fontSize, setFontSize] = useState(defaultStyle.fontSize || '16');
    const [fontWeight, setFontWeight] = useState(defaultStyle.fontWeight || '400');
    const [lineHeight, setLineHeight] = useState(defaultStyle.lineHeight || '1.5');
    const [letterSpacing, setLetterSpacing] = useState(defaultStyle.letterSpacing || '0');
    const [textColor, setTextColor] = useState(defaultStyle.textColor || '#1f2937');
    const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>(defaultStyle.textAlign || 'center');
    const [textDecoration, setTextDecoration] = useState<'none' | 'underline' | 'line-through'>(defaultStyle.textDecoration || 'none');
    const [textTransform, setTextTransform] = useState<'none' | 'uppercase' | 'lowercase' | 'capitalize'>(defaultStyle.textTransform || 'none');
    const [shadowOffsetX, setShadowOffsetX] = useState(defaultStyle.shadowOffsetX || '0');
    const [shadowOffsetY, setShadowOffsetY] = useState(defaultStyle.shadowOffsetY || '0');
    const [shadowBlurRadius, setShadowBlurRadius] = useState(defaultStyle.shadowBlurRadius || '0');
    const [shadowColor, setShadowColor] = useState(defaultStyle.shadowColor || '#000000');
    const [width, setWidth] = useState(defaultStyle.width || '300');
    const [height, setHeight] = useState(defaultStyle.height || '50');

    useEffect(() => {
        if (selectedStyle) {
            const style = TEXT_STYLE[selectedStyle];
            setText(style.text || '');
            setTextLink(style.textLink || '');
            setFontFamily(style.fontFamily || 'Pretendard, sans-serif');
            setFontSize(style.fontSize || '16');
            setFontWeight(style.fontWeight || '400');
            setLineHeight(style.lineHeight || '1.5');
            setLetterSpacing(style.letterSpacing || '0');
            setTextColor(style.textColor || '#1f2937');
            setTextAlign(style.textAlign || 'center');
            setTextDecoration(style.textDecoration || 'none');
            setTextTransform(style.textTransform || 'none');
            setShadowOffsetX(style.shadowOffsetX || '0');
            setShadowOffsetY(style.shadowOffsetY || '0');
            setShadowBlurRadius(style.shadowBlurRadius || '0');
            setShadowColor(style.shadowColor || '#000000');
            setWidth(style.width || '300');
            setHeight(style.height || '50');
        }
    }, [selectedStyle]);

    const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setText(e.target.value);
    const handleLinkChange = (e: ChangeEvent<HTMLInputElement>) => setTextLink(e.target.value);
    const handleFontFamilyChange = (value: string) => setFontFamily(value);
    const handleFontSizeChange = (e: ChangeEvent<HTMLInputElement>) => setFontSize(e.target.value);
    const handleFontWeightChange = (value: string) => setFontWeight(value);
    const handleLineHeightChange = (e: ChangeEvent<HTMLInputElement>) => setLineHeight(e.target.value);
    const handleLetterSpacingChange = (e: ChangeEvent<HTMLInputElement>) => setLetterSpacing(e.target.value);
    const handleTextColorChange = (e: ChangeEvent<HTMLInputElement>) => setTextColor(e.target.value);
    const handleTextAlignChange = (value: 'left' | 'center' | 'right') => setTextAlign(value);
    const handleTextDecorationChange = (value: 'none' | 'underline' | 'line-through') => setTextDecoration(value);
    const handleTextTransformChange = (value: 'none' | 'uppercase' | 'lowercase' | 'capitalize') => setTextTransform(value);
    const handleShadowOffsetXChange = (e: ChangeEvent<HTMLInputElement>) => setShadowOffsetX(e.target.value);
    const handleShadowOffsetYChange = (e: ChangeEvent<HTMLInputElement>) => setShadowOffsetY(e.target.value);
    const handleShadowBlurRadiusChange = (e: ChangeEvent<HTMLInputElement>) => setShadowBlurRadius(e.target.value);
    const handleShadowColorChange = (e: ChangeEvent<HTMLInputElement>) => setShadowColor(e.target.value);
    const handleWidthChange = (e: ChangeEvent<HTMLInputElement>) => setWidth(e.target.value);
    const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => setHeight(e.target.value);

    const textStyle: TextStyleData = {
        text,
        textLink,
        fontFamily,
        fontSize,
        fontWeight,
        lineHeight,
        letterSpacing,
        textColor,
        textAlign,
        textDecoration,
        textTransform,
        shadowOffsetX,
        shadowOffsetY,
        shadowBlurRadius,
        shadowColor,
        width,
        height,
    };

    return {
        menu,
        menuActive,
        setMenuActive,
        text,
        handleTextChange,
        textLink,
        handleLinkChange,
        fontFamily,
        handleFontFamilyChange,
        fontSize,
        handleFontSizeChange,
        fontWeight,
        handleFontWeightChange,
        lineHeight,
        handleLineHeightChange,
        letterSpacing,
        handleLetterSpacingChange,
        textColor,
        handleTextColorChange,
        textAlign,
        handleTextAlignChange,
        textDecoration,
        handleTextDecorationChange,
        textTransform,
        handleTextTransformChange,
        shadowOffsetX,
        handleShadowOffsetXChange,
        shadowOffsetY,
        handleShadowOffsetYChange,
        shadowBlurRadius,
        handleShadowBlurRadiusChange,
        shadowColor,
        handleShadowColorChange,
        width,
        handleWidthChange,
        height,
        handleHeightChange,
        textStyle,
    };
}
