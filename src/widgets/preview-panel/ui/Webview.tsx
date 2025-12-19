import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
    DndContext,
    DragEndEvent,
    useDraggable,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { ELEMENT_MENU } from '@/shared/constants';
import backgroundImage from '@/shared/assets/promotionPage.jpeg';
import { useElementsStore } from '@/shared/store';
import {
    ElementData,
    ButtonStyle,
    ButtonStyleDataLegacy,
    TextStyle,
    TextStyleDataLegacy,
    ImageOverlayStyle,
    ImageOverlayStyleDataLegacy,
} from '@/shared/types';
import { SimpleBtn, GradationBtn } from '@/entities/button';
import { TextElement } from '@/entities/text';
import { ImageOverlayElement, ImageOverlayContainer } from '@/entities/image-overlay';

interface WebviewProps {
    elementsData: ElementData[];
    uploadedImage: string | ArrayBuffer | null;
}

const renderButton = (style: ButtonStyle, styleData: ButtonStyleDataLegacy): React.ReactNode => {
    if (style === 'SimpleBtn') {
        return (
            <SimpleBtn
                as="div"
                $backgroundColor={styleData.backgroundColor}
                $textColor={styleData.textColor}
                $borderRadius={Number(styleData.borderRadius)}
                style={{
                    width: `${styleData.width || 200}px`,
                    height: `${styleData.height || 50}px`,
                    borderWidth: `${styleData.borderWidth}px`,
                    borderStyle: 'solid',
                    borderColor: styleData.borderColor,
                    boxShadow: `${styleData.shadowOffsetX}px ${styleData.shadowOffsetY}px ${styleData.shadowBlurRadius}px ${styleData.shadowColor}`,
                    pointerEvents: 'none',
                }}
            >
                {styleData.buttonText}
            </SimpleBtn>
        );
    }

    if (style === 'GradationBtn') {
        return (
            <GradationBtn
                as="div"
                $textColor={styleData.textColor}
                $gradationColor1={styleData.gradationColor1}
                $gradationColor2={styleData.gradationColor2}
                $gradationColor3={styleData.gradationColor3}
                $gradationColor4={styleData.gradationColor4}
                $borderRadius={Number(styleData.borderRadius)}
                style={{
                    width: `${styleData.width || 200}px`,
                    height: `${styleData.height || 50}px`,
                    borderWidth: `${styleData.borderWidth}px`,
                    borderStyle: 'solid',
                    borderColor: styleData.borderColor,
                    boxShadow: `${styleData.shadowOffsetX}px ${styleData.shadowOffsetY}px ${styleData.shadowBlurRadius}px ${styleData.shadowColor}`,
                    pointerEvents: 'none',
                }}
            >
                {styleData.buttonText}
            </GradationBtn>
        );
    }

    return null;
};

const renderText = (_style: TextStyle, styleData: TextStyleDataLegacy): React.ReactNode => {
    return (
        <TextElement
            as="div"
            $fontFamily={styleData.fontFamily}
            $fontSize={Number(styleData.fontSize)}
            $fontWeight={styleData.fontWeight}
            $lineHeight={styleData.lineHeight}
            $letterSpacing={styleData.letterSpacing}
            $textColor={styleData.textColor}
            $textAlign={styleData.textAlign}
            $textDecoration={styleData.textDecoration}
            $textTransform={styleData.textTransform}
            $shadowOffsetX={Number(styleData.shadowOffsetX)}
            $shadowOffsetY={Number(styleData.shadowOffsetY)}
            $shadowBlurRadius={Number(styleData.shadowBlurRadius)}
            $shadowColor={styleData.shadowColor}
            style={{
                width: `${styleData.width || 300}px`,
                height: `${styleData.height || 50}px`,
                pointerEvents: 'none',
            }}
        >
            {styleData.text}
        </TextElement>
    );
};

