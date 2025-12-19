import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useHistoryStore, useElementsStore, useUploadImageStore } from '@/shared/store';
import { EditorSnapshot, getActionTypeLabel } from '@/shared/types/history';

interface HistoryPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export function HistoryPanel({ isOpen, onClose }: HistoryPanelProps) {
    const { t } = useTranslation();
    const past = useHistoryStore((state) => state.past);
    const present = useHistoryStore((state) => state.present);
    const future = useHistoryStore((state) => state.future);
    const jumpToSnapshot = useHistoryStore((state) => state.jumpToSnapshot);
    const clearHistory = useHistoryStore((state) => state.clearHistory);
    const undo = useHistoryStore((state) => state.undo);
    const redo = useHistoryStore((state) => state.redo);
    const canUndo = useHistoryStore((state) => state.canUndo);
    const canRedo = useHistoryStore((state) => state.canRedo);

    const timeline = useMemo(() => {
        const items: Array<{ snapshot: EditorSnapshot; type: 'past' | 'present' | 'future'; index: number }> = [];

        past.forEach((snapshot, index) => {
            items.push({ snapshot, type: 'past', index });
        });

        if (present) {
            items.push({ snapshot: present, type: 'present', index: past.length });
        }

        future.forEach((snapshot, index) => {
            items.push({ snapshot, type: 'future', index: past.length + 1 + index });
        });

        return items.reverse(); // Show most recent first
    }, [past, present, future]);

    const handleJumpToSnapshot = (snapshot: EditorSnapshot) => {
        const restoredSnapshot = jumpToSnapshot(snapshot.id);
        if (restoredSnapshot) {
            // Restore editor state
            useElementsStore.setState({ elementsData: restoredSnapshot.elements });
            useUploadImageStore.setState({ uploadedImage: restoredSnapshot.backgroundImage });
        }
    };

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

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp);
        const today = new Date();
        const isToday = date.toDateString() === today.toDateString();

        if (isToday) {
            return t('history.today');
        }

        return date.toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
        });
    };

    if (!isOpen) return null;

    return (
        <Overlay onClick={onClose}>
            <Panel onClick={(e) => e.stopPropagation()}>
                <PanelHeader>
                <Title>{t('history.title')}</Title>
                <HeaderActions>
                    <IconButton
                        onClick={handleUndo}
                        disabled={!canUndo()}
                        title={t('history.undo')}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 7v6h6M3 13a9 9 0 1018 0 9 9 0 00-18 0" />
                        </svg>
                    </IconButton>
                    <IconButton
                        onClick={handleRedo}
                        disabled={!canRedo()}
                        title={t('history.redo')}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 7v6h-6M21 13a9 9 0 11-18 0 9 9 0 0118 0" />
                        </svg>
                    </IconButton>
                    <IconButton onClick={onClose} title={t('common.close')}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </IconButton>
                </HeaderActions>
            </PanelHeader>

            <PanelToolbar>
                <ToolbarInfo>
                    <span>{past.length} {t('history.undoSteps')}</span>
                    <span>•</span>
                    <span>{future.length} {t('history.redoSteps')}</span>
                </ToolbarInfo>
                {past.length > 0 && (
                    <ClearButton onClick={clearHistory}>
                        {t('history.clear')}
                    </ClearButton>
                )}
            </PanelToolbar>

            <Timeline>
                {timeline.length === 0 ? (
                    <EmptyState>
                        <EmptyIcon>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                        </EmptyIcon>
                        <EmptyText>{t('history.empty')}</EmptyText>
                    </EmptyState>
                ) : (
                    timeline.map((item, idx) => (
                        <TimelineItem
                            key={item.snapshot.id}
                            $type={item.type}
                            onClick={() => handleJumpToSnapshot(item.snapshot)}
                        >
                            <TimelineMarker $type={item.type}>
                                {item.type === 'present' ? (
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                        <circle cx="12" cy="12" r="8" />
                                    </svg>
                                ) : (
                                    <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                                        <circle cx="12" cy="12" r="10" />
                                    </svg>
                                )}
                            </TimelineMarker>
                            {idx < timeline.length - 1 && <TimelineLine $type={item.type} />}
                            <TimelineContent>
                                <TimelineHeader>
                                    <TimelineTitle $type={item.type}>
                                        {item.snapshot.description}
                                    </TimelineTitle>
                                    {item.type === 'present' && (
                                        <CurrentBadge>{t('history.current')}</CurrentBadge>
                                    )}
                                </TimelineHeader>
                                <TimelineMeta>
                                    <span>{getActionTypeLabel(item.snapshot.actionType)}</span>
                                    <span>•</span>
                                    <span>{formatDate(item.snapshot.timestamp)}</span>
                                    <span>{formatTime(item.snapshot.timestamp)}</span>
                                </TimelineMeta>
                                <TimelineStats>
                                    <StatItem>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="3" width="18" height="18" rx="2" />
                                        </svg>
                                        {item.snapshot.elements.length} {t('history.elements')}
                                    </StatItem>
                                </TimelineStats>
                            </TimelineContent>
                        </TimelineItem>
                    ))
                )}
            </Timeline>

            <PanelFooter>
                <FooterText>
                    <kbd>Ctrl</kbd>+<kbd>Z</kbd> {t('history.undoShortcut')} / <kbd>Ctrl</kbd>+<kbd>Y</kbd> {t('history.redoShortcut')}
                </FooterText>
            </PanelFooter>
            </Panel>
        </Overlay>
    );
}

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.2s ease-out;

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

