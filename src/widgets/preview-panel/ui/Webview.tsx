import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ELEMENT_MENU } from '@/shared/constants';
import backgroundImage from '@/shared/assets/promotionPage.jpeg';
import { useElementsStore } from '@/shared/store';
import { ElementData, ButtonStyle, ButtonStyleDataLegacy } from '@/shared/types';
import { SimpleBtn, GradationBtn } from '@/entities/button';

interface WebviewProps {
    elementsData: ElementData[];
    uploadedImage: string | ArrayBuffer | null;
}

const renderButton = (style: ButtonStyle, styleData: ButtonStyleDataLegacy): React.ReactNode => {
    if (style === 'SimpleBtn') {
        return (
            <SimpleBtn
                $backgroundColor={styleData.backgroundColor}
                $textColor={styleData.textColor}
                $borderRadius={Number(styleData.borderRadius)}
                href={styleData.buttonLink}
                target="_blank"
                style={{
                    borderWidth: `${styleData.borderWidth}px`,
                    borderStyle: 'solid',
                    borderColor: styleData.borderColor,
                    boxShadow: `${styleData.shadowOffsetX}px ${styleData.shadowOffsetY}px ${styleData.shadowBlurRadius}px ${styleData.shadowColor}`,
                }}
            >
                {styleData.buttonText}
            </SimpleBtn>
        );
    }

    if (style === 'GradationBtn') {
        return (
            <GradationBtn
                $textColor={styleData.textColor}
                $gradationColor1={styleData.gradationColor1}
                $gradationColor2={styleData.gradationColor2}
                $gradationColor3={styleData.gradationColor3}
                $gradationColor4={styleData.gradationColor4}
                $borderRadius={Number(styleData.borderRadius)}
                href={styleData.buttonLink}
                target="_blank"
                style={{
                    borderWidth: `${styleData.borderWidth}px`,
                    borderStyle: 'solid',
                    borderColor: styleData.borderColor,
                    boxShadow: `${styleData.shadowOffsetX}px ${styleData.shadowOffsetY}px ${styleData.shadowBlurRadius}px ${styleData.shadowColor}`,
                }}
            >
                {styleData.buttonText}
            </GradationBtn>
        );
    }

    return null;
};

export function Webview({ elementsData, uploadedImage }: WebviewProps) {
    const { t } = useTranslation();
    const { updateElementPosition, setSelected, removeElement } = useElementsStore();
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [menuActive, setMenuActive] = useState('');

    const handleDragStart = (
        e: React.DragEvent<HTMLDivElement>,
        id: string,
        elementX: number,
        elementY: number
    ) => {
        setMenuActive('');
        const elementsBox = (e.target as HTMLElement).closest('#elementsBox');
        const boundingRect = elementsBox?.getBoundingClientRect();

        if (boundingRect) {
            const offsetX = e.clientX - boundingRect.left - (boundingRect.width * (elementX / 100));
            const offsetY = e.clientY - boundingRect.top - (boundingRect.height * (elementY / 100));
            setDragOffset({ x: offsetX, y: offsetY });
            e.dataTransfer.setData('id', id);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const id = e.dataTransfer.getData('id');

        const boundingRect = e.currentTarget.getBoundingClientRect();
        const parentWidth = boundingRect.width;
        const parentHeight = boundingRect.height;

        const xPx = e.clientX - boundingRect.left - dragOffset.x;
        const yPx = e.clientY - boundingRect.top - dragOffset.y;

        const xPercent = (xPx / parentWidth) * 100;
        const yPercent = (yPx / parentHeight) * 100;

        updateElementPosition(id, xPercent, yPercent);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const clickElement = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, data: ElementData) => {
        e.preventDefault();
        if (menuActive === '') setMenuActive(data.id);
        else if (menuActive !== data.id) setMenuActive(data.id);
        else setMenuActive('');
    };

    const elementMenuClick = (data: ElementData, menu: string) => {
        if (menu === 'edit') setSelected(data);
        if (menu === 'delete') removeElement(data?.id);
    };

    return (
        <div id="rendingPage">
            <WebViewStyle>
                <WebViewImage
                    id="rending"
                    src={uploadedImage ? uploadedImage.toString() : backgroundImage}
                    alt={t('editor.promotionPageImage')}
                />
                <ElementsBox id="elementsBox" onDragOver={handleDragOver} onDrop={handleDrop}>
                    {elementsData.map((data, index) => (
                        <ElementWrap
                            id={`elementWrap`}
                            key={index}
                            style={{ top: `${data.y}%`, left: `${data.x}%`, width: '200px', height: '50px' }}
                            onDragStart={(e) => handleDragStart(e, data.id, data.x, data.y)}
                            onClick={(e) => clickElement(e, data)}
                            draggable
                        >
                            {renderButton(data.style, data.styleData)}
                            {menuActive === data.id && (
                                <ElementMenu>
                                    {data.type &&
                                        ELEMENT_MENU[data.type as keyof typeof ELEMENT_MENU].map(
                                            (menu, index) => (
                                                <li key={index} onClick={() => elementMenuClick(data, menu)}>
                                                    {t(`common.${menu}`)}
                                                </li>
                                            )
                                        )}
                                </ElementMenu>
                            )}
                        </ElementWrap>
                    ))}
                </ElementsBox>
            </WebViewStyle>
        </div>
    );
}

const WebViewStyle = styled.section`
    position: relative;
    width: 100%;
    flex: 1;
    height: auto;
    background: var(--c-background-secondary);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: var(--neu-shadow);
`;

const WebViewImage = styled.img`
    width: 100%;
    height: auto;
    display: block;
`;

const ElementsBox = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const ElementWrap = styled.div`
    position: absolute;
    cursor: move;

    &:active {
        filter: blur(2px);
        opacity: 0.8;
    }

    &:hover {
        z-index: 10;
    }
`;

const ElementMenu = styled.ul`
    margin-top: 0.75rem;
    padding: 0.5rem;
    width: 100%;
    height: auto;
    border-radius: 12px;
    background: var(--c-background-secondary);
    box-shadow: var(--neu-shadow);
    animation: popUp 0.2s ease-in-out forwards;

    & li {
        margin-bottom: 0.35rem;
        padding: 0.625rem 0.75rem;
        border-radius: 8px;
        font-size: 0.85rem;
        font-weight: 500;
        color: var(--c-text-secondary);
        transition: all 0.2s ease;
        cursor: pointer;

        &:hover {
            color: var(--c-primary-dark);
            background: var(--c-primary-soft);
        }

        &:last-child {
            margin-bottom: 0;
            color: var(--c-accent-warning);

            &:hover {
                background: rgba(244, 114, 182, 0.1);
            }
        }
    }

    @keyframes popUp {
        0% {
            transform: scale(0.9);
            opacity: 0;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
