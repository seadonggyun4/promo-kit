import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Highlight, themes } from 'prism-react-renderer';
import {
    FrameworkType,
    StyleType,
    ElementData,
    ResponsiveOptions,
    A11yOptions,
    SeoOptions,
    DEFAULT_RESPONSIVE_OPTIONS,
    DEFAULT_A11Y_OPTIONS,
    DEFAULT_SEO_OPTIONS,
} from '@/shared/types';
import { generateCode } from '../lib';

// Get language from filename extension
const getLanguageFromFilename = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase();
    const languageMap: Record<string, string> = {
        html: 'markup',
        htm: 'markup',
        css: 'css',
        scss: 'scss',
        js: 'javascript',
        jsx: 'jsx',
        ts: 'typescript',
        tsx: 'tsx',
        vue: 'markup',
    };
    return languageMap[ext || ''] || 'markup';
};

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
    { value: 'svelte', labelKey: 'download.svelte' },
    { value: 'angular', labelKey: 'download.angular' },
    { value: 'solid', labelKey: 'download.solid' },
    { value: 'preact', labelKey: 'download.preact' },
    { value: 'astro', labelKey: 'download.astro' },
    { value: 'qwik', labelKey: 'download.qwik' },
    { value: 'lit', labelKey: 'download.lit' },
];

const STYLE_OPTIONS: { value: StyleType; labelKey: string; frameworks: FrameworkType[] }[] = [
    { value: 'css', labelKey: 'download.css', frameworks: ['vanilla', 'react', 'vue', 'svelte', 'angular', 'solid', 'preact', 'astro', 'qwik', 'lit'] },
    { value: 'scss', labelKey: 'download.scss', frameworks: ['vanilla', 'react', 'vue', 'svelte', 'angular', 'solid', 'preact', 'astro', 'qwik', 'lit'] },
    { value: 'styled-components', labelKey: 'download.styledComponents', frameworks: ['react', 'preact'] },
    { value: 'emotion', labelKey: 'download.emotion', frameworks: ['react', 'preact', 'solid'] },
    { value: 'tailwind', labelKey: 'download.tailwind', frameworks: ['vanilla', 'react', 'vue', 'svelte', 'angular', 'solid', 'preact', 'astro', 'qwik', 'lit'] },
    { value: 'css-modules', labelKey: 'download.cssModules', frameworks: ['react', 'vue', 'svelte', 'solid', 'preact', 'astro', 'qwik'] },
    { value: 'unocss', labelKey: 'download.unocss', frameworks: ['vanilla', 'react', 'vue', 'svelte', 'solid', 'preact', 'astro', 'qwik', 'lit'] },
    { value: 'panda-css', labelKey: 'download.pandaCss', frameworks: ['react', 'solid', 'preact', 'qwik'] },
    { value: 'vanilla-extract', labelKey: 'download.vanillaExtract', frameworks: ['react', 'solid', 'preact', 'qwik'] },
    { value: 'stitches', labelKey: 'download.stitches', frameworks: ['react', 'preact'] },
    { value: 'less', labelKey: 'download.less', frameworks: ['vanilla', 'react', 'vue', 'angular', 'svelte', 'solid', 'preact', 'astro', 'qwik', 'lit'] },
    { value: 'stylus', labelKey: 'download.stylus', frameworks: ['vanilla', 'react', 'vue', 'svelte', 'solid', 'preact', 'astro'] },
    { value: 'bootstrap', labelKey: 'download.bootstrap', frameworks: ['vanilla', 'react', 'vue', 'angular', 'svelte', 'solid', 'preact', 'astro', 'lit'] },
    { value: 'bulma', labelKey: 'download.bulma', frameworks: ['vanilla', 'react', 'vue', 'svelte', 'solid', 'preact', 'astro', 'lit'] },
    { value: 'chakra-ui', labelKey: 'download.chakraUi', frameworks: ['react'] },
    { value: 'mui', labelKey: 'download.mui', frameworks: ['react'] },
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

const SvelteIcon = () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
        <path fill="#FF3E00" d="M25.5 6.5C23.2 3.2 18.7 2 15.1 4L8.4 8.4c-1.8 1.2-3 3-3.4 5.1-.3 1.7 0 3.5.8 5-.5.8-.8 1.7-1 2.7-.4 2.1.1 4.2 1.3 6C8.4 30.5 13 31.7 16.6 29.7l6.7-4.4c1.8-1.2 3-3 3.4-5.1.3-1.7 0-3.5-.8-5 .5-.8.8-1.7 1-2.7.4-2.1-.1-4.2-1.4-6z"/>
        <path fill="#fff" d="M13.7 26.4c-2.3.6-4.7-.4-5.8-2.4-.6-1-.8-2.2-.5-3.4l.2-.7.6.4c1 .7 2.1 1.1 3.3 1.3l.3.1v.3c0 .4.2.9.5 1.2.5.6 1.4.8 2.1.5l6.7-4.4c.4-.2.6-.6.7-1 .1-.4 0-.9-.3-1.2-.5-.6-1.4-.8-2.1-.5l-2.5 1.7c-1.8 1.2-4.3.9-5.7-.7-.7-.8-1-1.8-.9-2.9.2-1.1.8-2 1.7-2.6l6.7-4.4c1.8-1.2 4.3-.9 5.8.7.6 1 .8 2.2.5 3.4l-.2.7-.6-.4c-1-.7-2.1-1.1-3.3-1.3l-.3-.1v-.3c0-.4-.2-.9-.5-1.2-.5-.6-1.4-.8-2.1-.5l-6.7 4.4c-.4.2-.6.6-.7 1-.1.4 0 .9.3 1.2.5.6 1.4.8 2.1.5l2.5-1.7c1.8-1.2 4.3-.9 5.8.7.7.8 1 1.8.9 2.9-.2 1.1-.8 2-1.7 2.6l-6.7 4.4-.8.3z"/>
    </svg>
);

