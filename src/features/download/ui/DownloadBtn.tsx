import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useWebViewDownload } from '../model';
import backgroundImage from '@/shared/assets/promotionPage.jpeg';

interface DownloadBtnProps {
    uploadedImage: string | ArrayBuffer | null;
}

interface DownloadBtnStyleProps {
    $isDownloading: boolean;
}

export function DownloadBtn({ uploadedImage }: DownloadBtnProps) {
    const { t } = useTranslation();
    const { webViewDownload } = useWebViewDownload(uploadedImage, backgroundImage);
    const [isDownloading, setIsDownloading] = useState(false);

    const handleBtnClick = () => {
        if (isDownloading) return;

        setIsDownloading(true);
        webViewDownload();

        setTimeout(() => {
            setIsDownloading(false);
        }, 2000);
    };

    return (
        <DownloadBtnStyle
            onClick={handleBtnClick}
            $isDownloading={isDownloading}
            type="button"
            aria-label={t('common.download')}
        >
            <div className="wrapper" aria-hidden>
                <div className="front">
                    <span>{t('common.downloading')}</span>
                    <svg className="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                </div>
                <div className="top"></div>
                <div className="right"></div>
                <div className="bottom"></div>
                <div className="left"></div>
                <div className="back">
                    <span>{t('common.download')}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                </div>
            </div>
        </DownloadBtnStyle>
    );
}

const DownloadBtnStyle = styled.button<DownloadBtnStyleProps>`
    position: relative;
    perspective: calc(1rem * 10);
    font-family: inherit;
    font-size: 0.9rem;
    font-weight: 600;
    color: white;
    background-color: transparent;
    cursor: ${({ $isDownloading }) => ($isDownloading ? 'not-allowed' : 'pointer')};
    opacity: ${({ $isDownloading }) => ($isDownloading ? 0.9 : 1)};
    -webkit-tap-highlight-color: transparent;

    &:focus-visible {
        outline: 3px dashed var(--c-primary);
        outline-offset: calc(3px * 2);
    }

    & .wrapper {
        position: relative;
        display: grid;
        transform: ${({ $isDownloading }) =>
            $isDownloading
                ? 'translateZ(calc(1rem * -1)) scale(1.001) rotateX(0) rotateY(0) rotateZ(0)'
                : 'translateZ(0) scale(1.001) rotateX(1.5turn) rotateY(0) rotateZ(0)'};
        transform-style: preserve-3d;
        pointer-events: none;
        transition: transform 800ms cubic-bezier(0.3, 1.4, 0.65, 1);
    }

    & .front,
    & .back,
    & .top,
    & .bottom,
    & .left,
    & .right {
        grid-area: 1 / 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        transition: background-color 800ms cubic-bezier(0.3, 1.4, 0.65, 1);
    }

    & .front span,
    & .front svg,
    & .back span,
    & .back svg {
        background-color: transparent;
    }

    & .top,
    & .bottom {
        width: 100%;
        height: 1rem;
    }

    & .left,
    & .right {
        width: 1rem;
        height: 100%;
    }

    & .front {
        transform: translateZ(1rem);
    }

    & .back {
        transform: scaleX(-1) rotate(0.5turn);
    }

    & .top {
        transform-origin: top center;
        transform: rotateX(90deg);
    }

    & .bottom {
        align-self: end;
        transform-origin: bottom center;
        transform: rotateX(-90deg);
    }

    & .right {
        justify-self: end;
        transform-origin: center right;
        transform: rotateY(90deg);
    }

    & .left {
        justify-self: start;
        transform-origin: center left;
        transform: rotateY(-90deg);
    }

    & .front,
    & .back {
        padding: 0.75rem 1.5rem;
        background-color: ${({ $isDownloading }) =>
            $isDownloading ? 'var(--c-accent-success)' : 'var(--c-primary)'};
    }

    & .top,
    & .bottom,
    & .left,
    & .right {
        background-color: ${({ $isDownloading }) =>
            $isDownloading ? 'var(--c-accent-success-secondary)' : 'var(--c-primary-dark)'};
    }

    & .spinner {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;
