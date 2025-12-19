import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Header } from './Header';
import { Menu, ContentPanel, Webview } from '@/widgets';
import { DownloadBtn } from '@/features/download';
import { HistoryPanel } from '@/features/version-history';
import { useMenu } from '../model';
import { useElementsStore, useUploadImageStore, useHistoryStore } from '@/shared/store';

const AUTO_SAVE_KEY = 'promokit_autosave';
const AUTO_SAVE_DEBOUNCE = 2000;

export function EditorPage() {
    const { t } = useTranslation();
    const uploadedImage = useUploadImageStore((state) => state.uploadedImage);
    const elementsData = useElementsStore((state) => state.elementsData);
    const { isActive, activeMenu } = useMenu();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Modal states
    const [isHistoryPanelOpen, setIsHistoryPanelOpen] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'idle'>('idle');

    // History store
    const canUndo = useHistoryStore((state) => state.past.length > 0);
    const canRedo = useHistoryStore((state) => state.future.length > 0);
    const undo = useHistoryStore((state) => state.undo);
    const redo = useHistoryStore((state) => state.redo);

    // Auto-save to localStorage
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (elementsData.length > 0 || uploadedImage) {
                setSaveStatus('saving');
                try {
                    const saveData = {
                        elements: elementsData,
                        backgroundImage: uploadedImage,
                        savedAt: new Date().toISOString(),
                    };
                    localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(saveData));
                    setSaveStatus('saved');
                    setTimeout(() => setSaveStatus('idle'), 2000);
                } catch (err) {
                    console.error('Auto-save failed:', err);
                    setSaveStatus('idle');
                }
            }
        }, AUTO_SAVE_DEBOUNCE);

        return () => clearTimeout(timeoutId);
    }, [elementsData, uploadedImage]);

    // Restore from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(AUTO_SAVE_KEY);
            if (saved) {
                const { elements, backgroundImage } = JSON.parse(saved);
                if (elements?.length > 0 || backgroundImage) {
                    useElementsStore.setState({ elementsData: elements || [] });
                    useUploadImageStore.setState({ uploadedImage: backgroundImage || '' });
                }
            }
        } catch (err) {
            console.error('Failed to restore:', err);
        }
    }, []);

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
                if (data.elements) {
                    useElementsStore.setState({ elementsData: data.elements });
                }
                if (data.backgroundImage !== undefined) {
                    useUploadImageStore.setState({ uploadedImage: data.backgroundImage || '' });
                }
                useHistoryStore.getState().clearHistory();
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

    const handleNewProject = () => {
        if (elementsData.length > 0) {
            if (!confirm(t('project.confirmNew'))) return;
        }
        useElementsStore.setState({ elementsData: [] });
        useUploadImageStore.setState({ uploadedImage: '' });
        useHistoryStore.getState().clearHistory();
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
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="12" y1="18" x2="12" y2="12" />
                                <line x1="9" y1="15" x2="15" y2="15" />
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

                        {/* Auto-save status */}
                        {saveStatus !== 'idle' && (
                            <SaveStatus $status={saveStatus}>
                                {saveStatus === 'saving' ? t('project.saving') : t('project.saved')}
                            </SaveStatus>
                        )}

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

const SaveStatus = styled.span<{ $status: 'saved' | 'saving' }>`
    font-size: 0.75rem;
    color: ${({ $status }) => ($status === 'saved' ? 'var(--c-success, #10b981)' : 'var(--c-text-tertiary)')};
    padding: 0.25rem 0.5rem;
    background: var(--c-background-tertiary);
    border-radius: 4px;
`;

const ContentStyle = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
`;
