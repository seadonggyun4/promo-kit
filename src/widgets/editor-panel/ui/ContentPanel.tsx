import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { UploadArea } from '@/features/image-upload';
import { ButtonBox } from '@/features/button-editor';
import { TextBox } from '@/features/text-editor';
import { ImageOverlayBox } from '@/features/image-overlay-editor';
import { MENU } from '@/shared/constants';

interface ContentPanelProps {
    menuActive: string;
}

export function ContentPanel({ menuActive }: ContentPanelProps) {
    const { t } = useTranslation();

    const getPanelTitle = () => {
        switch (menuActive) {
            case MENU[0]:
                return t('editor.imageUpload');
            case MENU[1]:
                return t('editor.buttonStyle');
            case MENU[2]:
                return t('editor.textStyle');
            case MENU[3]:
                return t('editor.imageOverlayStyle');
            default:
                return '';
        }
    };

    return (
        <ContentPanelStyle>
            <PanelHeader>
                <PanelTitle>{getPanelTitle()}</PanelTitle>
            </PanelHeader>
            <PanelContent>
                {MENU[0] === menuActive && <UploadArea />}
                {MENU[1] === menuActive && <ButtonBox />}
                {MENU[2] === menuActive && <TextBox />}
                {MENU[3] === menuActive && <ImageOverlayBox />}
            </PanelContent>
        </ContentPanelStyle>
    );
}

const ContentPanelStyle = styled.aside`
    display: none;
    width: 280px;
    min-width: 280px;
    background: var(--c-background-secondary);
    border-radius: 20px;
    box-shadow: var(--neu-shadow);
    overflow: hidden;

    @media (min-width: 1000px) {
        display: flex;
        flex-direction: column;
    }
`;

const PanelHeader = styled.div`
    padding: 1.25rem 1.5rem;
    background: linear-gradient(135deg, var(--c-primary-pastel) 0%, var(--c-primary-soft) 100%);
    border-bottom: 1px solid var(--c-border-primary);
`;

const PanelTitle = styled.h2`
    font-size: 1rem;
    font-weight: 700;
    color: var(--c-primary-dark);
    margin: 0;
`;

const PanelContent = styled.div`
    padding: 1.5rem;
    flex: 1;
`;