const AngularIcon = () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
        <path fill="#DD0031" d="M16 2L2 7l2.1 18.2L16 30l11.9-4.8L30 7L16 2z"/>
        <path fill="#C3002F" d="M16 2v28l11.9-4.8L30 7L16 2z"/>
        <path fill="#fff" d="M16 5.8L8.2 23h2.9l1.6-4h6.6l1.6 4h2.9L16 5.8zm2.2 11h-4.4L16 11.4l2.2 5.4z"/>
    </svg>
);

const SolidIcon = () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
        <path fill="#76B3E1" d="M5 10l11-6 11 6-11 6-11-6z"/>
        <path fill="#2C4F7C" d="M27 10v12l-11 6V16l11-6z"/>
        <path fill="#335D92" d="M5 10v12l11 6V16L5 10z"/>
    </svg>
);

const PreactIcon = () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
        <circle cx="16" cy="16" r="2.5" fill="#673AB8"/>
        <ellipse cx="16" cy="16" rx="10" ry="4" fill="none" stroke="#673AB8" strokeWidth="1"/>
        <ellipse cx="16" cy="16" rx="10" ry="4" fill="none" stroke="#673AB8" strokeWidth="1" transform="rotate(60 16 16)"/>
        <ellipse cx="16" cy="16" rx="10" ry="4" fill="none" stroke="#673AB8" strokeWidth="1" transform="rotate(120 16 16)"/>
    </svg>
);

const AstroIcon = () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
        <path fill="#FF5D01" d="M8 22c0-3 2-5.5 5-6-1.5 2-2 4-1.5 6.5.5-1 1.5-1.5 2.5-1.5 2.5 0 4 2 4 4.5 0 .5-.1 1-.2 1.5 3-1.5 5.2-4.5 5.2-8 0-5-4-9-9-9l-1.5 6L10 9c-3.5 4-4 9-2 13z"/>
        <path fill="#1D1F21" d="M12 26c-.5 1.5-.3 3 .5 4.2 1.5-.5 2.8-1.5 3.5-2.7-.5-.3-1-.5-1.5-.5-1 0-2 .5-2.5 1z"/>
    </svg>
);

const QwikIcon = () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
        <path fill="#18B6F6" d="M16 4L4 10v12l12 6 12-6V10L16 4z"/>
        <path fill="#fff" d="M16 8l-8 4v8l8 4 8-4v-8l-8-4zm0 2.5l5.5 2.75v5.5L16 21.5l-5.5-2.75v-5.5L16 10.5z"/>
        <path fill="#AC7EF4" d="M16 13v8l5.5-2.75v-5.5L16 13z"/>
    </svg>
);

