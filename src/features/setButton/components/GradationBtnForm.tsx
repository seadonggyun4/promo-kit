import { ChangeEvent, useEffect } from "react";
import { useElementsContext } from "../../../app/provider/ElementsProvider";
import { GradationBtnHook } from "../../../types";
import {
    ModalMenu,
    SettingForm,
    StyledLabel,
    StyledInput,
    ColorGrid,
    ColorGridItem,
} from "./FormStyles";
import ColorPicker from "./ColorPicker";

function GradationBtnForm({gradationBtnHook}: { gradationBtnHook: GradationBtnHook }) {
    const { selected } = useElementsContext()
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
    } = gradationBtnHook;

    useEffect(() => {
        if(selected?.id === '') return
        handleTextChange({ target: { value: selected?.styleData.buttonText } } as ChangeEvent<HTMLInputElement>)
        handleLinkChange({ target: { value: selected?.styleData.buttonLink } } as ChangeEvent<HTMLInputElement>)
        handleTextColorChange({ target: { value: selected?.styleData.textColor } } as ChangeEvent<HTMLInputElement>)
        handleGradationColor1Change({ target: { value: selected?.styleData.gradationColor1 } } as ChangeEvent<HTMLInputElement>)
        handleGradationColor2Change({ target: { value: selected?.styleData.gradationColor2 } } as ChangeEvent<HTMLInputElement>)
        handleGradationColor3Change({ target: { value: selected?.styleData.gradationColor3 } } as ChangeEvent<HTMLInputElement>)
        handleGradationColor4Change({ target: { value: selected?.styleData.gradationColor4 } } as ChangeEvent<HTMLInputElement>)
        handleBorderRadiusChange({ target: { value: selected?.styleData.borderRadius } } as ChangeEvent<HTMLInputElement>)
        handleBorderWidthChange({ target: { value: selected?.styleData.borderWidth } } as ChangeEvent<HTMLInputElement>)
        handleBorderColorChange({ target: { value: selected?.styleData.borderColor } } as ChangeEvent<HTMLInputElement>)
        handleShadowOffsetXChange({ target: { value: selected?.styleData.shadowOffsetX } } as ChangeEvent<HTMLInputElement>)
        handleShadowOffsetYChange({ target: { value: selected?.styleData.shadowOffsetY } } as ChangeEvent<HTMLInputElement>)
        handleShadowBlurRadiusChange({ target: { value: selected?.styleData.shadowBlurRadius } } as ChangeEvent<HTMLInputElement>)
        handleShadowColorChange({ target: { value: selected?.styleData.shadowColor } } as ChangeEvent<HTMLInputElement>)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <>
            <ModalMenu>
                {menu && menu.map((item, index) => (
                    <li key={index} className={item === menuActive ? "active" : ""} onClick={() => {
                        setMenuActive(item)
                    }}>
                        {item}
                    </li>
                ))}
            </ModalMenu>
            {
                menuActive === menu[0] &&
                <SettingForm>
                    <StyledLabel>버튼 텍스트</StyledLabel>
                    <StyledInput
                        type="text"
                        placeholder="텍스트를 입력해 주세요."
                        value={buttonText}
                        onChange={handleTextChange}/>
                    <StyledLabel>버튼 링크</StyledLabel>
                    <StyledInput
                        type="url"
                        placeholder="링크를 입력해 주세요."
                        value={buttonLink}
                        onChange={handleLinkChange}/>
                </SettingForm>
            }
            {
                menuActive === menu[1] &&
                <SettingForm>
                    <StyledLabel>텍스트 색상</StyledLabel>
                    <ColorPicker value={textColor} onChange={handleTextColorChange} />

                    <StyledLabel>그라데이션 색상</StyledLabel>
                    <ColorGrid>
                        <ColorGridItem>
                            <ColorPicker value={gradationColor1} onChange={handleGradationColor1Change} />
                        </ColorGridItem>
                        <ColorGridItem>
                            <ColorPicker value={gradationColor2} onChange={handleGradationColor2Change} />
                        </ColorGridItem>
                        <ColorGridItem>
                            <ColorPicker value={gradationColor3} onChange={handleGradationColor3Change} />
                        </ColorGridItem>
                        <ColorGridItem>
                            <ColorPicker value={gradationColor4} onChange={handleGradationColor4Change} />
                        </ColorGridItem>
                    </ColorGrid>
                </SettingForm>
            }
            {
                menuActive === menu[2] &&
                <SettingForm>
                    <StyledLabel>테두리 곡선</StyledLabel>
                    <input
                        type="range"
                        min="0"
                        max="50"
                        value={borderRadius}
                        onChange={handleBorderRadiusChange}
                    />
                    <StyledLabel>테두리 두께</StyledLabel>
                    <input
                        type="range"
                        min="0"
                        max="30"
                        value={borderWidth}
                        onChange={handleBorderWidthChange}
                    />
                    <StyledLabel>테두리 색상</StyledLabel>
                    <ColorPicker value={borderColor} onChange={handleBorderColorChange} />
                </SettingForm>
            }
            {
                menuActive === menu[3] &&
                <SettingForm>
                    <StyledLabel>그림자 X축</StyledLabel>
                    <input
                        type="range"
                        min="0"
                        max="20"
                        value={shadowOffsetX}
                        onChange={handleShadowOffsetXChange}/>
                    <StyledLabel>그림자 Y축</StyledLabel>
                    <input
                        type="range"
                        min="0"
                        max="20"
                        value={shadowOffsetY}
                        onChange={handleShadowOffsetYChange}/>
                    <StyledLabel>그림자 블러</StyledLabel>
                    <input
                        type="range"
                        min="0"
                        max="20"
                        value={shadowBlurRadius}
                        onChange={handleShadowBlurRadiusChange}/>
                    <StyledLabel>그림자 색상</StyledLabel>
                    <ColorPicker value={shadowColor} onChange={handleShadowColorChange} />
                </SettingForm>
            }
        </>
    )
}

export default GradationBtnForm;
