import { useState } from 'react';
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
        if (menu === '수정') setSelected(data);
        if (menu === '삭제') removeElement(data?.id);
    };

    return (
        <div id="rendingPage">
            <WebViewStyle>
                <WebViewImage
                    id="rending"
                    src={uploadedImage ? uploadedImage.toString() : backgroundImage}
                    alt="프로모션 페이지 이미지"
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
                                                    {menu}
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
    max-width: 980px;
    height: auto;
    background: #ffff;
`;

const WebViewImage = styled.img`
    width: 100%;
    height: auto;
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

    &:active {
        filter: blur(3px);
    }
`;

const ElementMenu = styled.ul`
    margin-top: 1rem;
    padding: 0.5rem;
    width: 100%;
    height: auto;
    border-radius: 5px;
    background-color: #ffffff;
    animation: popUp 0.2s ease-in-out forwards;

    & li {
        margin-bottom: 0.5rem;
        padding: 0.5rem;
        border-radius: 5px;
        transition: 0.3s ease-in-out;
        cursor: pointer;

        &:hover {
            color: var(--c-text-action);
            background-color: var(--c-background-quaternary);
        }

        &:last-child {
            margin-bottom: 0;
        }
    }

    @keyframes popUp {
        0% {
            transform: scale(0.9);
        }
        100% {
            transform: scale(1);
        }
    }
`;
