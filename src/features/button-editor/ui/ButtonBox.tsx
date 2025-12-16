import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ButtonSetModal } from './ButtonSetModal';
import { BTN_STYLE, SIMPLE_BTN_STYLES, GRADIENT_BTN_STYLES } from '@/shared/constants';
import { useElementsStore } from '@/shared/store';
import { ButtonStyle } from '@/shared/types';
import { SimpleBtn, GradationBtn } from '@/entities/button';

export function ButtonBox() {
    const { t } = useTranslation();
    const { selected, setSelected } = useElementsStore();

    const setSelectedBtn = (style: ButtonStyle) => {
        setSelected({
            id: '',
            type: 'button',
            style,
            styleData: BTN_STYLE[style],
            x: 0,
            y: 0,
        });
    };

    const renderSimpleButton = (styleName: string) => {
        const style = BTN_STYLE[styleName];
        return (
            <ButtonWrapper key={styleName} onClick={() => setSelectedBtn(styleName as ButtonStyle)}>
                <SimpleBtn
                    $backgroundColor={style.backgroundColor}
                    $textColor={style.textColor}
                    $borderRadius={Number(style.borderRadius)}
                    style={{
                        borderWidth: `${style.borderWidth}px`,
                        borderStyle: 'solid',
                        borderColor: style.borderColor,
                        boxShadow: `${style.shadowOffsetX}px ${style.shadowOffsetY}px ${style.shadowBlurRadius}px ${style.shadowColor}`,
                    }}
                >
                    {style.buttonText}
                </SimpleBtn>
            </ButtonWrapper>
        );
    };

    const renderGradientButton = (styleName: string) => {
        const style = BTN_STYLE[styleName];
        return (
            <ButtonWrapper key={styleName} onClick={() => setSelectedBtn(styleName as ButtonStyle)}>
                <GradationBtn
                    $textColor={style.textColor}
                    $gradationColor1={style.gradationColor1}
                    $gradationColor2={style.gradationColor2}
                    $gradationColor3={style.gradationColor3}
                    $gradationColor4={style.gradationColor4}
                    $borderRadius={Number(style.borderRadius)}
                    style={{
                        borderWidth: `${style.borderWidth}px`,
                        borderStyle: 'solid',
                        borderColor: style.borderColor,
                        boxShadow: `${style.shadowOffsetX}px ${style.shadowOffsetY}px ${style.shadowBlurRadius}px ${style.shadowColor}`,
                    }}
                >
                    {style.buttonText}
                </GradationBtn>
            </ButtonWrapper>
        );
    };

    return (
        <ButtonBoxStyle>
            <SectionTitle>{t('editor.solidButtons')}</SectionTitle>
            <ButtonGrid>
                {SIMPLE_BTN_STYLES.map(renderSimpleButton)}
            </ButtonGrid>

            <SectionTitle>{t('editor.gradientButtons')}</SectionTitle>
            <ButtonGrid>
                {GRADIENT_BTN_STYLES.map(renderGradientButton)}
            </ButtonGrid>

            {selected?.type === 'button' && (
                <ButtonSetModal
                    selectedBtn={selected?.style}
                    closeModal={() => setSelected(null)}
                />
            )}
        </ButtonBoxStyle>
    );
}

const ButtonBoxStyle = styled.article`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const SectionTitle = styled.h3`
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--c-text-secondary);
    margin: 0.5rem 0;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--c-border);
`;

const ButtonGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
`;

const ButtonWrapper = styled.div`
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        transform: scale(1.02);
    }

    &:active {
        transform: scale(0.98);
    }
`;
