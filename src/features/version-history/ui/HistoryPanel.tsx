import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { keyframes } from 'styled-components';
import { useHistoryStore, useElementsStore, useUploadImageStore } from '@/shared/store';
import { EditorSnapshot, HistoryActionType, getActionTypeI18nKey } from '@/shared/types/history';

interface HistoryPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

// Action type icon mapping
const ActionIcon = ({ type }: { type: HistoryActionType }) => {
    switch (type) {
        case 'element_add':
            return (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
            );
        case 'element_remove':
            return (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
            );
        case 'element_move':
            return (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="5 9 2 12 5 15" />
                    <polyline points="9 5 12 2 15 5" />
                    <polyline points="15 19 12 22 9 19" />
                    <polyline points="19 9 22 12 19 15" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <line x1="12" y1="2" x2="12" y2="22" />
                </svg>
            );
        case 'element_style':
            return (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                </svg>
            );
        case 'image_change':
            return (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                </svg>
            );
        default:
            return (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </svg>
            );
    }
};

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

    const allItems = useMemo(() => {
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

        return items.reverse();
    }, [past, present, future]);

    const handleJumpToSnapshot = (snapshot: EditorSnapshot) => {
        const restoredSnapshot = jumpToSnapshot(snapshot.id);
        if (restoredSnapshot) {
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
        });
    };

    const getHistoryItemTitle = (snapshot: EditorSnapshot): string => {
        return t(getActionTypeI18nKey(snapshot.actionType));
    };

    if (!isOpen) return null;

    return (
        <Overlay onClick={onClose}>
            <SidePanel onClick={(e) => e.stopPropagation()}>
                <PanelHeader>
                    <HeaderLeft>
                        <Title>{t('history.title')}</Title>
                        <StatsChip>
                            <span>{past.length}</span>
                            <ChipDivider>/</ChipDivider>
                            <span>{future.length}</span>
                        </StatsChip>
                    </HeaderLeft>
                    <CloseButton onClick={onClose}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </CloseButton>
                </PanelHeader>

                <ActionBar>
                    <ActionButton onClick={handleUndo} disabled={!canUndo()}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 7v6h6" />
                            <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
                        </svg>
                        <span>{t('history.undo')}</span>
                    </ActionButton>
                    <ActionButton onClick={handleRedo} disabled={!canRedo()}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 7v6h-6" />
                            <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" />
                        </svg>
                        <span>{t('history.redo')}</span>
                    </ActionButton>
                </ActionBar>

                <HistoryList>
                    {allItems.length === 0 ? (
                        <EmptyState>
                            <EmptyIcon>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                            </EmptyIcon>
                            <EmptyTitle>{t('history.empty')}</EmptyTitle>
                            <EmptyDescription>{t('history.emptyDescription')}</EmptyDescription>
                        </EmptyState>
                    ) : (
                        allItems.map((item, idx) => (
                            <HistoryItem
                                key={item.snapshot.id}
                                $type={item.type}
                                $isPresent={item.type === 'present'}
                                onClick={() => handleJumpToSnapshot(item.snapshot)}
                            >
                                <ItemIcon $type={item.type}>
                                    <ActionIcon type={item.snapshot.actionType} />
                                </ItemIcon>
                                {idx < allItems.length - 1 && <ConnectorLine $type={item.type} />}
                                <ItemContent>
                                    <ItemTitle $type={item.type}>
                                        {getHistoryItemTitle(item.snapshot)}
                                        {item.type === 'present' && <CurrentDot />}
                                    </ItemTitle>
                                    <ItemTime>{formatTime(item.snapshot.timestamp)}</ItemTime>
                                </ItemContent>
                            </HistoryItem>
                        ))
                    )}
                </HistoryList>

                <PanelFooter>
                    {past.length > 0 && (
                        <ClearButton onClick={clearHistory}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                            {t('history.clear')}
                        </ClearButton>
                    )}
                    <ShortcutHint>
                        <kbd>⌘Z</kbd> / <kbd>⌘⇧Z</kbd>
                    </ShortcutHint>
                </PanelFooter>
            </SidePanel>
        </Overlay>
    );
}

const slideIn = keyframes`
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
`;

const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(2px);
    display: flex;
    justify-content: flex-end;
    z-index: 1000;
    animation: ${fadeIn} 0.2s ease-out;
