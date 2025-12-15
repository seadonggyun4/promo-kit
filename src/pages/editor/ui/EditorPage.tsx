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
        <MainStyle>
            <Header />
            <Menu
                menuActive={isActive}
                menuClick={activeMenu}
                children={<DownloadBtn uploadedImage={uploadedImage} />}
            />
            <ContentStyle>
                <ContentPanel menuActive={isActive} />
                <Webview elementsData={elementsData} uploadedImage={uploadedImage} />
            </ContentStyle>
        </MainStyle>
    );
}

const MainStyle = styled.main`
    padding: 0 1rem;
    margin: auto auto;
    height: 100vh;
    width: 100%;
    max-width: 1280px;
`;

const ContentStyle = styled.div`
    display: flex;
    align-items: flex-start;
    column-gap: 1rem;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 2px solid var(--c-border-primary);
`;
