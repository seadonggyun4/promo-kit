import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { keyframes } from 'styled-components';
import { ButtonSetModal } from './ButtonSetModal';
import { BTN_STYLE, SIMPLE_BTN_STYLES, GRADIENT_BTN_STYLES } from '@/shared/constants';
import { useElementsStore } from '@/shared/store';
import { ButtonStyle } from '@/shared/types';
import { SimpleBtn, GradationBtn } from '@/entities/button';

type TabType = 'solid' | 'gradient';

export function ButtonBox() {
    const { t } = useTranslation();
    const { selected, setSelected } = useElementsStore();
    const [activeTab, setActiveTab] = useState<TabType>('solid');
    const [animationKey, setAnimationKey] = useState(0);

    const handleTabChange = (tab: TabType) => {
        if (tab !== activeTab) {
            setActiveTab(tab);
            setAnimationKey(prev => prev + 1);
        }
    };

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

    const renderSimpleButton = (styleName: string, index: number) => {
        const style = BTN_STYLE[styleName];
        return (
            <ButtonWrapper key={`${styleName}-${animationKey}`} $delay={index * 50} onClick={() => setSelectedBtn(styleName as ButtonStyle)}>
                <SimpleBtn
                    $backgroundColor={style.backgroundColor}
                    $textColor={style.textColor}
                    $borderRadius={Number(style.borderRadius)}
                    style={{
                        borderWidth: `${style.borderWidth}px`,
                        borderStyle: 'solid',
                        borderColor: style.borderColor,
                        boxShadow: `${style.shadowOffsetX}px ${style.shadowOffsetY}px ${style.shadowBlurRadius}px ${style.shadowColor}`,
                        padding: '0.5rem 1rem',
                        fontSize: '0.875rem',
                    }}
                >
                    {style.buttonText}
                </SimpleBtn>
            </ButtonWrapper>
        );
    };

    const renderGradientButton = (styleName: string, index: number) => {
        const style = BTN_STYLE[styleName];
        return (
            <ButtonWrapper key={`${styleName}-${animationKey}`} $delay={index * 50} onClick={() => setSelectedBtn(styleName as ButtonStyle)}>
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
                        padding: '0.5rem 1rem',
                        fontSize: '0.875rem',
                    }}
                >
                    {style.buttonText}
                </GradationBtn>
            </ButtonWrapper>
        );
    };

    return (
        <ButtonBoxStyle>
            <TabContainer>
                <Tab $active={activeTab === 'solid'} onClick={() => handleTabChange('solid')}>
                    {t('editor.solidButtons')}
                </Tab>
                <Tab $active={activeTab === 'gradient'} onClick={() => handleTabChange('gradient')}>
                    {t('editor.gradientButtons')}
                </Tab>
                <TabIndicator $activeTab={activeTab} />
            </TabContainer>

            <ButtonGrid>
                {activeTab === 'solid' && SIMPLE_BTN_STYLES.map((style, index) => renderSimpleButton(style, index))}
                {activeTab === 'gradient' && GRADIENT_BTN_STYLES.map((style, index) => renderGradientButton(style, index))}
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

const TabContainer = styled.div`
    position: relative;
    display: flex;
    gap: 0.5rem;
    border-bottom: 1px solid var(--c-background-tertiary);
    padding-bottom: 0.5rem;
`;

const Tab = styled.button<{ $active: boolean }>`
    flex: 1;
    padding: 0.5rem 1rem;
    border: none;
    background: transparent;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.2s ease;
    color: ${({ $active }) => ($active ? 'var(--c-accent-primary)' : 'var(--c-text-secondary)')};

    &:hover {
        color: ${({ $active }) => ($active ? 'var(--c-accent-primary)' : 'var(--c-text-primary)')};
    }
`;

const TabIndicator = styled.div<{ $activeTab: TabType }>`
    position: absolute;
    bottom: 0;
    left: ${({ $activeTab }) => ($activeTab === 'solid' ? '0' : '50%')};
    width: 50%;
    height: 2px;
    background-color: var(--c-accent-primary);
    transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const ButtonGrid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
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

const ButtonWrapper = styled.div<{ $delay: number }>`
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
