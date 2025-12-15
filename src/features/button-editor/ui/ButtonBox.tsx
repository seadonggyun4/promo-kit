import styled from 'styled-components';
import { ButtonSetModal } from './ButtonSetModal';
import { BTN_STYLE } from '@/shared/constants';
import { useElementsStore } from '@/shared/store';
import { ButtonStyle } from '@/shared/types';
import { SimpleBtn, GradationBtn } from '@/entities/button';

export function ButtonBox() {
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

    return (
        <ButtonBoxStyle>
            <Title>버튼 카테고리</Title>
            <div style={{ height: '50px', width: '100%' }}>
                <SimpleBtn
                    $backgroundColor={BTN_STYLE['SimpleBtn']['backgroundColor']}
                    $textColor={BTN_STYLE['SimpleBtn']['textColor']}
                    $borderRadius={Number(BTN_STYLE['SimpleBtn']['borderRadius'])}
                    onClick={() => setSelectedBtn('SimpleBtn')}
                >
                    {BTN_STYLE['SimpleBtn']['buttonText']}
                </SimpleBtn>
            </div>
            <div style={{ height: '50px', width: '100%' }}>
                <GradationBtn
                    $textColor={BTN_STYLE['GradationBtn']['textColor']}
                    $gradationColor1={BTN_STYLE['GradationBtn']['gradationColor1']}
                    $gradationColor2={BTN_STYLE['GradationBtn']['gradationColor2']}
                    $gradationColor3={BTN_STYLE['GradationBtn']['gradationColor3']}
                    $gradationColor4={BTN_STYLE['GradationBtn']['gradationColor4']}
                    $borderRadius={Number(BTN_STYLE['GradationBtn']['borderRadius'])}
                    onClick={() => setSelectedBtn('GradationBtn')}
                >
                    {BTN_STYLE['GradationBtn']['buttonText']}
                </GradationBtn>
            </div>
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
    align-items: center;
    justify-content: start;
    flex-direction: column;
    row-gap: 1rem;
`;

const Title = styled.h2`
    margin-bottom: 1rem;
    font-size: 1rem;
    font-weight: bold;
`;
