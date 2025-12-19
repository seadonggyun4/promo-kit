import { useEffect, useState, ChangeEvent } from 'react';
import { IMAGE_OVERLAY_STYLE, IMAGE_FORM_MENU } from '@/shared/constants';
import { ImageOverlayStyle, ImageOverlayStyleData } from '@/shared/types';

export function useImageOverlay(selectedStyle?: ImageOverlayStyle) {
    const menu = IMAGE_FORM_MENU;
    const [menuActive, setMenuActive] = useState(menu[0]);

    const defaultStyle = selectedStyle ? IMAGE_OVERLAY_STYLE[selectedStyle] : IMAGE_OVERLAY_STYLE['SimpleImage'];

    const [imageUrl, setImageUrl] = useState(defaultStyle.imageUrl || '');
    const [imageLink, setImageLink] = useState(defaultStyle.imageLink || '');
    const [altText, setAltText] = useState(defaultStyle.altText || 'Image');
    const [objectFit, setObjectFit] = useState<'cover' | 'contain' | 'fill' | 'none'>(defaultStyle.objectFit || 'cover');
    const [opacity, setOpacity] = useState(defaultStyle.opacity || '100');
    const [borderRadius, setBorderRadius] = useState(defaultStyle.borderRadius || '0');
    const [borderWidth, setBorderWidth] = useState(defaultStyle.borderWidth || '0');
    const [borderColor, setBorderColor] = useState(defaultStyle.borderColor || '#000000');
    const [shadowOffsetX, setShadowOffsetX] = useState(defaultStyle.shadowOffsetX || '0');
    const [shadowOffsetY, setShadowOffsetY] = useState(defaultStyle.shadowOffsetY || '0');
    const [shadowBlurRadius, setShadowBlurRadius] = useState(defaultStyle.shadowBlurRadius || '0');
    const [shadowColor, setShadowColor] = useState(defaultStyle.shadowColor || '#000000');
    const [width, setWidth] = useState(defaultStyle.width || '200');
    const [height, setHeight] = useState(defaultStyle.height || '150');

    useEffect(() => {
        if (selectedStyle) {
            const style = IMAGE_OVERLAY_STYLE[selectedStyle];
            setImageUrl(style.imageUrl || '');
            setImageLink(style.imageLink || '');
            setAltText(style.altText || 'Image');
            setObjectFit(style.objectFit || 'cover');
            setOpacity(style.opacity || '100');
            setBorderRadius(style.borderRadius || '0');
            setBorderWidth(style.borderWidth || '0');
            setBorderColor(style.borderColor || '#000000');
            setShadowOffsetX(style.shadowOffsetX || '0');
            setShadowOffsetY(style.shadowOffsetY || '0');
            setShadowBlurRadius(style.shadowBlurRadius || '0');
            setShadowColor(style.shadowColor || '#000000');
            setWidth(style.width || '200');
            setHeight(style.height || '150');
        }
    }, [selectedStyle]);

    const handleImageUrlChange = (url: string) => setImageUrl(url);
    const handleImageLinkChange = (e: ChangeEvent<HTMLInputElement>) => setImageLink(e.target.value);
    const handleAltTextChange = (e: ChangeEvent<HTMLInputElement>) => setAltText(e.target.value);
    const handleObjectFitChange = (value: 'cover' | 'contain' | 'fill' | 'none') => setObjectFit(value);
    const handleOpacityChange = (e: ChangeEvent<HTMLInputElement>) => setOpacity(e.target.value);
    const handleBorderRadiusChange = (e: ChangeEvent<HTMLInputElement>) => setBorderRadius(e.target.value);
    const handleBorderWidthChange = (e: ChangeEvent<HTMLInputElement>) => setBorderWidth(e.target.value);
    const handleBorderColorChange = (e: ChangeEvent<HTMLInputElement>) => setBorderColor(e.target.value);
    const handleShadowOffsetXChange = (e: ChangeEvent<HTMLInputElement>) => setShadowOffsetX(e.target.value);
    const handleShadowOffsetYChange = (e: ChangeEvent<HTMLInputElement>) => setShadowOffsetY(e.target.value);
    const handleShadowBlurRadiusChange = (e: ChangeEvent<HTMLInputElement>) => setShadowBlurRadius(e.target.value);
    const handleShadowColorChange = (e: ChangeEvent<HTMLInputElement>) => setShadowColor(e.target.value);
    const handleWidthChange = (e: ChangeEvent<HTMLInputElement>) => setWidth(e.target.value);
    const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => setHeight(e.target.value);

    const imageOverlayStyle: ImageOverlayStyleData = {
        imageUrl,
        imageLink,
        altText,
        objectFit,
        opacity,
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
        menu,
        menuActive,
        setMenuActive,
        imageUrl,
        handleImageUrlChange,
        imageLink,
        handleImageLinkChange,
        altText,
        handleAltTextChange,
        objectFit,
        handleObjectFitChange,
        opacity,
        handleOpacityChange,
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
        width,
        handleWidthChange,
        height,
        handleHeightChange,
        imageOverlayStyle,
    };
}