const LitIcon = () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
        <path fill="#325CFF" d="M8 8l8-4 8 4v8l-8 12-8-12V8z"/>
        <path fill="#00E8FF" d="M16 4l8 4v8l-8 12V4z"/>
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
        case 'svelte':
            return <SvelteIcon />;
        case 'angular':
            return <AngularIcon />;
        case 'solid':
            return <SolidIcon />;
        case 'preact':
            return <PreactIcon />;
        case 'astro':
            return <AstroIcon />;
        case 'qwik':
            return <QwikIcon />;
        case 'lit':
            return <LitIcon />;
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
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    // New options state - enabled by default
    const [responsiveOptions, setResponsiveOptions] = useState<ResponsiveOptions>({
        ...DEFAULT_RESPONSIVE_OPTIONS,
        enabled: true,
    });
    const [a11yOptions, setA11yOptions] = useState<A11yOptions>({
        ...DEFAULT_A11Y_OPTIONS,
        enabled: true,
    });
    const [seoOptions, setSeoOptions] = useState<SeoOptions>({
        ...DEFAULT_SEO_OPTIONS,
        enabled: true,
    });

    // Expanded sections state
    const [expandedSections, setExpandedSections] = useState({
        responsive: true,
        a11y: true,
        seo: true,
    });

    const toggleSection = (section: 'responsive' | 'a11y' | 'seo') => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    // Generate code preview with options
    const generatedFiles = useMemo(() => {
        return generateCode(
            elementsData,
            selectedFramework,
            selectedStyle,
            './promotionPage.jpeg',
            {
                responsive: responsiveOptions,
                a11y: a11yOptions,
                seo: seoOptions,
            }
        );
    }, [elementsData, selectedFramework, selectedStyle, responsiveOptions, a11yOptions, seoOptions]);

    const handleCopyCode = async (content: string, index: number) => {
        try {
            await navigator.clipboard.writeText(content);
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

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

                    {/* Code Quality Options */}
                    <Section>
                        <SectionTitle>{t('download.codeQuality')}</SectionTitle>

                        {/* Responsive Option */}
                        <OptionCard>
                            <OptionHeader onClick={() => toggleSection('responsive')}>
                                <OptionToggle>
                                    <ToggleSwitch
                                        $isOn={responsiveOptions.enabled}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setResponsiveOptions(prev => ({ ...prev, enabled: !prev.enabled }));
                                        }}
                                    >
                                        <ToggleThumb $isOn={responsiveOptions.enabled} />
                                    </ToggleSwitch>
                                    <OptionLabel>{t('download.responsive')}</OptionLabel>
                                </OptionToggle>
                                <ExpandIcon $expanded={expandedSections.responsive}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </ExpandIcon>
                            </OptionHeader>
                            {expandedSections.responsive && (
                                <OptionDetails $disabled={!responsiveOptions.enabled}>
                                    <OptionDescription>{t('download.responsiveDesc')}</OptionDescription>
                                    <BreakpointInputs>
                                        <BreakpointInput>
                                            <label>{t('download.mobileBreakpoint')}</label>
                                            <input
                                                type="number"
                                                value={responsiveOptions.breakpoints.mobile}
                                                onChange={(e) => setResponsiveOptions(prev => ({
                                                    ...prev,
                                                    breakpoints: { ...prev.breakpoints, mobile: parseInt(e.target.value) || 480 }
                                                }))}
                                            />
                                            <span>px</span>
                                        </BreakpointInput>
                                        <BreakpointInput>
                                            <label>{t('download.tabletBreakpoint')}</label>
                                            <input
                                                type="number"
                                                value={responsiveOptions.breakpoints.tablet}
                                                onChange={(e) => setResponsiveOptions(prev => ({
                                                    ...prev,
                                                    breakpoints: { ...prev.breakpoints, tablet: parseInt(e.target.value) || 768 }
                                                }))}
                                            />
                                            <span>px</span>
                                        </BreakpointInput>
                                    </BreakpointInputs>
                                </OptionDetails>
                            )}
                        </OptionCard>

                        {/* Accessibility Option */}
                        <OptionCard>
                            <OptionHeader onClick={() => toggleSection('a11y')}>
                                <OptionToggle>
                                    <ToggleSwitch
                                        $isOn={a11yOptions.enabled}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setA11yOptions(prev => ({ ...prev, enabled: !prev.enabled }));
                                        }}
                                    >
                                        <ToggleThumb $isOn={a11yOptions.enabled} />
                                    </ToggleSwitch>
                                    <OptionLabel>{t('download.a11y')}</OptionLabel>
                                </OptionToggle>
                                <ExpandIcon $expanded={expandedSections.a11y}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </ExpandIcon>
                            </OptionHeader>
                            {expandedSections.a11y && (
                                <OptionDetails $disabled={!a11yOptions.enabled}>
                                    <OptionDescription>{t('download.a11yDesc')}</OptionDescription>
                                    <CheckboxGroup>
                                        <CheckboxItem>
                                            <input
                                                type="checkbox"
                                                checked={a11yOptions.includeAriaLabels}
                                                onChange={(e) => setA11yOptions(prev => ({
                                                    ...prev,
                                                    includeAriaLabels: e.target.checked
                                                }))}
                                            />
                                            <span>{t('download.ariaLabels')}</span>
                                        </CheckboxItem>
                                        <CheckboxItem>
                                            <input
                                                type="checkbox"
                                                checked={a11yOptions.includeFocusStyles}
                                                onChange={(e) => setA11yOptions(prev => ({
                                                    ...prev,
                                                    includeFocusStyles: e.target.checked
                                                }))}
                                            />
                                            <span>{t('download.focusStyles')}</span>
                                        </CheckboxItem>
                                        <CheckboxItem>
                                            <input
                                                type="checkbox"
                                                checked={a11yOptions.useSemanticButtons}
                                                onChange={(e) => setA11yOptions(prev => ({
                                                    ...prev,
                                                    useSemanticButtons: e.target.checked
                                                }))}
                                            />
                                            <span>{t('download.semanticButtons')}</span>
                                        </CheckboxItem>
                                        <CheckboxItem>
                                            <input
                                                type="checkbox"
                                                checked={a11yOptions.includeRoles}
                                                onChange={(e) => setA11yOptions(prev => ({
                                                    ...prev,
                                                    includeRoles: e.target.checked
                                                }))}
                                            />
                                            <span>{t('download.roles')}</span>
                                        </CheckboxItem>
                                        <CheckboxItem>
                                            <input
                                                type="checkbox"
                                                checked={a11yOptions.includeAriaDescribedby}
                                                onChange={(e) => setA11yOptions(prev => ({
                                                    ...prev,
                                                    includeAriaDescribedby: e.target.checked
                                                }))}
                                            />
                                            <span>{t('download.ariaDescribedby')}</span>
                                        </CheckboxItem>
                                    </CheckboxGroup>
                                </OptionDetails>
                            )}
                        </OptionCard>

                        {/* SEO Option (only for vanilla HTML) */}
                        {selectedFramework === 'vanilla' && (
                            <OptionCard>
                                <OptionHeader onClick={() => toggleSection('seo')}>
                                    <OptionToggle>
                                        <ToggleSwitch
                                            $isOn={seoOptions.enabled}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSeoOptions(prev => ({ ...prev, enabled: !prev.enabled }));
                                            }}
                                        >
                                            <ToggleThumb $isOn={seoOptions.enabled} />
                                        </ToggleSwitch>
                                        <OptionLabel>{t('download.seo')}</OptionLabel>
                                    </OptionToggle>
                                    <ExpandIcon $expanded={expandedSections.seo}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    </ExpandIcon>
                                </OptionHeader>
                                {expandedSections.seo && (
                                    <OptionDetails $disabled={!seoOptions.enabled}>
                                        <OptionDescription>{t('download.seoDesc')}</OptionDescription>
                                        <SeoInputs>
                                            <SeoInputGroup>
                                                <label>{t('download.seoTitle')}</label>
                                                <input
                                                    type="text"
                                                    value={seoOptions.title}
                                                    onChange={(e) => setSeoOptions(prev => ({
                                                        ...prev,
                                                        title: e.target.value
                                                    }))}
                                                    placeholder="Promotion Page"
                                                />
                                            </SeoInputGroup>
                                            <SeoInputGroup>
                                                <label>{t('download.seoDescription')}</label>
                                                <textarea
                                                    value={seoOptions.description}
                                                    onChange={(e) => setSeoOptions(prev => ({
                                                        ...prev,
                                                        description: e.target.value
                                                    }))}
                                                    placeholder={t('download.seoDescriptionPlaceholder')}
                                                    rows={2}
                                                />
                                            </SeoInputGroup>
                                            <SeoInputGroup>
                                                <label>{t('download.ogImage')}</label>
                                                <input
                                                    type="text"
                                                    value={seoOptions.ogImage}
                                                    onChange={(e) => setSeoOptions(prev => ({
                                                        ...prev,
                                                        ogImage: e.target.value
                                                    }))}
                                                    placeholder="https://example.com/og-image.jpg"
                                                />
                                            </SeoInputGroup>
                                            <SeoInputGroup>
                                                <label>{t('download.canonical')}</label>
                                                <input
                                                    type="text"
                                                    value={seoOptions.canonical}
                                                    onChange={(e) => setSeoOptions(prev => ({
                                                        ...prev,
                                                        canonical: e.target.value
                                                    }))}
                                                    placeholder="https://example.com/promo"
                                                />
                                            </SeoInputGroup>
                                        </SeoInputs>
                                    </OptionDetails>
                                )}
                            </OptionCard>
                        )}
                    </Section>

                    <InfoBox>
                        <InfoIcon>i</InfoIcon>
                        <InfoText>{t('download.info')}</InfoText>
                    </InfoBox>

                    <Section>
                        <CodePreviewContainer>
                            {generatedFiles.map((file, index) => (
                                <CodeBlock key={file.filename}>
                                    <CodeHeader>
                                        <FileName>{file.filename}</FileName>
                                        <CopyButton
                                            onClick={() => handleCopyCode(file.content, index)}
                                            $copied={copiedIndex === index}
                                        >
                                            {copiedIndex === index ? (
                                                <>
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                        <polyline points="20 6 9 17 4 12" />
                                                    </svg>
                                                    <span>{t('download.copied')}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                                    </svg>
                                                    <span>{t('download.copyCode')}</span>
                                                </>
                                            )}
                                        </CopyButton>
                                    </CodeHeader>
                                    <Highlight
                                        theme={themes.vsDark}
                                        code={file.content}
                                        language={getLanguageFromFilename(file.filename)}
                                    >
                                        {({ style, tokens, getLineProps, getTokenProps }) => (
                                            <CodeContent style={style}>
                                                {tokens.map((line, i) => (
                                                    <div key={i} {...getLineProps({ line })}>
                                                        {line.map((token, key) => (
                                                            <span key={key} {...getTokenProps({ token })} />
                                                        ))}
                                                    </div>
                                                ))}
                                            </CodeContent>
                                        )}
                                    </Highlight>
                                </CodeBlock>
                            ))}
                        </CodePreviewContainer>
                    </Section>
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
    width: 700px;
    max-width: 90%;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
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
    overflow-y: auto;
    flex: 1;

    /* Custom scrollbar */
    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: var(--c-primary-soft);
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(102, 126, 234, 0.4);
        border-radius: 4px;

        &:hover {
            background: rgba(102, 126, 234, 0.6);
        }
    }

    scrollbar-width: thin;
    scrollbar-color: rgba(102, 126, 234, 0.4) var(--c-primary-soft);
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
    grid-template-columns: repeat(5, 1fr);
    gap: 0.5rem;
