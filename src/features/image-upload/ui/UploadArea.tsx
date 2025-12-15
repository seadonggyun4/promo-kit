import styled, { css } from 'styled-components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUploadImageStore } from '@/shared/store';

interface UploadAreaStyleProps {
    $isDraggedOver: boolean;
}

export function UploadArea() {
    const { t } = useTranslation();
    const { handleDrop, handleDragOver, handleFileSelect } = useUploadImageStore();
    const [isDraggedOver, setIsDraggedOver] = useState(false);

    const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDraggedOver(true);
        handleDragOver(event);
    };

    const onDragDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDraggedOver(false);
        handleDrop(event);
    };

    return (
        <UploadWrapper>
            <UploadAreaStyle
                $isDraggedOver={isDraggedOver}
                onDragOver={onDragOver}
                onDrop={onDragDrop}
                onDragLeave={() => setIsDraggedOver(false)}
            >
                <UploadIcon>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                </UploadIcon>
                <UploadText>
                    {t('editor.dragImage').split('\n').map((line, i) => (
                        <span key={i}>{line}{i === 0 && <br />}</span>
                    ))}
                </UploadText>
            </UploadAreaStyle>
            <input
                id="promotionPage-upload"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileSelect}
            />
            <UploadBtn htmlFor="promotionPage-upload">
                {t('editor.selectFile')}
            </UploadBtn>
        </UploadWrapper>
    );
}

const UploadWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const UploadAreaStyle = styled.div<UploadAreaStyleProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    background: var(--c-background-tertiary);
    border-radius: 16px;
    border: 2px dashed var(--c-border-primary);
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: var(--neu-shadow-inset);

    ${(props) =>
        props.$isDraggedOver &&
        css`
            border-color: var(--c-primary);
            background: var(--c-primary-soft);
            transform: scale(1.02);
        `}

    &:hover {
        border-color: var(--c-primary-light);
        background: var(--c-primary-soft);
    }
`;

const UploadIcon = styled.div`
    color: var(--c-primary);
    margin-bottom: 0.75rem;
`;

const UploadText = styled.p`
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--c-text-secondary);
    text-align: center;
    line-height: 1.5;
`;

const UploadBtn = styled.label`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.875rem 1.5rem;
    background: linear-gradient(135deg, var(--c-primary) 0%, var(--c-primary-dark) 100%);
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
    }

    &:active {
        transform: translateY(0);
    }
`;
