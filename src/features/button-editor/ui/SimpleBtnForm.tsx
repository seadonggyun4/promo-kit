import { ChangeEvent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useElementsStore } from "@/shared/store";
import { useSimpleBtn } from "../model/useSimpleBtn";
import {
    ModalMenu,
    SettingForm,
    StyledLabel,
    StyledInput,
    ColorPicker,
} from "@/shared/ui";

interface SimpleBtnFormProps {
    simpleBtnHook: ReturnType<typeof useSimpleBtn>;
}

export function SimpleBtnForm({ simpleBtnHook }: SimpleBtnFormProps) {
    const { t } = useTranslation();
    const selected = useElementsStore((state) => state.selected);
    const {
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
        width,
        handleWidthChange,
        height,
        handleHeightChange,
    } = simpleBtnHook;

    const menuLabels = [
        t('editor.menuText'),
        t('editor.menuColor'),
        t('editor.menuBorder'),
        t('editor.menuShadow'),
        t('editor.menuSize'),
    ];

    useEffect(() => {
        if (selected?.id === '') return;
        handleTextChange({ target: { value: selected?.styleData.buttonText } } as ChangeEvent<HTMLInputElement>);
        handleLinkChange({ target: { value: selected?.styleData.buttonLink } } as ChangeEvent<HTMLInputElement>);
        handleTextColorChange({ target: { value: selected?.styleData.textColor } } as ChangeEvent<HTMLInputElement>);
        handleBackgroundColorChange({ target: { value: selected?.styleData.backgroundColor } } as ChangeEvent<HTMLInputElement>);
        handleBorderRadiusChange({ target: { value: selected?.styleData.borderRadius } } as ChangeEvent<HTMLInputElement>);
        handleBorderWidthChange({ target: { value: selected?.styleData.borderWidth } } as ChangeEvent<HTMLInputElement>);
        handleBorderColorChange({ target: { value: selected?.styleData.borderColor } } as ChangeEvent<HTMLInputElement>);
        handleShadowOffsetXChange({ target: { value: selected?.styleData.shadowOffsetX } } as ChangeEvent<HTMLInputElement>);
        handleShadowOffsetYChange({ target: { value: selected?.styleData.shadowOffsetY } } as ChangeEvent<HTMLInputElement>);
        handleShadowBlurRadiusChange({ target: { value: selected?.styleData.shadowBlurRadius } } as ChangeEvent<HTMLInputElement>);
        handleShadowColorChange({ target: { value: selected?.styleData.shadowColor } } as ChangeEvent<HTMLInputElement>);
        handleWidthChange({ target: { value: selected?.styleData.width } } as ChangeEvent<HTMLInputElement>);
        handleHeightChange({ target: { value: selected?.styleData.height } } as ChangeEvent<HTMLInputElement>);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <ModalMenu>
                {menu && menu.map((item: string, index: number) => (
                    <li
                        key={index}
                        className={item === menuActive ? "active" : ""}
                        onClick={() => setMenuActive(item)}
                    >
                        {menuLabels[index]}
                    </li>
                ))}
            </ModalMenu>
            {menuActive === menu[0] && (
                <SettingForm>
                    <StyledLabel>{t('editor.buttonText')}</StyledLabel>
                    <StyledInput
                        type="text"
                        placeholder={t('editor.buttonTextPlaceholder')}
                        value={buttonText}
                        onChange={handleTextChange}
                    />
                    <StyledLabel>{t('editor.buttonLink')}</StyledLabel>
                    <StyledInput
                        type="url"
                        placeholder={t('editor.buttonLinkPlaceholder')}
                        value={buttonLink}
                        onChange={handleLinkChange}
                    />
                </SettingForm>
            )}
            {menuActive === menu[1] && (
                <SettingForm>
                    <StyledLabel>{t('editor.textColor')}</StyledLabel>
                    <ColorPicker value={textColor} onChange={handleTextColorChange} />
                    <StyledLabel>{t('editor.buttonColor')}</StyledLabel>
                    <ColorPicker value={backgroundColor} onChange={handleBackgroundColorChange} />
                </SettingForm>
            )}
            {menuActive === menu[2] && (
                <SettingForm>
                    <StyledLabel>{t('editor.borderRadius')}</StyledLabel>
                    <input
                        type="range"
                        min="0"
                        max="50"
                        value={borderRadius}
                        onChange={handleBorderRadiusChange}
                    />
                    <StyledLabel>{t('editor.borderWidth')}</StyledLabel>
                    <input
                        type="range"
                        min="0"
                        max="30"
                        value={borderWidth}
                        onChange={handleBorderWidthChange}
                    />
                    <StyledLabel>{t('editor.borderColor')}</StyledLabel>
                    <ColorPicker value={borderColor} onChange={handleBorderColorChange} />
                </SettingForm>
            )}
            {menuActive === menu[3] && (
                <SettingForm>
                    <StyledLabel>{t('editor.shadowX')}</StyledLabel>
                    <input
                        type="range"
                        min="0"
                        max="20"
                        value={shadowOffsetX}
                        onChange={handleShadowOffsetXChange}
                    />
                    <StyledLabel>{t('editor.shadowY')}</StyledLabel>
                    <input
                        type="range"
                        min="0"
                        max="20"
                        value={shadowOffsetY}
                        onChange={handleShadowOffsetYChange}
                    />
                    <StyledLabel>{t('editor.shadowBlur')}</StyledLabel>
                    <input
                        type="range"
                        min="0"
                        max="20"
                        value={shadowBlurRadius}
                        onChange={handleShadowBlurRadiusChange}
                    />
                    <StyledLabel>{t('editor.shadowColor')}</StyledLabel>
                    <ColorPicker value={shadowColor} onChange={handleShadowColorChange} />
                </SettingForm>
            )}
            {menuActive === menu[4] && (
                <SettingForm>
                    <StyledLabel>{t('editor.width')} (px)</StyledLabel>
                    <StyledInput
                        type="number"
                        min="50"
                        max="500"
                        value={width}
                        onChange={handleWidthChange}
                    />
                    <StyledLabel>{t('editor.height')} (px)</StyledLabel>
                    <StyledInput
                        type="number"
                        min="20"
                        max="200"
                        value={height}
                        onChange={handleHeightChange}
                    />
                </SettingForm>
            )}
        </>
    );
}
