import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ImageOverlaySetModal } from './ImageOverlaySetModal';
import { IMAGE_OVERLAY_STYLE, SIMPLE_IMAGE_STYLES, FRAMED_IMAGE_STYLES, DECORATIVE_IMAGE_STYLES } from '@/shared/constants';
import { useElementsStore } from '@/shared/store';
import { ImageOverlayStyle } from '@/shared/types';
import { ImageOverlayContainer } from '@/entities/image-overlay';

export function ImageOverlayBox() {
    const { t } = useTranslation();
    const { selected, setSelected } = useElementsStore();

    const setSelectedImage = (style: ImageOverlayStyle) => {
        setSelected({
            id: '',
            type: 'image-overlay',
            style,
            styleData: IMAGE_OVERLAY_STYLE[style],
            x: 0,
            y: 0,
        });
    };

    const renderImagePreset = (styleName: string, index: number, baseDelay: number) => {
        const style = IMAGE_OVERLAY_STYLE[styleName];
        const displayName = styleName.replace(/([A-Z])/g, ' $1').trim();
        return (
            <ImageWrapper
                key={styleName}
                $delay={baseDelay + index * 30}
                onClick={() => setSelectedImage(styleName as ImageOverlayStyle)}
            >
                <ImageOverlayContainer
                    $borderRadius={Number(style.borderRadius)}
                    $borderWidth={Number(style.borderWidth)}
                    $borderColor={style.borderColor}
                    $shadowOffsetX={Number(style.shadowOffsetX)}
                    $shadowOffsetY={Number(style.shadowOffsetY)}
                    $shadowBlurRadius={Number(style.shadowBlurRadius)}
                    $shadowColor={style.shadowColor}
                    style={{ width: '100%', height: '60px', fontSize: '0.7rem' }}
                >
                    {displayName}
                </ImageOverlayContainer>
            </ImageWrapper>
        );
    };

    return (
        <ImageOverlayBoxStyle>
            {/* Simple Images */}
            <CategoryLabel>{t('editor.simpleImages')}</CategoryLabel>
            <ImageGrid>
                {SIMPLE_IMAGE_STYLES.map((styleName, index) =>
                    renderImagePreset(styleName, index, 0)
                )}
            </ImageGrid>

            {/* Framed Images */}
            <CategoryLabel>{t('editor.framedImages')}</CategoryLabel>
            <ImageGrid>
                {FRAMED_IMAGE_STYLES.map((styleName, index) =>
                    renderImagePreset(styleName, index, 120)
                )}
            </ImageGrid>

            {/* Decorative Images */}
            <CategoryLabel>{t('editor.decorativeImages')}</CategoryLabel>
            <ImageGrid>
                {DECORATIVE_IMAGE_STYLES.map((styleName, index) =>
                    renderImagePreset(styleName, index, 240)
                )}
            </ImageGrid>

            {selected?.type === 'image-overlay' && (
                <ImageOverlaySetModal
                    selectedImage={selected?.style as ImageOverlayStyle}
                    closeModal={() => setSelected(null)}
                />
            )}
        </ImageOverlayBoxStyle>
    );
}

const ImageOverlayBoxStyle = styled.article`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const ImageGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
`;

const CategoryLabel = styled.span`
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--c-text-secondary, #6b7280);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-top: 0.5rem;

    &:first-child {
        margin-top: 0;
    }
`;

const popIn = keyframes`
    0% {
        opacity: 0;
        transform: translateY(10px) scale(0.95);
    }
    100% {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
`;

const ImageWrapper = styled.div<{ $delay: number }>`
    cursor: pointer;
    opacity: 0;
    animation: ${popIn} 0.3s ease-out forwards;
    animation-delay: ${({ $delay }) => $delay}ms;

    &:hover {
        transform: scale(1.02);
    }

    &:active {
        transform: scale(0.98);
    }
`;
