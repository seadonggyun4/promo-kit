import styled from 'styled-components';
import { Header } from './Header';
import { Menu, ContentPanel, Webview } from '@/widgets';
import { DownloadBtn } from '@/features/download';
import { useMenu } from '../model';
import { useElementsStore, useUploadImageStore } from '@/shared/store';

export function EditorPage() {
    const uploadedImage = useUploadImageStore((state) => state.uploadedImage);
    const elementsData = useElementsStore((state) => state.elementsData);
    const { isActive, activeMenu } = useMenu();

    return (
        <>
            <Header />
            <MainStyle>
                <ToolbarSection>
                    <Menu
                        menuActive={isActive}
                        menuClick={activeMenu}
                        children={<DownloadBtn uploadedImage={uploadedImage} elementsData={elementsData} />}
                    />
                </ToolbarSection>
                <ContentStyle>
                    <ContentPanel menuActive={isActive} />
                    <Webview elementsData={elementsData} uploadedImage={uploadedImage} />
                </ContentStyle>
            </MainStyle>
        </>
    );
}

const MainStyle = styled.main`
    padding: 1.5rem;
    padding-top: 90px;
    margin: 0 auto;
    min-height: 100vh;
    width: 100%;
    max-width: 1400px;
`;

const ToolbarSection = styled.section`
    background: var(--c-background-secondary);
    border-radius: 16px;
    padding: 0.75rem 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: var(--neu-shadow);
`;

const ContentStyle = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
`;