`;

const SidePanel = styled.div`
    background: var(--c-background, #ffffff);
    width: 100%;
    max-width: 300px;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: -4px 0 24px rgba(0, 0, 0, 0.12);
    animation: ${slideIn} 0.25s ease-out;
`;

const PanelHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--c-border, #e5e7eb);
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
`;

const Title = styled.h2`
    font-size: 1rem;
    font-weight: 600;
    color: var(--c-text, #1f2937);
    margin: 0;
`;

const StatsChip = styled.div`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.6875rem;
    font-weight: 500;
    color: var(--c-text-secondary, #6b7280);
    background: var(--c-background-tertiary, #f3f4f6);
    padding: 0.25rem 0.5rem;
    border-radius: 10px;
`;

const ChipDivider = styled.span`
    color: var(--c-text-tertiary, #9ca3af);
`;

const CloseButton = styled.button`
    padding: 0.375rem;
    background: none;
    border: none;
    color: var(--c-text-secondary, #6b7280);
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background: var(--c-background-tertiary, #f3f4f6);
        color: var(--c-text, #1f2937);
    }
`;

const ActionBar = styled.div`
    display: flex;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    border-bottom: 1px solid var(--c-border, #e5e7eb);
`;

const ActionButton = styled.button<{ disabled?: boolean }>`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.375rem;
    padding: 0.5rem 0.75rem;
    background: ${({ disabled }) => (disabled ? 'var(--c-background-secondary, #f9fafb)' : 'var(--c-background-tertiary, #f3f4f6)')};
    border: none;
    border-radius: 6px;
    color: ${({ disabled }) => (disabled ? 'var(--c-text-tertiary, #9ca3af)' : 'var(--c-text, #1f2937)')};
    font-size: 0.8125rem;
    font-weight: 500;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
    transition: all 0.15s;

    &:hover:not(:disabled) {
        background: var(--c-primary-soft, #ede9fe);
        color: var(--c-primary, #7c3aed);
    }
`;

const HistoryList = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 0.75rem 0;

    /* Custom scrollbar */
    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-track {
        background: var(--c-primary-soft, #ede9fe);
        border-radius: 3px;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(124, 58, 237, 0.4);
        border-radius: 3px;

        &:hover {
            background: rgba(124, 58, 237, 0.6);
        }
    }
    scrollbar-width: thin;
    scrollbar-color: rgba(124, 58, 237, 0.4) var(--c-primary-soft, #ede9fe);
`;

const HistoryItem = styled.div<{ $type: 'past' | 'present' | 'future'; $isPresent: boolean }>`
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.625rem;
    padding: 0.5rem 1.25rem;
    cursor: pointer;
    transition: all 0.15s;
    opacity: ${({ $type }) => ($type === 'future' ? 0.5 : 1)};
    background: ${({ $isPresent }) => ($isPresent ? 'var(--c-primary-soft, #ede9fe)' : 'transparent')};

    &:hover {
        background: ${({ $isPresent }) => ($isPresent ? 'var(--c-primary-soft, #ede9fe)' : 'var(--c-background-tertiary, #f3f4f6)')};
        opacity: 1;
    }
`;

const ItemIcon = styled.div<{ $type: 'past' | 'present' | 'future' }>`
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ $type }) =>
        $type === 'present' ? 'var(--c-primary, #7c3aed)' :
        $type === 'past' ? 'var(--c-background-tertiary, #f3f4f6)' : 'var(--c-background-secondary, #f9fafb)'};
    color: ${({ $type }) =>
        $type === 'present' ? 'white' :
        $type === 'past' ? 'var(--c-text-secondary, #6b7280)' : 'var(--c-text-tertiary, #9ca3af)'};
    border-radius: 6px;
    flex-shrink: 0;
    z-index: 1;
`;

const ConnectorLine = styled.div<{ $type: 'past' | 'present' | 'future' }>`
    position: absolute;
    left: calc(1.25rem + 12px - 1px);
    top: calc(0.5rem + 24px);
    bottom: calc(-0.5rem);
    width: 2px;
    background: ${({ $type }) =>
        $type === 'present' ? 'var(--c-primary-soft, #ede9fe)' : 'var(--c-border, #e5e7eb)'};
`;

const ItemContent = styled.div`
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
`;

const ItemTitle = styled.span<{ $type: 'past' | 'present' | 'future' }>`
    font-size: 0.8125rem;
    font-weight: ${({ $type }) => ($type === 'present' ? 600 : 400)};
    color: ${({ $type }) => ($type === 'present' ? 'var(--c-primary, #7c3aed)' : 'var(--c-text, #1f2937)')};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
    gap: 0.375rem;
`;

const CurrentDot = styled.span`
    width: 6px;
    height: 6px;
    background: var(--c-primary, #7c3aed);
    border-radius: 50%;
    flex-shrink: 0;
`;

const ItemTime = styled.span`
    font-size: 0.6875rem;
    color: var(--c-text-tertiary, #9ca3af);
    flex-shrink: 0;
`;

const EmptyState = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 1.5rem;
    text-align: center;
`;

const EmptyIcon = styled.div`
    color: var(--c-text-tertiary, #9ca3af);
    margin-bottom: 0.75rem;
    opacity: 0.5;
`;

const EmptyTitle = styled.h3`
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--c-text-secondary, #6b7280);
    margin: 0 0 0.25rem 0;
`;

const EmptyDescription = styled.p`
    font-size: 0.75rem;
    color: var(--c-text-tertiary, #9ca3af);
    margin: 0;
    max-width: 180px;
`;

const PanelFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1.25rem;
    border-top: 1px solid var(--c-border, #e5e7eb);
`;

const ClearButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.75rem;
    color: var(--c-text-secondary, #6b7280);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    transition: all 0.15s;

    &:hover {
        background: var(--c-background-tertiary, #f3f4f6);
        color: var(--c-danger, #ef4444);
    }
`;

const ShortcutHint = styled.span`
    font-size: 0.625rem;
    color: var(--c-text-tertiary, #9ca3af);
    margin-left: auto;

    kbd {
        display: inline-block;
        padding: 0.125rem 0.25rem;
        font-size: 0.5625rem;
        font-family: inherit;
        background: var(--c-background-tertiary, #f3f4f6);
        border: 1px solid var(--c-border, #e5e7eb);
        border-radius: 3px;
        margin: 0 0.125rem;
    }
`;