`;

const FrameworkButton = styled.button<{ $isSelected: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.375rem;
    padding: 0.625rem 0.375rem;
    border-radius: 10px;
    border: 2px solid ${({ $isSelected }) => ($isSelected ? 'var(--c-primary)' : 'var(--c-border)')};
    background: ${({ $isSelected }) => ($isSelected ? 'var(--c-primary-soft)' : 'transparent')};
    color: ${({ $isSelected }) => ($isSelected ? 'var(--c-primary)' : 'var(--c-text-secondary)')};
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.7rem;
    font-weight: 500;

    &:hover {
        border-color: var(--c-primary);
        background: var(--c-primary-soft);
    }

    svg {
        flex-shrink: 0;
        width: 22px;
        height: 22px;
    }
`;

const StyleGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
`;

const StyleButton = styled.button<{ $isSelected: boolean }>`
    padding: 0.5rem 0.375rem;
    border-radius: 8px;
    border: 2px solid ${({ $isSelected }) => ($isSelected ? 'var(--c-primary)' : 'var(--c-border)')};
    background: ${({ $isSelected }) => ($isSelected ? 'var(--c-primary-soft)' : 'transparent')};
    color: ${({ $isSelected }) => ($isSelected ? 'var(--c-primary)' : 'var(--c-text-secondary)')};
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.75rem;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
        border-color: var(--c-primary);
        background: var(--c-primary-soft);
    }
