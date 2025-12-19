import styled, { keyframes } from 'styled-components';
import { TextSetModal } from './TextSetModal';
import { TEXT_STYLE } from '@/shared/constants';
import { useElementsStore } from '@/shared/store';
import { TextStyle } from '@/shared/types';
import { TextElement } from '@/entities/text';

export function TextBox() {
    const { selected, setSelected } = useElementsStore();

    const setSelectedText = (style: TextStyle) => {
        setSelected({
            id: '',
            type: 'text',
            style,
            styleData: TEXT_STYLE[style],
            x: 0,
            y: 0,
        });
    };

    const h1Style = TEXT_STYLE['H1Text'];
    const h2Style = TEXT_STYLE['H2Text'];
    const h3Style = TEXT_STYLE['H3Text'];
    const pStyle = TEXT_STYLE['PText'];
    const strongStyle = TEXT_STYLE['StrongText'];

    return (
        <TextBoxStyle>
            <TextWrapper $delay={0} onClick={() => setSelectedText('H1Text')}>
                <TextElement
                    $fontFamily={h1Style.fontFamily}
                    $fontSize={24}
                    $fontWeight={h1Style.fontWeight}
                    $textColor={h1Style.textColor}
                    $textAlign={h1Style.textAlign}
                    style={{ padding: '0.5rem' }}
                >
                    H1
                </TextElement>
            </TextWrapper>

            <TextWrapper $delay={50} onClick={() => setSelectedText('H2Text')}>
                <TextElement
                    $fontFamily={h2Style.fontFamily}
                    $fontSize={20}
                    $fontWeight={h2Style.fontWeight}
                    $textColor={h2Style.textColor}
                    $textAlign={h2Style.textAlign}
                    style={{ padding: '0.5rem' }}
                >
                    H2
                </TextElement>
            </TextWrapper>

            <TextWrapper $delay={100} onClick={() => setSelectedText('H3Text')}>
                <TextElement
                    $fontFamily={h3Style.fontFamily}
                    $fontSize={18}
                    $fontWeight={h3Style.fontWeight}
                    $textColor={h3Style.textColor}
                    $textAlign={h3Style.textAlign}
                    style={{ padding: '0.5rem' }}
                >
                    H3
                </TextElement>
            </TextWrapper>

            <TextWrapper $delay={150} onClick={() => setSelectedText('PText')}>
                <TextElement
                    $fontFamily={pStyle.fontFamily}
                    $fontSize={14}
                    $fontWeight={pStyle.fontWeight}
                    $textColor={pStyle.textColor}
                    $textAlign={pStyle.textAlign}
                    style={{ padding: '0.5rem' }}
                >
                    p - Paragraph
                </TextElement>
            </TextWrapper>

            <TextWrapper $delay={200} onClick={() => setSelectedText('StrongText')}>
                <TextElement
                    $fontFamily={strongStyle.fontFamily}
                    $fontSize={14}
                    $fontWeight={strongStyle.fontWeight}
                    $textColor={strongStyle.textColor}
                    $textAlign={strongStyle.textAlign}
                    style={{ padding: '0.5rem' }}
                >
                    strong - Bold
                </TextElement>
            </TextWrapper>

            {selected?.type === 'text' && (
                <TextSetModal
                    selectedText={selected?.style as TextStyle}
                    closeModal={() => setSelected(null)}
                />
            )}
        </TextBoxStyle>
    );
}

const TextBoxStyle = styled.article`
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

const TextWrapper = styled.div<{ $delay: number }>`
    cursor: pointer;
    opacity: 0;
    animation: ${popIn} 0.3s ease-out forwards;
    animation-delay: ${({ $delay }) => $delay}ms;
    background-color: var(--c-background-tertiary);
    border-radius: 8px;

    &:hover {
        transform: scale(1.02);
    }

    &:active {
        transform: scale(0.98);
    }
`;
