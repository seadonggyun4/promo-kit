import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ElementData } from '@/shared/types';
import backgroundImage from '@/shared/assets/promotionPage.jpeg';
import { DownloadModal } from './DownloadModal';

interface DownloadBtnProps {
    uploadedImage: string | ArrayBuffer | null;
    elementsData: ElementData[];
}

export function DownloadBtn({ uploadedImage, elementsData }: DownloadBtnProps) {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleBtnClick = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            <DownloadBtnStyle
                onClick={handleBtnClick}
                type="button"
                aria-label={t('common.download')}
            >
                <span>{t('common.download')}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
            </DownloadBtnStyle>
            <DownloadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                elementsData={elementsData}
                uploadedImage={uploadedImage}
                backgroundImage={backgroundImage}
            />
        </>
    );
}

const DownloadBtnStyle = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    font-family: inherit;
    font-size: 0.9rem;
    font-weight: 600;
    color: white;
    background-color: var(--c-primary);
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: var(--c-primary-dark);
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
    }

    svg {
        flex-shrink: 0;
    }
`;
