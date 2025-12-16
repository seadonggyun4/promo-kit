import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { FrameworkType, StyleType, ElementData } from '@/shared/types';
import { generateCode } from '../lib';

interface DownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
    elementsData: ElementData[];
    uploadedImage: string | ArrayBuffer | null;
    backgroundImage: string;
}

const FRAMEWORKS: { value: FrameworkType; labelKey: string }[] = [
    { value: 'vanilla', labelKey: 'download.vanillaHtml' },
    { value: 'react', labelKey: 'download.react' },
    { value: 'vue', labelKey: 'download.vue' },
];

const STYLE_OPTIONS: { value: StyleType; labelKey: string; frameworks: FrameworkType[] }[] = [
    { value: 'css', labelKey: 'download.css', frameworks: ['vanilla', 'react', 'vue'] },
    { value: 'scss', labelKey: 'download.scss', frameworks: ['vanilla', 'react', 'vue'] },
    { value: 'styled-components', labelKey: 'download.styledComponents', frameworks: ['react'] },
    { value: 'emotion', labelKey: 'download.emotion', frameworks: ['react'] },
    { value: 'tailwind', labelKey: 'download.tailwind', frameworks: ['vanilla', 'react', 'vue'] },
];

// Framework Icons as SVG
const HtmlIcon = () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
        <path fill="#E44D26" d="M6 2L8.5 28L16 30L23.5 28L26 2H6z"/>
        <path fill="#F16529" d="M16 4V28L22 26.5L24 4H16z"/>
        <path fill="#EBEBEB" d="M16 10H10L10.5 15H16V10zM16 20L12 19L11.75 16H9.5L10 22L16 24V20z"/>
        <path fill="#FFF" d="M16 10V15H21.5L21 20L16 21V24L22 22L22.5 16H16V15L22.5 15L23 10H16z"/>
    </svg>
);

const ReactIcon = () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
        <circle cx="16" cy="16" r="2.5" fill="#61DAFB"/>
        <ellipse cx="16" cy="16" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1"/>
        <ellipse cx="16" cy="16" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(60 16 16)"/>
        <ellipse cx="16" cy="16" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(120 16 16)"/>
    </svg>
);

const VueIcon = () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
        <path fill="#41B883" d="M2 4L16 28L30 4H24L16 18L8 4H2z"/>
        <path fill="#35495E" d="M8 4L16 18L24 4H20L16 11L12 4H8z"/>
    </svg>
);

const FrameworkIconComponent = ({ framework }: { framework: FrameworkType }) => {
    switch (framework) {
        case 'vanilla':
            return <HtmlIcon />;
        case 'react':
            return <ReactIcon />;
        case 'vue':
            return <VueIcon />;
        default:
            return null;
    }
};

