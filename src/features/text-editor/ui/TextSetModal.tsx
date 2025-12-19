import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { TextForm } from './TextForm';
import { TextElement } from '@/entities/text';
import { useElementsStore } from '@/shared/store';
import { useText } from '../model';
import { TextStyle, TextStyleDataLegacy } from '@/shared/types';

interface TextSetModalProps {
    selectedText: TextStyle;
    closeModal: () => void;
}

export function TextSetModal({ selectedText, closeModal }: TextSetModalProps) {
    const { t } = useTranslation();
    const { createTextElement, updateTextElement } = useElementsStore();
    const textHook = useText(selectedText);

    const getTextStyleData = (): TextStyleDataLegacy => {
        return textHook.textStyle;
    };

    const renderPreviewText = () => {
        const style = textHook.textStyle;
        return (
            <TextElement
                $fontFamily={style.fontFamily}
                $fontSize={Number(style.fontSize)}
                $fontWeight={style.fontWeight}
                $lineHeight={style.lineHeight}
                $letterSpacing={style.letterSpacing}
                $textColor={style.textColor}
                $textAlign={style.textAlign}
                $textDecoration={style.textDecoration}
                $textTransform={style.textTransform}
                $shadowOffsetX={Number(style.shadowOffsetX)}
                $shadowOffsetY={Number(style.shadowOffsetY)}
                $shadowBlurRadius={Number(style.shadowBlurRadius)}
                $shadowColor={style.shadowColor}
                href={style.textLink}
                target="_blank"
                onClick={(e) => e.preventDefault()}
                style={{
                    width: `${style.width}px`,
                    height: `${style.height}px`,
                }}
            >
                {style.text}
            </TextElement>
        );
    };

    const addText = () => {
        const currentSelected = useElementsStore.getState().selected;
        if (!currentSelected) return;
        const styleData = getTextStyleData();
        if (currentSelected.id === '') {
            createTextElement(selectedText, styleData, Date.now().toString());
        } else {
            updateTextElement(currentSelected.id, selectedText, styleData);
        }
        closeModal();
    };

    return (
        <ModalWrapper>
            <ModalInner>
                <ElementWrapper>
                    {renderPreviewText()}
                </ElementWrapper>
                <ElementSettingBox>
                    <TextForm textHook={textHook} />
                    <BtnWrapper>
                        <button type="button" className="activeBtn" onClick={addText}>{t('common.register')}</button>
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