`;

// New Option Styles
const OptionCard = styled.div`
    background: var(--c-background-tertiary);
    border-radius: 12px;
    margin-bottom: 0.75rem;
    overflow: hidden;
`;

const OptionHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.875rem 1rem;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
        background: rgba(102, 126, 234, 0.05);
    }
`;

const OptionToggle = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
`;

const ToggleSwitch = styled.div<{ $isOn: boolean }>`
    width: 44px;
    height: 24px;
    background: ${({ $isOn }) => ($isOn ? 'var(--c-primary)' : 'rgba(128, 128, 128, 0.4)')};
    border-radius: 12px;
    padding: 2px;
    cursor: pointer;
    transition: background 0.2s;
    flex-shrink: 0;
`;

const ToggleThumb = styled.div<{ $isOn: boolean }>`
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    transition: transform 0.2s;
    transform: translateX(${({ $isOn }) => ($isOn ? '20px' : '0')});
`;

const OptionLabel = styled.span`
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--c-text-primary);
`;

const ExpandIcon = styled.div<{ $expanded: boolean }>`
    color: var(--c-text-secondary);
    transition: transform 0.2s;
    transform: rotate(${({ $expanded }) => ($expanded ? '180deg' : '0')});
`;

const OptionDetails = styled.div<{ $disabled?: boolean }>`
    padding: 0 1rem 1rem;
    border-top: 1px solid var(--c-border);
    opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
    pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
    transition: opacity 0.2s;