export function DownloadModal({
    isOpen,
    onClose,
    elementsData,
    uploadedImage,
    backgroundImage,
}: DownloadModalProps) {
    const { t } = useTranslation();
    const [selectedFramework, setSelectedFramework] = useState<FrameworkType>('vanilla');
    const [selectedStyle, setSelectedStyle] = useState<StyleType>('css');
    const [isDownloading, setIsDownloading] = useState(false);

    const handleFrameworkChange = (framework: FrameworkType) => {
        setSelectedFramework(framework);
        // Reset style if not available for new framework
        const styleAvailable = STYLE_OPTIONS.find(
            (s) => s.value === selectedStyle && s.frameworks.includes(framework)
        );
        if (!styleAvailable) {
            setSelectedStyle('css');
        }
    };

    const handleDownload = async () => {
        if (isDownloading) return;
        setIsDownloading(true);

        try {
            const zip = new JSZip();
            const imageSrc = uploadedImage ? uploadedImage.toString() : backgroundImage;

            // Generate code files
            const generatedFiles = generateCode(
                elementsData,
                selectedFramework,
                selectedStyle,
                './promotionPage.jpeg'
            );

            // Add generated files to zip
            generatedFiles.forEach((file) => {
                zip.file(file.filename, file.content);
            });

            // Add image to zip
            const imageResponse = await fetch(imageSrc);
            const imageBlob = await imageResponse.blob();
            zip.file('promotionPage.jpeg', imageBlob, { binary: true });

            // Generate and download zip
            const content = await zip.generateAsync({ type: 'blob' });
            const frameworkName = selectedFramework === 'vanilla' ? 'html' : selectedFramework;
            saveAs(content, `promo-page-${frameworkName}-${selectedStyle}.zip`);

            setTimeout(() => {
                setIsDownloading(false);
                onClose();
            }, 2000);
        } catch (error) {
            console.error('Download failed:', error);
            setIsDownloading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <h2>{t('download.title')}</h2>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                </ModalHeader>

                <ModalBody>
                    <Section>
                        <SectionTitle>{t('download.selectFramework')}</SectionTitle>
                        <FrameworkGrid>
                            {FRAMEWORKS.map((framework) => (
                                <FrameworkButton
                                    key={framework.value}
                                    $isSelected={selectedFramework === framework.value}
                                    onClick={() => handleFrameworkChange(framework.value)}
                                >
                                    <FrameworkIconComponent framework={framework.value} />
                                    <span>{t(framework.labelKey)}</span>
                                </FrameworkButton>
                            ))}
                        </FrameworkGrid>
                    </Section>

                    <Section>
                        <SectionTitle>{t('download.selectStyle')}</SectionTitle>
                        <StyleGrid>
                            {STYLE_OPTIONS
                                .filter((style) => style.frameworks.includes(selectedFramework))
                                .map((style) => (
                                    <StyleButton
                                        key={style.value}
                                        $isSelected={selectedStyle === style.value}
                                        onClick={() => setSelectedStyle(style.value)}
                                    >
                                        {t(style.labelKey)}
                                    </StyleButton>
                                ))}
                        </StyleGrid>
                    </Section>

                    <InfoBox>
                        <InfoIcon>i</InfoIcon>
                        <InfoText>{t('download.info')}</InfoText>
                    </InfoBox>
                </ModalBody>

                <ModalFooter>
                    <CancelButton onClick={onClose}>{t('common.cancel')}</CancelButton>
                    <DownloadButtonWrapper
                        onClick={handleDownload}
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
                    </DownloadButtonWrapper>
                </ModalFooter>
            </ModalContent>
        </ModalOverlay>
    );
}

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.2s ease-out;

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const ModalContent = styled.div`
    background: var(--c-background-secondary);
    border-radius: 16px;
    width: 500px;
    max-width: 90%;
    animation: slideUp 0.3s ease-out;

    @keyframes slideUp {
        from {
            transform: translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;

const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--c-border);

    h2 {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--c-text-primary);
    }
`;

const CloseButton = styled.button`
    font-size: 1.5rem;
    color: var(--c-text-secondary);
    background: none;
    border: none;
    cursor: pointer;
    line-height: 1;
    padding: 0.25rem;
    transition: color 0.2s;

    &:hover {
        color: var(--c-text-primary);
    }
`;

const ModalBody = styled.div`
    padding: 1.5rem;
`;

const Section = styled.div`
    margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--c-text-secondary);
    margin-bottom: 0.75rem;
`;

const FrameworkGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
`;

const FrameworkButton = styled.button<{ $isSelected: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem 0.75rem;
    border-radius: 12px;
    border: 2px solid ${({ $isSelected }) => ($isSelected ? 'var(--c-primary)' : 'var(--c-border)')};
    background: ${({ $isSelected }) => ($isSelected ? 'var(--c-primary-soft)' : 'transparent')};
    color: ${({ $isSelected }) => ($isSelected ? 'var(--c-primary)' : 'var(--c-text-secondary)')};
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.85rem;
    font-weight: 500;

    &:hover {
        border-color: var(--c-primary);
        background: var(--c-primary-soft);
    }

    svg {
        flex-shrink: 0;
    }
`;

const StyleGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
`;

const StyleButton = styled.button<{ $isSelected: boolean }>`
    padding: 0.75rem 0.5rem;
    border-radius: 12px;
    border: 2px solid ${({ $isSelected }) => ($isSelected ? 'var(--c-primary)' : 'var(--c-border)')};
    background: ${({ $isSelected }) => ($isSelected ? 'var(--c-primary-soft)' : 'transparent')};
    color: ${({ $isSelected }) => ($isSelected ? 'var(--c-primary)' : 'var(--c-text-secondary)')};
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.85rem;
    font-weight: 500;

    &:hover {
        border-color: var(--c-primary);
        background: var(--c-primary-soft);
    }
`;

const InfoBox = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1rem;
    background: var(--c-background-tertiary);
    border-radius: 12px;
    margin-top: 0.5rem;
`;

const InfoIcon = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--c-primary);
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
    flex-shrink: 0;
`;

const InfoText = styled.p`
    font-size: 0.8rem;
    color: var(--c-text-secondary);
    line-height: 1.5;
`;

const ModalFooter = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    border-top: 1px solid var(--c-border);
`;

const CancelButton = styled.button`
    flex: 1;
    padding: 0.75rem 1rem;
    border-radius: 0;
    border: 1px solid var(--c-border);
    background: transparent;
    color: var(--c-text-secondary);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: var(--c-background-tertiary);
    }
`;

const DownloadButtonWrapper = styled.button<{ $isDownloading: boolean }>`
    flex: 1;
    position: relative;
    perspective: calc(1rem * 10);
    font-family: inherit;
    font-size: 0.9rem;
    font-weight: 600;
    color: white;
    background-color: transparent;
    border: none;
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