const Panel = styled.div`
    background: var(--c-background-secondary);
    border-radius: 16px;
    width: 100%;
    max-width: 400px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.3s ease-out;

    @keyframes slideUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
`;

const PanelHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--c-border);
`;

const Title = styled.h3`
    font-size: 1rem;
    font-weight: 600;
    color: var(--c-text);
    margin: 0;
`;

const HeaderActions = styled.div`
    display: flex;
    gap: 0.25rem;
`;

const IconButton = styled.button<{ disabled?: boolean }>`
    padding: 0.5rem;
    background: none;
    border: none;
    color: ${({ disabled }) => (disabled ? 'var(--c-text-tertiary)' : 'var(--c-text-secondary)')};
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    border-radius: 6px;
    transition: all 0.2s;
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

    &:hover:not(:disabled) {
        background: var(--c-background-secondary);
        color: var(--c-text);
    }
`;

const PanelToolbar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1.25rem;
    background: var(--c-background-secondary);
    border-bottom: 1px solid var(--c-border);
`;

const ToolbarInfo = styled.div`
    font-size: 0.75rem;
    color: var(--c-text-secondary);
    display: flex;
    gap: 0.5rem;
`;

const ClearButton = styled.button`
    font-size: 0.75rem;
    color: var(--c-text-secondary);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;

    &:hover {
        background: var(--c-background-tertiary);
        color: var(--c-text);
    }
`;

const Timeline = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
`;

const TimelineItem = styled.div<{ $type: 'past' | 'present' | 'future' }>`
    position: relative;
    padding-left: 2rem;
    padding-bottom: 1rem;
    cursor: pointer;
    opacity: ${({ $type }) => ($type === 'future' ? 0.5 : 1)};

    &:hover {
        opacity: 1;
    }
`;

const TimelineMarker = styled.div<{ $type: 'past' | 'present' | 'future' }>`
    position: absolute;
    left: 0;
    top: 0.25rem;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ $type }) =>
        $type === 'present' ? 'var(--c-primary)' :
        $type === 'past' ? 'var(--c-text-secondary)' : 'var(--c-text-tertiary)'};
`;

const TimelineLine = styled.div<{ $type: 'past' | 'present' | 'future' }>`
    position: absolute;
    left: 7px;
    top: 20px;
    bottom: 0;
    width: 2px;
    background: ${({ $type }) =>
        $type === 'present' ? 'var(--c-primary-soft)' : 'var(--c-border)'};
`;

const TimelineContent = styled.div`
    background: var(--c-background-secondary);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    transition: all 0.2s;

    &:hover {
        background: var(--c-background-tertiary);
    }
`;

const TimelineHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.25rem;
`;

const TimelineTitle = styled.span<{ $type: 'past' | 'present' | 'future' }>`
    font-size: 0.875rem;
    font-weight: ${({ $type }) => ($type === 'present' ? 600 : 500)};
    color: ${({ $type }) => ($type === 'present' ? 'var(--c-primary)' : 'var(--c-text)')};
`;

const CurrentBadge = styled.span`
    font-size: 0.625rem;
    font-weight: 500;
    padding: 0.125rem 0.375rem;
    background: var(--c-primary);
    color: white;
    border-radius: 4px;
    text-transform: uppercase;
`;

const TimelineMeta = styled.div`
    font-size: 0.75rem;
    color: var(--c-text-secondary);
    display: flex;
    gap: 0.375rem;
    margin-bottom: 0.5rem;
`;

const TimelineStats = styled.div`
    display: flex;
    gap: 0.75rem;
`;

const StatItem = styled.span`
    font-size: 0.6875rem;
    color: var(--c-text-tertiary);
    display: flex;
    align-items: center;
    gap: 0.25rem;
`;

const EmptyState = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 1rem;
    text-align: center;
`;

const EmptyIcon = styled.div`
    color: var(--c-text-tertiary);
    margin-bottom: 0.75rem;
`;

const EmptyText = styled.p`
    font-size: 0.875rem;
    color: var(--c-text-secondary);
    margin: 0;
`;

const PanelFooter = styled.div`
    padding: 0.75rem 1.25rem;
    border-top: 1px solid var(--c-border);
    background: var(--c-background-secondary);
`;

const FooterText = styled.p`
    font-size: 0.6875rem;
    color: var(--c-text-tertiary);
    margin: 0;
    text-align: center;

    kbd {
        display: inline-block;
        padding: 0.125rem 0.375rem;
        font-size: 0.625rem;
        font-family: inherit;
        background: var(--c-background-tertiary);
        border: 1px solid var(--c-border);
        border-radius: 4px;
        margin: 0 0.125rem;
    }
`;
