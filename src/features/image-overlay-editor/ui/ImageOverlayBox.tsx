import styled, { keyframes } from 'styled-components';
import { ImageOverlaySetModal } from './ImageOverlaySetModal';
import { IMAGE_OVERLAY_STYLE } from '@/shared/constants';
import { useElementsStore } from '@/shared/store';
import { ImageOverlayStyle } from '@/shared/types';
import { ImageOverlayContainer } from '@/entities/image-overlay';

export function ImageOverlayBox() {
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

    const simpleStyle = IMAGE_OVERLAY_STYLE['SimpleImage'];
    const roundedStyle = IMAGE_OVERLAY_STYLE['RoundedImage'];

    return (
        <ImageOverlayBoxStyle>
            <ImageWrapper $delay={0} onClick={() => setSelectedImage('SimpleImage')}>
                <ImageOverlayContainer
                    $borderRadius={Number(simpleStyle.borderRadius)}
                    $borderWidth={Number(simpleStyle.borderWidth)}
                    $borderColor={simpleStyle.borderColor}
                    style={{ width: '100%', height: '80px' }}
                >
                    Simple Image
                </ImageOverlayContainer>
            </ImageWrapper>

            <ImageWrapper $delay={50} onClick={() => setSelectedImage('RoundedImage')}>
                <ImageOverlayContainer
                    $borderRadius={Number(roundedStyle.borderRadius)}
                    $borderWidth={Number(roundedStyle.borderWidth)}
                    $borderColor={roundedStyle.borderColor}
                    style={{ width: '100%', height: '80px' }}
                >
                    Rounded Image
                </ImageOverlayContainer>
            </ImageWrapper>

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