const renderImageOverlay = (_style: ImageOverlayStyle, styleData: ImageOverlayStyleDataLegacy): React.ReactNode => {
    if (!styleData.imageUrl) {
        return (
            <ImageOverlayContainer
                $borderRadius={Number(styleData.borderRadius)}
                $borderWidth={Number(styleData.borderWidth)}
                $borderColor={styleData.borderColor}
                $shadowOffsetX={Number(styleData.shadowOffsetX)}
                $shadowOffsetY={Number(styleData.shadowOffsetY)}
                $shadowBlurRadius={Number(styleData.shadowBlurRadius)}
                $shadowColor={styleData.shadowColor}
                style={{
                    width: `${styleData.width || 200}px`,
                    height: `${styleData.height || 150}px`,
                    pointerEvents: 'none',
                }}
            >
                No Image
            </ImageOverlayContainer>
        );
    }

    return (
        <ImageOverlayElement
            as="div"
            $objectFit={styleData.objectFit}
            $opacity={Number(styleData.opacity)}
            $borderRadius={Number(styleData.borderRadius)}
            $borderWidth={Number(styleData.borderWidth)}
            $borderColor={styleData.borderColor}
            $shadowOffsetX={Number(styleData.shadowOffsetX)}
            $shadowOffsetY={Number(styleData.shadowOffsetY)}
            $shadowBlurRadius={Number(styleData.shadowBlurRadius)}
            $shadowColor={styleData.shadowColor}
            style={{
                width: `${styleData.width || 200}px`,
                height: `${styleData.height || 150}px`,
                pointerEvents: 'none',
            }}
        >
            <img src={styleData.imageUrl} alt={styleData.altText || 'Image'} />
        </ImageOverlayElement>
    );
};

const renderElement = (data: ElementData): React.ReactNode => {
    switch (data.type) {
        case 'button':
            return renderButton(data.style as ButtonStyle, data.styleData);
        case 'text':
            return renderText(data.style as TextStyle, data.styleData);
        case 'image-overlay':
            return renderImageOverlay(data.style as ImageOverlayStyle, data.styleData);
        default:
            return null;
    }
};

interface DraggableElementProps {
    data: ElementData;
    menuActive: string;
    onElementClick: (e: React.MouseEvent<HTMLDivElement>, data: ElementData) => void;
    onMenuClick: (data: ElementData, menu: string) => void;
}

function DraggableElement({ data, menuActive, onElementClick, onMenuClick }: DraggableElementProps) {
    const { t } = useTranslation();
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: data.id,
    });

    const style = {
        top: `${data.y}%`,
        left: `${data.x}%`,
        width: `${data.styleData.width || 200}px`,
        height: `${data.styleData.height || 50}px`,
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        opacity: isDragging ? 0.8 : 1,
        zIndex: isDragging ? 100 : menuActive === data.id ? 10 : 1,
    };

    return (
        <ElementWrap
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            onClick={(e) => onElementClick(e, data)}
        >
            {renderElement(data)}
            {menuActive === data.id && (
                <ElementMenu>
                    {data.type &&
                        ELEMENT_MENU[data.type as keyof typeof ELEMENT_MENU].map(
                            (menu, index) => (
                                <li key={index} onClick={() => onMenuClick(data, menu)}>
                                    {t(`common.${menu}`)}
                                </li>
                            )
                        )}
                </ElementMenu>
            )}
        </ElementWrap>
    );
}

export function Webview({ elementsData, uploadedImage }: WebviewProps) {
    const { t } = useTranslation();
    const { updateElementPosition, setSelected, removeElement } = useElementsStore();
    const [menuActive, setMenuActive] = useState('');
    const elementsBoxRef = useRef<HTMLDivElement>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, delta } = event;
        const id = active.id as string;

        if (!elementsBoxRef.current) return;

        const boundingRect = elementsBoxRef.current.getBoundingClientRect();
        const parentWidth = boundingRect.width;
        const parentHeight = boundingRect.height;

        const element = elementsData.find((el) => el.id === id);
        if (!element) return;

        const deltaXPercent = (delta.x / parentWidth) * 100;
        const deltaYPercent = (delta.y / parentHeight) * 100;

        const newX = Math.max(0, Math.min(100, element.x + deltaXPercent));
        const newY = Math.max(0, Math.min(100, element.y + deltaYPercent));

        updateElementPosition(id, newX, newY);
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
                <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                    <ElementsBox id="elementsBox" ref={elementsBoxRef}>
                        {elementsData.map((data) => (
                            <DraggableElement
                                key={data.id}
                                data={data}
                                menuActive={menuActive}
                                onElementClick={clickElement}
                                onMenuClick={elementMenuClick}
                            />
                        ))}
                    </ElementsBox>
                </DndContext>
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
    cursor: grab;
    touch-action: none;

    &:active {
        cursor: grabbing;
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
