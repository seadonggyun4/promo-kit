import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ImageOverlayForm } from './ImageOverlayForm';
import { ImageOverlayElement, ImageOverlayContainer } from '@/entities/image-overlay';
import { useElementsStore } from '@/shared/store';
import { useImageOverlay } from '../model';
import { ImageOverlayStyle, ImageOverlayStyleDataLegacy } from '@/shared/types';

interface ImageOverlaySetModalProps {
    selectedImage: ImageOverlayStyle;
    closeModal: () => void;
}

export function ImageOverlaySetModal({ selectedImage, closeModal }: ImageOverlaySetModalProps) {
    const { t } = useTranslation();
    const { createImageOverlay, updateImageOverlay } = useElementsStore();
    const imageOverlayHook = useImageOverlay(selectedImage);

    const getImageOverlayStyleData = (): ImageOverlayStyleDataLegacy => {
        return imageOverlayHook.imageOverlayStyle;
    };

    const renderPreviewImage = () => {
        const style = imageOverlayHook.imageOverlayStyle;

        if (!style.imageUrl) {
            return (
                <ImageOverlayContainer
                    $borderRadius={Number(style.borderRadius)}
                    $borderWidth={Number(style.borderWidth)}
                    $borderColor={style.borderColor}
                    $shadowOffsetX={Number(style.shadowOffsetX)}
                    $shadowOffsetY={Number(style.shadowOffsetY)}
                    $shadowBlurRadius={Number(style.shadowBlurRadius)}
                    $shadowColor={style.shadowColor}
                    style={{
                        width: `${style.width}px`,
                        height: `${style.height}px`,
                    }}
                >
                    No Image
                </ImageOverlayContainer>
            );
        }

        return (
            <ImageOverlayElement
                $objectFit={style.objectFit}
                $opacity={Number(style.opacity)}
                $borderRadius={Number(style.borderRadius)}
                $borderWidth={Number(style.borderWidth)}
                $borderColor={style.borderColor}
                $shadowOffsetX={Number(style.shadowOffsetX)}
                $shadowOffsetY={Number(style.shadowOffsetY)}
                $shadowBlurRadius={Number(style.shadowBlurRadius)}
                $shadowColor={style.shadowColor}
                href={style.imageLink}
                target="_blank"
                onClick={(e) => e.preventDefault()}
                style={{
                    width: `${style.width}px`,
                    height: `${style.height}px`,
                }}
            >
                <img src={style.imageUrl} alt={style.altText} />
            </ImageOverlayElement>
        );
    };

    const addImageOverlay = () => {
        const currentSelected = useElementsStore.getState().selected;
        if (!currentSelected) return;
        const styleData = getImageOverlayStyleData();
        if (currentSelected.id === '') {
            createImageOverlay(selectedImage, styleData, Date.now().toString());
        } else {
            updateImageOverlay(currentSelected.id, selectedImage, styleData);
        }
        closeModal();
    };

    return (
        <ModalWrapper>
            <ModalInner>
                <ElementWrapper>
                    {renderPreviewImage()}
                </ElementWrapper>
                <ElementSettingBox>
                    <ImageOverlayForm imageOverlayHook={imageOverlayHook} />
                    <BtnWrapper>
                        <button type="button" className="activeBtn" onClick={addImageOverlay}>{t('common.register')}</button>
                        <button type="button" className="cancelBtn" onClick={closeModal}>{t('common.cancel')}</button>
                    </BtnWrapper>
                </ElementSettingBox>
            </ModalInner>
        </ModalWrapper>
    );
}

const ModalWrapper = styled.div`
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    animation: show 0.3s ease-in-out forwards;

    @keyframes show {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`;

const ModalInner = styled.div`
    display: flex;
    align-items: center;
    column-gap: 2rem;
    width: 1000px;
    height: 500px;
    background-color: var(--c-background-secondary);
    border-radius: 15px;
    padding: 20px;
    animation: popUp 0.3s ease-in-out forwards;

    @keyframes popUp {
        0% {
            transform: scale(0.9);
        }
        100% {
            transform: scale(1);
        }
    }
`;

const ElementWrapper = styled.div`
    height: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--c-background-tertiary);
`;

const ElementSettingBox = styled.article`
    width: 400px;
    height: 100%;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
`;

const BtnWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 1rem;
    margin-top: auto;
    padding-top: 1rem;

    & .activeBtn,
    & .cancelBtn {
        padding: 0.5rem 1rem;
        border-radius: 5px;
        transition: 0.3s ease-in-out;
    }

    & .activeBtn:hover {
        color: #ffffff;
        background-color: var(--c-accent-primary);
    }

    & .cancelBtn:hover {
        color: #ffffff;
        background-color: var(--c-accent-warning);
    }
`;