`;

const OptionDescription = styled.p`
    font-size: 0.8rem;
    color: var(--c-text-secondary);
    margin: 0.75rem 0;
    line-height: 1.5;
`;

const BreakpointInputs = styled.div`
    display: flex;
    gap: 1rem;
`;

const BreakpointInput = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    label {
        font-size: 0.8rem;
        color: var(--c-text-secondary);
    }

    input {
        width: 70px;
        padding: 0.375rem 0.5rem;
        border: 1px solid var(--c-border);
        border-radius: 6px;
        background: var(--c-background-secondary);
        color: var(--c-text-primary);
        font-size: 0.8rem;

        &:focus {
            outline: none;
            border-color: var(--c-primary);
        }
    }

    span {
        font-size: 0.8rem;
        color: var(--c-text-secondary);
    }
`;

const CheckboxGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const CheckboxItem = styled.label`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;

    input {
        width: 16px;
        height: 16px;
        accent-color: var(--c-primary);
    }

    span {
        font-size: 0.85rem;
        color: var(--c-text-primary);
    }
`;

const SeoInputs = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const SeoInputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    label {
        font-size: 0.8rem;
        color: var(--c-text-secondary);
    }

    input, textarea {
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--c-border);
        border-radius: 8px;
        background: var(--c-background-secondary);
        color: var(--c-text-primary);
        font-size: 0.85rem;
        font-family: inherit;

        &:focus {
            outline: none;
            border-color: var(--c-primary);
        }

        &::placeholder {
            color: var(--c-text-secondary);
            opacity: 0.6;
        }
    }

    textarea {
        resize: vertical;
        min-height: 60px;
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

const CodePreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const CodeBlock = styled.div`
    background: var(--c-background-tertiary);
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--c-border);
`;

const CodeHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    background: var(--c-background-secondary);
    border-bottom: 1px solid var(--c-border);
`;

const FileName = styled.span`
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--c-text-secondary);
    font-family: 'Fira Code', 'Consolas', monospace;
`;

const CopyButton = styled.button<{ $copied: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
    font-weight: 500;
    color: ${({ $copied }) => ($copied ? 'var(--c-accent-success)' : 'var(--c-text-secondary)')};
    background: ${({ $copied }) => ($copied ? 'var(--c-accent-success-soft)' : 'transparent')};
    border: 1px solid ${({ $copied }) => ($copied ? 'var(--c-accent-success)' : 'var(--c-border)')};
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        color: ${({ $copied }) => ($copied ? 'var(--c-accent-success)' : 'var(--c-primary)')};
        border-color: ${({ $copied }) => ($copied ? 'var(--c-accent-success)' : 'var(--c-primary)')};
        background: ${({ $copied }) => ($copied ? 'var(--c-accent-success-soft)' : 'var(--c-primary-soft)')};
    }

    svg {
        flex-shrink: 0;
    }
`;

const CodeContent = styled.pre`
    padding: 1rem;
    margin: 0;
    font-size: 0.75rem;
    font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
    line-height: 1.6;
    overflow: auto;
    max-height: 250px;
    border-radius: 0 0 12px 12px;

    & > div {
        white-space: pre;
    }

    /* Custom scrollbar */
    &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    &::-webkit-scrollbar-track {
        background: var(--c-primary-soft);
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background: var(--c-primary-light, rgba(102, 126, 234, 0.4));
        border-radius: 4px;

        &:hover {
            background: var(--c-primary-light, rgba(102, 126, 234, 0.6));
        }
    }

    scrollbar-width: thin;
    scrollbar-color: rgba(102, 126, 234, 0.4) var(--c-primary-soft);
`;
