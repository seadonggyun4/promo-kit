import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

interface TextFormProps {
    textHook: ReturnType<typeof import('../model').useText>;
}

export function TextForm({ textHook }: TextFormProps) {
    const { t } = useTranslation();
    const {
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
    } = textHook;

    const fontWeightOptions = ['300', '400', '500', '600', '700', '800', '900'];
    const fontFamilyOptions = [
        'Pretendard, sans-serif',
        'Noto Sans KR, sans-serif',
        'Roboto, sans-serif',
        'Open Sans, sans-serif',
        'Inter, sans-serif',
    ];

    return (
        <FormStyle>
            <MenuStyle>
                {menu.map((item) => (
                    <button
                        key={item}
                        type="button"
                        className={menuActive === item ? 'active' : ''}
                        onClick={() => setMenuActive(item)}
                    >
                        {item}
                    </button>
                ))}
            </MenuStyle>

            <ContentStyle>
                {menuActive === '텍스트 & 링크' && (
                    <>
                        <InputGroup>
                            <label>{t('editor.buttonText')}</label>
                            <input
                                type="text"
                                value={text}
                                onChange={handleTextChange}
                                placeholder={t('editor.buttonTextPlaceholder')}
                            />
                        </InputGroup>
                        <InputGroup>
                            <label>{t('editor.buttonLink')}</label>
                            <input
                                type="text"
                                value={textLink}
                                onChange={handleLinkChange}
                                placeholder={t('editor.buttonLinkPlaceholder')}
                            />
                        </InputGroup>
                    </>
                )}

                {menuActive === '글꼴' && (
                    <>
                        <InputGroup>
                            <label>Font Family</label>
                            <select
                                value={fontFamily}
                                onChange={(e) => handleFontFamilyChange(e.target.value)}
                            >
                                {fontFamilyOptions.map((font) => (
                                    <option key={font} value={font}>{font.split(',')[0]}</option>
                                ))}
                            </select>
                        </InputGroup>
                        <InputGroup>
                            <label>Font Size</label>
                            <input
                                type="number"
                                value={fontSize}
                                onChange={handleFontSizeChange}
                                min="8"
                                max="200"
                            />
                        </InputGroup>
                        <InputGroup>
                            <label>Font Weight</label>
                            <select
                                value={fontWeight}
                                onChange={(e) => handleFontWeightChange(e.target.value)}
                            >
                                {fontWeightOptions.map((weight) => (
                                    <option key={weight} value={weight}>{weight}</option>
                                ))}
                            </select>
                        </InputGroup>
                        <InputGroup>
                            <label>Line Height</label>
                            <input
                                type="number"
                                value={lineHeight}
                                onChange={handleLineHeightChange}
                                step="0.1"
                                min="0.5"
                                max="3"
                            />
                        </InputGroup>
                        <InputGroup>
                            <label>Letter Spacing (em)</label>
                            <input
                                type="number"
                                value={letterSpacing}
                                onChange={handleLetterSpacingChange}
                                step="0.01"
                                min="-0.5"
                                max="1"
                            />
                        </InputGroup>
                        <InputGroup>
                            <label>Text Align</label>
                            <AlignButtons>
                                <button
                                    type="button"
                                    className={textAlign === 'left' ? 'active' : ''}
                                    onClick={() => handleTextAlignChange('left')}
                                >
                                    Left
                                </button>
                                <button
                                    type="button"
                                    className={textAlign === 'center' ? 'active' : ''}
                                    onClick={() => handleTextAlignChange('center')}
                                >
                                    Center
                                </button>
                                <button
                                    type="button"
                                    className={textAlign === 'right' ? 'active' : ''}
                                    onClick={() => handleTextAlignChange('right')}
                                >
                                    Right
                                </button>
                            </AlignButtons>
                        </InputGroup>
                    </>
                )}

                {menuActive === '색상' && (
                    <InputGroup>
                        <label>{t('editor.textColor')}</label>
                        <ColorInput>
                            <input
                                type="color"
                                value={textColor}
                                onChange={handleTextColorChange}
                            />
                            <span>{textColor}</span>
                        </ColorInput>
                    </InputGroup>
                )}

                {menuActive === '그림자' && (
                    <>
                        <InputGroup>
                            <label>{t('editor.shadowX')}</label>
                            <input
                                type="number"
                                value={shadowOffsetX}
                                onChange={handleShadowOffsetXChange}
                            />
                        </InputGroup>
                        <InputGroup>
                            <label>{t('editor.shadowY')}</label>
                            <input
                                type="number"
                                value={shadowOffsetY}
                                onChange={handleShadowOffsetYChange}
                            />
                        </InputGroup>
                        <InputGroup>
                            <label>{t('editor.shadowBlur')}</label>
                            <input
                                type="number"
                                value={shadowBlurRadius}
                                onChange={handleShadowBlurRadiusChange}
                            />
                        </InputGroup>
                        <InputGroup>
                            <label>{t('editor.shadowColor')}</label>
                            <ColorInput>
                                <input
                                    type="color"
                                    value={shadowColor}
                                    onChange={handleShadowColorChange}
                                />
                                <span>{shadowColor}</span>
                            </ColorInput>
                        </InputGroup>
                    </>
                )}

                {menuActive === '크기' && (
                    <>
                        <InputGroup>
                            <label>{t('editor.width')}</label>
                            <input
                                type="number"
                                value={width}
                                onChange={handleWidthChange}
                            />
                        </InputGroup>
                        <InputGroup>
                            <label>{t('editor.height')}</label>
                            <input
                                type="number"
                                value={height}
                                onChange={handleHeightChange}
                            />
                        </InputGroup>
                    </>
                )}
            </ContentStyle>
        </FormStyle>
    );
}

const FormStyle = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const MenuStyle = styled.nav`
    display: flex;
    gap: 0.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--c-border-primary);
    flex-wrap: wrap;

    button {
        padding: 0.5rem 1rem;
        border-radius: 5px;
        font-size: 0.875rem;
        transition: 0.3s ease-in-out;

        &.active {
            background-color: var(--c-accent-primary);
            color: #ffffff;
        }

        &:hover:not(.active) {
            background-color: var(--c-background-tertiary);
        }
    }
`;

const ContentStyle = styled.div`
    flex: 1;
    overflow-y: auto;
    padding-top: 1rem;
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;

    label {
        font-size: 0.875rem;
        color: var(--c-text-secondary);
    }

    input, select {
        padding: 0.5rem;
        border-radius: 5px;
        border: 1px solid var(--c-border-primary);
        background-color: var(--c-background-tertiary);
        color: var(--c-text-primary);
    }
`;

const ColorInput = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    input[type="color"] {
        width: 40px;
        height: 40px;
        padding: 0;
        border: none;
        cursor: pointer;
    }

    span {
        font-size: 0.875rem;
        color: var(--c-text-secondary);
    }
`;

const AlignButtons = styled.div`
    display: flex;
    gap: 0.5rem;

    button {
        flex: 1;
        padding: 0.5rem;
        border-radius: 5px;
        border: 1px solid var(--c-border-primary);
        background-color: var(--c-background-tertiary);
        transition: 0.3s ease-in-out;

        &.active {
            background-color: var(--c-accent-primary);
            color: #ffffff;
            border-color: var(--c-accent-primary);
        }
    }
`;
