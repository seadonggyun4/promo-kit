import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { SeoToast } from 'seo-toast/react';
import 'seo-toast/styles';
import { Header } from './Header';
import { Menu, ContentPanel, Webview } from '@/widgets';
import { DownloadBtn } from '@/features/download';
import { HistoryPanel } from '@/features/version-history';
import { useMenu } from '../model';
import { useElementsStore, useUploadImageStore, useHistoryStore, initializeHistory } from '@/shared/store';

const AUTO_SAVE_KEY = 'promokit_autosave';
const AUTO_SAVE_DEBOUNCE = 10000;

export function EditorPage() {
    const { t } = useTranslation();
    const uploadedImage = useUploadImageStore((state) => state.uploadedImage);
    const elementsData = useElementsStore((state) => state.elementsData);
    const { isActive, activeMenu } = useMenu();
    const fileInputRef = useRef<HTMLInputElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const toastRef = useRef<any>(null);

    // Modal states
    const [isHistoryPanelOpen, setIsHistoryPanelOpen] = useState(false);

    // History store
    const canUndo = useHistoryStore((state) => state.past.length > 0);
    const canRedo = useHistoryStore((state) => state.future.length > 0);
    const undo = useHistoryStore((state) => state.undo);
    const redo = useHistoryStore((state) => state.redo);

    // Auto-save to localStorage with toast notification
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (elementsData.length > 0 || uploadedImage) {
                try {
                    const saveData = {
                        elements: elementsData,
                        backgroundImage: uploadedImage,
                        savedAt: new Date().toISOString(),
                    };
                    localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(saveData));
                    toastRef.current?.success(t('project.saved'));
                } catch (err) {
                    console.error('Auto-save failed:', err);
                }
            }
        }, AUTO_SAVE_DEBOUNCE);

        return () => clearTimeout(timeoutId);
    }, [elementsData, uploadedImage, t]);

    // Restore from localStorage on mount and initialize history
    useEffect(() => {
        const initialStateLabel = t('history.initialState');
        try {
            const saved = localStorage.getItem(AUTO_SAVE_KEY);
            if (saved) {
                const { elements, backgroundImage } = JSON.parse(saved);
                if (elements?.length > 0 || backgroundImage) {
                    useElementsStore.setState({ elementsData: elements || [] });
                    useUploadImageStore.setState({ uploadedImage: backgroundImage || '' });
                    // Initialize history with restored state
                    initializeHistory(elements || [], backgroundImage || null, initialStateLabel);
                } else {
                    // Initialize history with empty state
                    initializeHistory([], null, initialStateLabel);
                }
            } else {
                // Initialize history with empty state
                initializeHistory([], null, initialStateLabel);
            }
        } catch (err) {
            console.error('Failed to restore:', err);
            // Initialize history with empty state on error
            initializeHistory([], null, initialStateLabel);
        }
    }, [t]);

    const handleUndo = () => {
        const previousSnapshot = undo();
        if (previousSnapshot) {
            useElementsStore.setState({ elementsData: previousSnapshot.elements });
            useUploadImageStore.setState({ uploadedImage: previousSnapshot.backgroundImage });
        }
    };

    const handleRedo = () => {
        const nextSnapshot = redo();
        if (nextSnapshot) {
            useElementsStore.setState({ elementsData: nextSnapshot.elements });
            useUploadImageStore.setState({ uploadedImage: nextSnapshot.backgroundImage });
        }
    };

    const handleExportJSON = () => {
        const exportData = {
            version: '1.0.0',
            exportedAt: new Date().toISOString(),
            elements: elementsData,
            backgroundImage: uploadedImage,
        };
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `promokit_${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target?.result as string);
                const elements = data.elements || [];
                const backgroundImage = data.backgroundImage || null;

                useElementsStore.setState({ elementsData: elements });
                useUploadImageStore.setState({ uploadedImage: backgroundImage || '' });
                // Initialize history with imported state
                initializeHistory(elements, backgroundImage, t('history.initialState'));
            } catch (err) {
                console.error('Failed to import:', err);
                alert(t('project.importError'));
            }
        };
        reader.readAsText(file);

        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleNewProject = async () => {
        if (elementsData.length > 0) {
            const result = await Swal.fire({
                title: t('project.new'),
                text: t('project.confirmNew'),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ef4444',
                cancelButtonColor: '#6b7280',
                confirmButtonText: t('common.delete'),
                cancelButtonText: t('common.cancel'),
            });
            if (!result.isConfirmed) return;
        }
        useElementsStore.setState({ elementsData: [] });
        useUploadImageStore.setState({ uploadedImage: '' });
        // Initialize history with empty state
        initializeHistory([], null, t('history.initialState'));
        localStorage.removeItem(AUTO_SAVE_KEY);
    };

    return (
        <>
            <Header />
            <MainStyle>
                <ToolbarSection>
                    <ToolbarLeft>
                        <Menu menuActive={isActive} menuClick={activeMenu} />
                    </ToolbarLeft>

                    <ToolbarRight>
                        {/* New Project */}
                        <ToolbarButton onClick={handleNewProject} title={t('project.new')}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                <line x1="10" y1="11" x2="10" y2="17" />
                                <line x1="14" y1="11" x2="14" y2="17" />
                            </svg>
                        </ToolbarButton>

                        {/* Import JSON */}
                        <ToolbarButton onClick={handleImportClick} title={t('project.import')}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="17 8 12 3 7 8" />
                                <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                        </ToolbarButton>

                        {/* Export JSON */}
                        <ToolbarButton onClick={handleExportJSON} title={t('project.export')}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                        </ToolbarButton>

                        <ToolbarDivider />

                        {/* Undo/Redo */}
                        <UndoRedoGroup>
                            <ToolbarButton
                                onClick={handleUndo}
                                disabled={!canUndo}
                                title={`${t('history.undo')} (Ctrl+Z)`}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 7v6h6" />
                                    <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
                                </svg>
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={handleRedo}
                                disabled={!canRedo}
                                title={`${t('history.redo')} (Ctrl+Y)`}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 7v6h-6" />
                                    <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" />
                                </svg>
                            </ToolbarButton>
                        </UndoRedoGroup>

                        <ToolbarButton onClick={() => setIsHistoryPanelOpen(true)} title={t('history.title')}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                        </ToolbarButton>

                        <ToolbarDivider />

                        <DownloadBtn uploadedImage={uploadedImage} elementsData={elementsData} />
                    </ToolbarRight>
                </ToolbarSection>
                <ContentStyle>
                    <ContentPanel menuActive={isActive} />
                    <Webview elementsData={elementsData} uploadedImage={uploadedImage} />
                </ContentStyle>
            </MainStyle>

            {/* Hidden file input for import */}
            <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                style={{ display: 'none' }}
                onChange={handleImportJSON}
            />

            {/* History Panel */}
            <HistoryPanel
                isOpen={isHistoryPanelOpen}
                onClose={() => setIsHistoryPanelOpen(false)}
            />

            {/* Toast Notification */}
            <SeoToast ref={toastRef} position="bottom-center" />
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--c-background-secondary);
    border-radius: 16px;
    padding: 0.75rem 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: var(--neu-shadow);
    gap: 1rem;
`;

const ToolbarLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const ToolbarRight = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const ToolbarButton = styled.button<{ disabled?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: transparent;
    border: none;
    border-radius: 8px;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    color: ${({ disabled }) => (disabled ? 'var(--c-text-tertiary)' : 'var(--c-text-secondary)')};
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
        background: var(--c-background-tertiary);
        color: var(--c-primary);
    }
`;

const ToolbarDivider = styled.div`
    width: 1px;
    height: 24px;
    background: var(--c-border);
    margin: 0 0.25rem;
`;

const UndoRedoGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 0.25rem;
`;

const ContentStyle = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
`;
