import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import styled from 'styled-components';

interface ImageOverlayFormProps {
    imageOverlayHook: ReturnType<typeof import('../model').useImageOverlay>;
}

export function ImageOverlayForm({ imageOverlayHook }: ImageOverlayFormProps) {
    const { t } = useTranslation();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const {
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
    } = imageOverlayHook;

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const result = event.target?.result as string;
                handleImageUrlChange(result);
            };
            reader.readAsDataURL(file);
        }
    };

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
                {menuActive === '이미지 & 링크' && (
                    <>
                        <InputGroup>
                            <label>Image</label>
                            <input
                                type="file"
                                ref={fileInputRef}
                                accept="image/*"
                                onChange={handleFileSelect}
                                style={{ display: 'none' }}
                            />
                            <UploadButton
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {imageUrl ? 'Change Image' : 'Upload Image'}
                            </UploadButton>
                            {imageUrl && (
                                <ImagePreview>
                                    <img src={imageUrl} alt="Preview" />
                                </ImagePreview>
                            )}
                        </InputGroup>
                        <InputGroup>
                            <label>{t('editor.buttonLink')}</label>
                            <input
                                type="text"
                                value={imageLink}
                                onChange={handleImageLinkChange}
                                placeholder={t('editor.buttonLinkPlaceholder')}
                            />
                        </InputGroup>
                        <InputGroup>
                            <label>Alt Text</label>
                            <input
                                type="text"
                                value={altText}
                                onChange={handleAltTextChange}
                                placeholder="Enter alt text"
                            />
                        </InputGroup>
                    </>
                )}

                {menuActive === '효과' && (
                    <>
                        <InputGroup>
                            <label>Object Fit</label>
                            <ObjectFitButtons>
                                {(['cover', 'contain', 'fill', 'none'] as const).map((fit) => (
                                    <button
                                        key={fit}
                                        type="button"
                                        className={objectFit === fit ? 'active' : ''}
                                        onClick={() => handleObjectFitChange(fit)}
                                    >
                                        {fit.charAt(0).toUpperCase() + fit.slice(1)}
                                    </button>
                                ))}
                            </ObjectFitButtons>
                        </InputGroup>
                        <InputGroup>
                            <label>Opacity ({opacity}%)</label>
                            <input
                                type="range"
                                value={opacity}
                                onChange={handleOpacityChange}
                                min="0"
                                max="100"
                            />
                        </InputGroup>
                    </>
                )}

                {menuActive === '테두리' && (
                    <>
                        <InputGroup>
                            <label>{t('editor.borderRadius')}</label>
                            <input
                                type="number"
                                value={borderRadius}
                                onChange={handleBorderRadiusChange}
                            />
                        </InputGroup>
                        <InputGroup>
                            <label>{t('editor.borderWidth')}</label>
                            <input
                                type="number"
                                value={borderWidth}
                                onChange={handleBorderWidthChange}
                            />
                        </InputGroup>
                        <InputGroup>
                            <label>{t('editor.borderColor')}</label>
                            <ColorInput>
                                <input
                                    type="color"
                                    value={borderColor}
                                    onChange={handleBorderColorChange}
                                />
                                <span>{borderColor}</span>
                            </ColorInput>
                        </InputGroup>
                    </>
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

    input[type="range"] {
        padding: 0;
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

const UploadButton = styled.button`
    padding: 0.75rem 1rem;
    border-radius: 5px;
    background-color: var(--c-accent-primary);
    color: #ffffff;
    transition: 0.3s ease-in-out;

    &:hover {
        opacity: 0.9;
    }
`;

const ImagePreview = styled.div`
    margin-top: 0.5rem;
    border-radius: 8px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100px;
        object-fit: cover;
    }
`;

const ObjectFitButtons = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;

    button {
        padding: 0.5rem;
        border-radius: 5px;
        border: 1px solid var(--c-border-primary);
        background-color: var(--c-background-tertiary);
        transition: 0.3s ease-in-out;
        font-size: 0.75rem;

        &.active {
            background-color: var(--c-accent-primary);
            color: #ffffff;
            border-color: var(--c-accent-primary);
        }
    }
`;
