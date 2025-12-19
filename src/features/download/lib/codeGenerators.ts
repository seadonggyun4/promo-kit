import {
    ElementData,
    FrameworkType,
    StyleType,
    ResponsiveOptions,
    A11yOptions,
    SeoOptions,
    DEFAULT_RESPONSIVE_OPTIONS,
    DEFAULT_A11Y_OPTIONS,
    DEFAULT_SEO_OPTIONS,
} from '@/shared/types';

interface GeneratedCode {
    filename: string;
    content: string;
}

interface GenerateOptions {
    responsive?: ResponsiveOptions;
    a11y?: A11yOptions;
    seo?: SeoOptions;
}

// Helper to check if button is gradient type
const isGradientButton = (style: string): boolean => {
    return ['GradationBtn', 'SunsetBtn', 'OceanBtn', 'ForestBtn', 'PurpleHazeBtn', 'FireBtn', 'AuroraBtn', 'MidnightBtn', 'RoseGoldBtn', 'CyberBtn'].includes(style);
};

// Generate focus styles for accessibility
const generateFocusStyles = (includeFocusStyles: boolean): string => {
    if (!includeFocusStyles) return '';
    return `
    &:focus {
        outline: 2px solid #4A90D9;
        outline-offset: 2px;
    }

    &:focus:not(:focus-visible) {
        outline: none;
    }

    &:focus-visible {
        outline: 2px solid #4A90D9;
        outline-offset: 2px;
    }`;
};

// Generate focus styles for CSS (non-SCSS)
const generateFocusStylesCSS = (selector: string, includeFocusStyles: boolean): string => {
    if (!includeFocusStyles) return '';
    return `
${selector}:focus {
    outline: 2px solid #4A90D9;
    outline-offset: 2px;
}

${selector}:focus:not(:focus-visible) {
    outline: none;
}

${selector}:focus-visible {
    outline: 2px solid #4A90D9;
    outline-offset: 2px;
}`;
};

// Generate responsive media queries
const generateResponsiveCSS = (
    element: ElementData,
    index: number,
    responsive: ResponsiveOptions
): string => {
    if (!responsive.enabled) return '';

    const { styleData } = element;
    const baseWidth = styleData.width || 200;
    const baseHeight = styleData.height || 50;

    return `
/* Tablet */
@media (max-width: ${responsive.breakpoints.tablet}px) {
    .button-${index} {
        width: ${Math.round(baseWidth * 0.85)}px;
        height: ${Math.round(baseHeight * 0.9)}px;
        font-size: 0.9em;
    }
}

/* Mobile */
@media (max-width: ${responsive.breakpoints.mobile}px) {
    .button-${index} {
        width: ${Math.round(baseWidth * 0.7)}px;
        height: ${Math.round(baseHeight * 0.8)}px;
        font-size: 0.8em;
    }
}`;
};

// Generate SEO meta tags for HTML
const generateSeoMetaTags = (seo: SeoOptions): string => {
    if (!seo.enabled) {
        return `<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Promotion Page</title>`;
    }

    let metaTags = `<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Primary Meta Tags -->
    <title>${seo.title}</title>
    <meta name="title" content="${seo.title}">`;

    if (seo.description) {
        metaTags += `
    <meta name="description" content="${seo.description}">`;
    }

    metaTags += `
    <meta name="robots" content="index, follow">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="${seo.title}">`;

    if (seo.description) {
        metaTags += `
    <meta property="og:description" content="${seo.description}">`;
    }

    if (seo.ogImage) {
        metaTags += `
    <meta property="og:image" content="${seo.ogImage}">`;
    }

    if (seo.canonical) {
        metaTags += `
    <meta property="og:url" content="${seo.canonical}">`;
    }

    metaTags += `

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${seo.title}">`;

    if (seo.description) {
        metaTags += `
    <meta name="twitter:description" content="${seo.description}">`;
    }

    if (seo.ogImage) {
        metaTags += `
    <meta name="twitter:image" content="${seo.ogImage}">`;
    }

    if (seo.canonical) {
        metaTags += `

    <!-- Canonical URL -->
    <link rel="canonical" href="${seo.canonical}">`;
    }

    return metaTags;
};

// Generate aria attributes for accessibility
const generateAriaAttributes = (element: ElementData, index: number, a11y: A11yOptions): string => {
    if (!a11y.enabled) return '';

    let attrs = '';

    if (a11y.includeAriaLabels) {
        const buttonText = element.styleData.buttonText || 'Button';
        attrs += ` aria-label="${buttonText}"`;
    }

    if (a11y.includeAriaDescribedby) {
        attrs += ` aria-describedby="btn-desc-${index}"`;
    }

    return attrs;
};

// Generate hidden description elements for aria-describedby
const generateAriaDescriptions = (elements: ElementData[], a11y: A11yOptions): string => {
    if (!a11y.enabled || !a11y.includeAriaDescribedby) return '';

    return elements.map((element, index) => {
        const buttonText = element.styleData.buttonText || 'Button';
        const link = element.styleData.buttonLink || '#';
        return `    <span id="btn-desc-${index}" class="sr-only">${buttonText} - ${link} 링크로 이동합니다</span>`;
    }).join('\n');
};

// Generate role attributes for landmark regions
const generateRoleAttributes = (a11y: A11yOptions, role: 'main' | 'banner' | 'navigation' | 'group'): string => {
    if (!a11y.enabled || !a11y.includeRoles) return '';
    return ` role="${role}"`;
};

// Generate screen reader only CSS class
const generateSrOnlyCSS = (): string => {
    return `
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}`;
};

// Generate CSS styles for a button
const generateButtonCSS = (
    element: ElementData,
    index: number,
    options: GenerateOptions = {}
): string => {
    const { styleData, x, y } = element;
    const isGradient = isGradientButton(element.style);
    const a11y = options.a11y || DEFAULT_A11Y_OPTIONS;
    const responsive = options.responsive || DEFAULT_RESPONSIVE_OPTIONS;

    const baseStyles = `
.button-${index} {
    position: absolute;
    top: ${y}%;
    left: ${x}%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: ${styleData.width || 200}px;
    height: ${styleData.height || 50}px;
    color: ${styleData.textColor};
    ${isGradient
        ? `background: linear-gradient(135deg, ${styleData.gradationColor1}, ${styleData.gradationColor2}, ${styleData.gradationColor3}, ${styleData.gradationColor4});`
        : `background-color: ${styleData.backgroundColor};`
    }
    border-radius: ${styleData.borderRadius}px;
    border: ${styleData.borderWidth}px solid ${styleData.borderColor};
    box-shadow: ${styleData.shadowOffsetX}px ${styleData.shadowOffsetY}px ${styleData.shadowBlurRadius}px ${styleData.shadowColor};
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s ease;
}

.button-${index}:hover {
    transform: scale(1.02);
}`;

    const focusStyles = generateFocusStylesCSS(`.button-${index}`, a11y.enabled && a11y.includeFocusStyles);
    const responsiveStyles = generateResponsiveCSS(element, index, responsive);

    return baseStyles + focusStyles + responsiveStyles;
};

// Generate SCSS styles
const generateButtonSCSS = (
    element: ElementData,
    index: number,
    options: GenerateOptions = {}
): string => {
    const { styleData, x, y } = element;
    const isGradient = isGradientButton(element.style);
    const a11y = options.a11y || DEFAULT_A11Y_OPTIONS;
    const responsive = options.responsive || DEFAULT_RESPONSIVE_OPTIONS;

    const focusStyles = generateFocusStyles(a11y.enabled && a11y.includeFocusStyles);

    let responsiveStyles = '';
    if (responsive.enabled) {
        const baseWidth = styleData.width || 200;
        const baseHeight = styleData.height || 50;

        responsiveStyles = `

    // Tablet
    @media (max-width: ${responsive.breakpoints.tablet}px) {
        width: ${Math.round(baseWidth * 0.85)}px;
        height: ${Math.round(baseHeight * 0.9)}px;
        font-size: 0.9em;
    }

    // Mobile
    @media (max-width: ${responsive.breakpoints.mobile}px) {
        width: ${Math.round(baseWidth * 0.7)}px;
        height: ${Math.round(baseHeight * 0.8)}px;
        font-size: 0.8em;
    }`;
    }

    return `
.button-${index} {
    position: absolute;
    top: ${y}%;
    left: ${x}%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: ${styleData.width || 200}px;
    height: ${styleData.height || 50}px;
    color: ${styleData.textColor};
    ${isGradient
        ? `background: linear-gradient(135deg, ${styleData.gradationColor1}, ${styleData.gradationColor2}, ${styleData.gradationColor3}, ${styleData.gradationColor4});`
        : `background-color: ${styleData.backgroundColor};`
    }
    border-radius: ${styleData.borderRadius}px;
    border: ${styleData.borderWidth}px solid ${styleData.borderColor};
    box-shadow: ${styleData.shadowOffsetX}px ${styleData.shadowOffsetY}px ${styleData.shadowBlurRadius}px ${styleData.shadowColor};
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.02);
    }${focusStyles}${responsiveStyles}
}`;
};

// Generate Tailwind classes
const generateTailwindClasses = (a11y: A11yOptions): string => {
    const baseClasses = 'absolute inline-flex items-center justify-center font-semibold cursor-pointer transition-transform hover:scale-[1.02] no-underline';
    const focusClasses = a11y.enabled && a11y.includeFocusStyles
        ? ' focus:outline-2 focus:outline-blue-500 focus:outline-offset-2 focus-visible:outline-2 focus-visible:outline-blue-500'
        : '';

    return baseClasses + focusClasses;
};

// Generate inline styles for Tailwind (values that can't be expressed in Tailwind)
const generateTailwindInlineStyles = (element: ElementData): string => {
    const { styleData, x, y } = element;
    const isGradient = isGradientButton(element.style);

    const styles = {
        top: `${y}%`,
        left: `${x}%`,
        width: `${styleData.width || 200}px`,
        height: `${styleData.height || 50}px`,
        color: styleData.textColor,
        ...(isGradient
            ? { background: `linear-gradient(135deg, ${styleData.gradationColor1}, ${styleData.gradationColor2}, ${styleData.gradationColor3}, ${styleData.gradationColor4})` }
            : { backgroundColor: styleData.backgroundColor }
        ),
        borderRadius: `${styleData.borderRadius}px`,
        border: `${styleData.borderWidth}px solid ${styleData.borderColor}`,
        boxShadow: `${styleData.shadowOffsetX}px ${styleData.shadowOffsetY}px ${styleData.shadowBlurRadius}px ${styleData.shadowColor}`,
    };

    return JSON.stringify(styles);
};

// Generate responsive container CSS
const generateResponsiveContainerCSS = (responsive: ResponsiveOptions): string => {
    if (!responsive.enabled) return '';

    return `

/* Responsive Container */
@media (max-width: ${responsive.breakpoints.tablet}px) {
    .promo-container {
        max-width: 100%;
    }
}

@media (max-width: ${responsive.breakpoints.mobile}px) {
    .promo-container {
        max-width: 100%;
    }

    .buttons-container {
        /* Buttons scale with container */
    }
}`;
};

// Vanilla HTML Generator
export const generateVanillaHTML = (
    elements: ElementData[],
    styleType: StyleType,
    imageSrc: string,
    options: GenerateOptions = {}
): GeneratedCode[] => {
    const files: GeneratedCode[] = [];
    const a11y = options.a11y || DEFAULT_A11Y_OPTIONS;
    const seo = options.seo || DEFAULT_SEO_OPTIONS;
    const responsive = options.responsive || DEFAULT_RESPONSIVE_OPTIONS;

    // Generate styles
    let stylesContent = '';
    const styleExtension = styleType === 'scss' ? 'scss' : 'css';

    elements.forEach((element, index) => {
        if (styleType === 'scss') {
            stylesContent += generateButtonSCSS(element, index, options);
        } else if (styleType === 'tailwind') {
            // Tailwind uses inline styles mostly
        } else {
            stylesContent += generateButtonCSS(element, index, options);
        }
    });

    // Container styles
    const srOnlyStyles = a11y.enabled && a11y.includeAriaDescribedby ? generateSrOnlyCSS() : '';

    const containerStyles = `
.promo-container {
    position: relative;
    width: 100%;
    max-width: 100%;
}

.promo-image {
    width: 100%;
    height: auto;
    display: block;
}

.buttons-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}${srOnlyStyles}`;

    const responsiveContainerStyles = generateResponsiveContainerCSS(responsive);

    if (styleType !== 'tailwind') {
        files.push({
            filename: `styles.${styleExtension}`,
            content: containerStyles + responsiveContainerStyles + stylesContent,
        });
    }

    // Generate HTML
    const buttonsHTML = elements.map((element, index) => {
        const ariaAttrs = generateAriaAttributes(element, index, a11y);
        const buttonTag = a11y.enabled && a11y.useSemanticButtons ? 'button' : 'a';
        const linkAttr = buttonTag === 'a'
            ? `href="${element.styleData.buttonLink}" target="_blank" rel="noopener noreferrer"`
            : `onclick="window.open('${element.styleData.buttonLink}', '_blank')"`;

        if (styleType === 'tailwind') {
            const classes = generateTailwindClasses(a11y);
            const inlineStyles = generateTailwindInlineStyles(element);
            return `    <${buttonTag} ${linkAttr} class="${classes}" style='${inlineStyles.replace(/"/g, "'")}'${ariaAttrs}>${element.styleData.buttonText}</${buttonTag}>`;
        }
        return `    <${buttonTag} ${linkAttr} class="button-${index}"${ariaAttrs}>${element.styleData.buttonText}</${buttonTag}>`;
    }).join('\n');

    // Generate aria-describedby descriptions
    const ariaDescriptions = generateAriaDescriptions(elements, a11y);

    // Generate image alt text
    const imageAlt = a11y.enabled && a11y.includeAriaLabels
        ? 'Promotion page banner image'
        : 'Promotion';

    // Generate role attributes
    const mainRole = generateRoleAttributes(a11y, 'main');
    const groupRole = generateRoleAttributes(a11y, 'group');
    const groupAriaLabel = a11y.enabled ? ' aria-label="프로모션 버튼 영역"' : '';

    const seoMetaTags = generateSeoMetaTags(seo);

    // Tailwind sr-only class for screen reader only content
    const tailwindSrOnlyStyle = styleType === 'tailwind' && a11y.enabled && a11y.includeAriaDescribedby
        ? `
    <style>
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
    </style>`
        : '';

    const htmlContent = `<!DOCTYPE html>
<html lang="ko">
<head>
    ${seoMetaTags}
    ${styleType === 'tailwind'
        ? '<script src="https://cdn.tailwindcss.com"></script>' + tailwindSrOnlyStyle
        : `<link rel="stylesheet" href="styles.${styleExtension}">`
    }
</head>
<body>
    <main class="promo-container"${styleType === 'tailwind' ? ' style="position: relative; width: 100%; max-width: 100%;"' : ''}${mainRole}>
        <img src="${imageSrc}" alt="${imageAlt}" class="promo-image"${styleType === 'tailwind' ? ' style="width: 100%; height: auto; display: block;"' : ''} />
        <div class="buttons-container"${styleType === 'tailwind' ? ' style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"' : ''}${groupRole}${groupAriaLabel}>
${buttonsHTML}
        </div>
${ariaDescriptions ? ariaDescriptions + '\n' : ''}    </main>
</body>
</html>`;

    files.push({
        filename: 'index.html',
        content: htmlContent,
    });

    return files;
};

// React Generator
export const generateReactCode = (
    elements: ElementData[],
    styleType: StyleType,
    _imageSrc: string,
    options: GenerateOptions = {}
): GeneratedCode[] => {
    const files: GeneratedCode[] = [];
    const a11y = options.a11y || DEFAULT_A11Y_OPTIONS;
    const responsive = options.responsive || DEFAULT_RESPONSIVE_OPTIONS;

    // Generate aria props helper
    const getAriaProps = (element: ElementData, index: number): string => {
        if (!a11y.enabled) return '';
        let props = '';
        if (a11y.includeAriaLabels) {
            props += `aria-label="${element.styleData.buttonText || 'Button'}"`;
        }
        if (a11y.includeAriaDescribedby) {
            props += `${props ? ' ' : ''}aria-describedby="btn-desc-${index}"`;
        }
        return props;
    };

    // Generate aria descriptions for React
    const generateReactAriaDescriptions = (): string => {
        if (!a11y.enabled || !a11y.includeAriaDescribedby) return '';
        return elements.map((element, index) => {
            const buttonText = element.styleData.buttonText || 'Button';
            const link = element.styleData.buttonLink || '#';
            return `            <span id="btn-desc-${index}" className="sr-only">${buttonText} - ${link} 링크로 이동합니다</span>`;
        }).join('\n');
    };

    // Generate role attributes
    const mainRole = a11y.enabled && a11y.includeRoles ? ' role="main"' : '';
    const groupRole = a11y.enabled && a11y.includeRoles ? ' role="group"' : '';
    const groupAriaLabel = a11y.enabled ? ' aria-label="프로모션 버튼 영역"' : '';

    if (styleType === 'styled-components') {
        const focusStylesBlock = a11y.enabled && a11y.includeFocusStyles ? `

    &:focus {
        outline: 2px solid #4A90D9;
        outline-offset: 2px;
    }

    &:focus:not(:focus-visible) {
        outline: none;
    }

    &:focus-visible {
        outline: 2px solid #4A90D9;
        outline-offset: 2px;
    }` : '';

        const buttonsCode = elements.map((element, index) => {
            const { styleData, x, y } = element;
            const isGradient = isGradientButton(element.style);
            const baseWidth = styleData.width || 200;
            const baseHeight = styleData.height || 50;

            let responsiveStyles = '';
            if (responsive.enabled) {
                responsiveStyles = `

    // Tablet
    @media (max-width: ${responsive.breakpoints.tablet}px) {
        width: ${Math.round(baseWidth * 0.85)}px;
        height: ${Math.round(baseHeight * 0.9)}px;
        font-size: 0.9em;
    }

    // Mobile
    @media (max-width: ${responsive.breakpoints.mobile}px) {
        width: ${Math.round(baseWidth * 0.7)}px;
        height: ${Math.round(baseHeight * 0.8)}px;
        font-size: 0.8em;
    }`;
            }

            const TagType = a11y.enabled && a11y.useSemanticButtons ? 'button' : 'a';

            return `const Button${index} = styled.${TagType}\`
    position: absolute;
    top: ${y}%;
    left: ${x}%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: ${baseWidth}px;
    height: ${baseHeight}px;
    color: ${styleData.textColor};
    ${isGradient
        ? `background: linear-gradient(135deg, ${styleData.gradationColor1}, ${styleData.gradationColor2}, ${styleData.gradationColor3}, ${styleData.gradationColor4});`
        : `background-color: ${styleData.backgroundColor};`
    }
    border-radius: ${styleData.borderRadius}px;
    border: ${styleData.borderWidth}px solid ${styleData.borderColor};
    box-shadow: ${styleData.shadowOffsetX}px ${styleData.shadowOffsetY}px ${styleData.shadowBlurRadius}px ${styleData.shadowColor};
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.02);
    }${focusStylesBlock}${responsiveStyles}
\`;`;
        }).join('\n\n');

        const buttonElements = elements.map((element, index) => {
            const ariaProps = getAriaProps(element, index);
            if (a11y.enabled && a11y.useSemanticButtons) {
                return `            <Button${index} onClick={() => window.open('${element.styleData.buttonLink}', '_blank')} ${ariaProps}>${element.styleData.buttonText}</Button${index}>`;
            }
            return `            <Button${index} href="${element.styleData.buttonLink}" target="_blank" rel="noopener noreferrer" ${ariaProps}>${element.styleData.buttonText}</Button${index}>`;
        }).join('\n');

        const ariaDescriptions = generateReactAriaDescriptions();

        const imageAlt = a11y.enabled && a11y.includeAriaLabels
            ? 'Promotion page banner image'
            : 'Promotion';

        const srOnlyStyle = a11y.enabled && a11y.includeAriaDescribedby ? `

const SrOnly = styled.span\`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
\`;` : '';

        const componentContent = `import styled from 'styled-components';
import promoImage from './promotionPage.jpeg';

${buttonsCode}

const Container = styled.main\`
    position: relative;
    width: 100%;
    max-width: 100%;
\`;

const PromoImage = styled.img\`
    width: 100%;
    height: auto;
    display: block;
\`;

const ButtonsContainer = styled.div\`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
\`;${srOnlyStyle}

export function PromoPage() {
    return (
        <Container${mainRole}>
            <PromoImage src={promoImage} alt="${imageAlt}" />
            <ButtonsContainer${groupRole}${groupAriaLabel}>
${buttonElements}
            </ButtonsContainer>
${ariaDescriptions ? ariaDescriptions.replace(/className="sr-only"/g, '') + '\n' : ''}        </Container>
    );
}
`;

        files.push({
            filename: 'PromoPage.tsx',
            content: componentContent,
        });

    } else if (styleType === 'emotion') {
        const focusStylesBlock = a11y.enabled && a11y.includeFocusStyles ? `

    &:focus {
        outline: 2px solid #4A90D9;
        outline-offset: 2px;
    }

    &:focus:not(:focus-visible) {
        outline: none;
    }

    &:focus-visible {
        outline: 2px solid #4A90D9;
        outline-offset: 2px;
    }` : '';

        const buttonsCode = elements.map((element, index) => {
            const { styleData, x, y } = element;
            const isGradient = isGradientButton(element.style);
            const baseWidth = styleData.width || 200;
            const baseHeight = styleData.height || 50;

            let responsiveStyles = '';
            if (responsive.enabled) {
                responsiveStyles = `

    // Tablet
    @media (max-width: ${responsive.breakpoints.tablet}px) {
        width: ${Math.round(baseWidth * 0.85)}px;
        height: ${Math.round(baseHeight * 0.9)}px;
        font-size: 0.9em;
    }

    // Mobile
    @media (max-width: ${responsive.breakpoints.mobile}px) {
        width: ${Math.round(baseWidth * 0.7)}px;
        height: ${Math.round(baseHeight * 0.8)}px;
        font-size: 0.8em;
    }`;
            }

            return `const button${index}Style = css\`
    position: absolute;
    top: ${y}%;
    left: ${x}%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: ${baseWidth}px;
    height: ${baseHeight}px;
    color: ${styleData.textColor};
    ${isGradient
        ? `background: linear-gradient(135deg, ${styleData.gradationColor1}, ${styleData.gradationColor2}, ${styleData.gradationColor3}, ${styleData.gradationColor4});`
        : `background-color: ${styleData.backgroundColor};`
    }
    border-radius: ${styleData.borderRadius}px;
    border: ${styleData.borderWidth}px solid ${styleData.borderColor};
    box-shadow: ${styleData.shadowOffsetX}px ${styleData.shadowOffsetY}px ${styleData.shadowBlurRadius}px ${styleData.shadowColor};
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.02);
    }${focusStylesBlock}${responsiveStyles}
\`;`;
        }).join('\n\n');

        const buttonElements = elements.map((element, index) => {
            const ariaProps = getAriaProps(element, index);
            if (a11y.enabled && a11y.useSemanticButtons) {
                return `            <button onClick={() => window.open('${element.styleData.buttonLink}', '_blank')} css={button${index}Style} ${ariaProps}>${element.styleData.buttonText}</button>`;
            }
            return `            <a href="${element.styleData.buttonLink}" target="_blank" rel="noopener noreferrer" css={button${index}Style} ${ariaProps}>${element.styleData.buttonText}</a>`;
        }).join('\n');

        const ariaDescriptions = generateReactAriaDescriptions();

        const imageAlt = a11y.enabled && a11y.includeAriaLabels
            ? 'Promotion page banner image'
            : 'Promotion';

        const srOnlyStyle = a11y.enabled && a11y.includeAriaDescribedby ? `

const srOnlyStyle = css\`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
\`;` : '';

        const componentContent = `/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import promoImage from './promotionPage.jpeg';

${buttonsCode}

const containerStyle = css\`
    position: relative;
    width: 100%;
    max-width: 100%;
\`;

const imageStyle = css\`
    width: 100%;
    height: auto;
    display: block;
\`;

const buttonsContainerStyle = css\`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
\`;${srOnlyStyle}

export function PromoPage() {
    return (
        <main css={containerStyle}${mainRole}>
            <img src={promoImage} alt="${imageAlt}" css={imageStyle} />
            <div css={buttonsContainerStyle}${groupRole}${groupAriaLabel}>
${buttonElements}
            </div>
${ariaDescriptions ? ariaDescriptions.replace(/className="sr-only"/g, 'css={srOnlyStyle}') + '\n' : ''}        </main>
    );
}
`;

        files.push({
            filename: 'PromoPage.tsx',
            content: componentContent,
        });

    } else if (styleType === 'tailwind') {
        const buttonElements = elements.map((element, index) => {
            const { styleData, x, y } = element;
            const isGradient = isGradientButton(element.style);

            const style = {
                top: `${y}%`,
                left: `${x}%`,
                width: `${styleData.width || 200}px`,
                height: `${styleData.height || 50}px`,
                color: styleData.textColor,
                ...(isGradient
                    ? { background: `linear-gradient(135deg, ${styleData.gradationColor1}, ${styleData.gradationColor2}, ${styleData.gradationColor3}, ${styleData.gradationColor4})` }
                    : { backgroundColor: styleData.backgroundColor }
                ),
                borderRadius: `${styleData.borderRadius}px`,
                border: `${styleData.borderWidth}px solid ${styleData.borderColor}`,
                boxShadow: `${styleData.shadowOffsetX}px ${styleData.shadowOffsetY}px ${styleData.shadowBlurRadius}px ${styleData.shadowColor}`,
            };

            const focusClasses = a11y.enabled && a11y.includeFocusStyles
                ? ' focus:outline-2 focus:outline-blue-500 focus:outline-offset-2'
                : '';
            const ariaProps = getAriaProps(element, index);

            if (a11y.enabled && a11y.useSemanticButtons) {
                return `            <button
                onClick={() => window.open('${element.styleData.buttonLink}', '_blank')}
                className="absolute inline-flex items-center justify-center font-semibold cursor-pointer transition-transform hover:scale-[1.02]${focusClasses}"
                style={${JSON.stringify(style)}}
                ${ariaProps}
            >
                ${element.styleData.buttonText}
            </button>`;
            }

            return `            <a
                href="${element.styleData.buttonLink}"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inline-flex items-center justify-center font-semibold cursor-pointer transition-transform hover:scale-[1.02] no-underline${focusClasses}"
                style={${JSON.stringify(style)}}
                ${ariaProps}
            >
                ${element.styleData.buttonText}
            </a>`;
        }).join('\n');

        const ariaDescriptions = generateReactAriaDescriptions();

        const imageAlt = a11y.enabled && a11y.includeAriaLabels
            ? 'Promotion page banner image'
            : 'Promotion';

        const responsiveClasses = responsive.enabled
            ? 'relative w-full max-w-full md:max-w-4xl lg:max-w-6xl mx-auto'
            : 'relative w-full max-w-full';

        const componentContent = `import promoImage from './promotionPage.jpeg';

export function PromoPage() {
    return (
        <main className="${responsiveClasses}"${mainRole}>
            <img src={promoImage} alt="${imageAlt}" className="w-full h-auto block" />
            <div className="absolute top-0 left-0 w-full h-full"${groupRole}${groupAriaLabel}>
${buttonElements}
            </div>
${ariaDescriptions ? ariaDescriptions.replace(/className="sr-only"/g, 'className="sr-only absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0"') + '\n' : ''}        </main>
    );
}
`;

        files.push({
            filename: 'PromoPage.tsx',
            content: componentContent,
        });

    } else {
        // CSS or SCSS
        const styleExtension = styleType === 'scss' ? 'scss' : 'css';
        const srOnlyStyles = a11y.enabled && a11y.includeAriaDescribedby ? generateSrOnlyCSS() : '';

        let stylesContent = `
.promo-container {
    position: relative;
    width: 100%;
    max-width: 100%;
}

.promo-image {
    width: 100%;
    height: auto;
    display: block;
}

.buttons-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}${srOnlyStyles}`;

        const responsiveContainerStyles = generateResponsiveContainerCSS(responsive);
        stylesContent += responsiveContainerStyles;

        elements.forEach((element, index) => {
            if (styleType === 'scss') {
                stylesContent += generateButtonSCSS(element, index, options);
            } else {
                stylesContent += generateButtonCSS(element, index, options);
            }
        });

        files.push({
            filename: `PromoPage.${styleExtension}`,
            content: stylesContent,
        });

        const buttonElements = elements.map((element, index) => {
            const ariaProps = getAriaProps(element, index);
            if (a11y.enabled && a11y.useSemanticButtons) {
                return `            <button onClick={() => window.open('${element.styleData.buttonLink}', '_blank')} className="button-${index}" ${ariaProps}>${element.styleData.buttonText}</button>`;
            }
            return `            <a href="${element.styleData.buttonLink}" target="_blank" rel="noopener noreferrer" className="button-${index}" ${ariaProps}>${element.styleData.buttonText}</a>`;
        }).join('\n');

        const ariaDescriptions = generateReactAriaDescriptions();

        const imageAlt = a11y.enabled && a11y.includeAriaLabels
            ? 'Promotion page banner image'
            : 'Promotion';

        const componentContent = `import './PromoPage.${styleExtension}';
import promoImage from './promotionPage.jpeg';

export function PromoPage() {
    return (
        <main className="promo-container"${mainRole}>
            <img src={promoImage} alt="${imageAlt}" className="promo-image" />
            <div className="buttons-container"${groupRole}${groupAriaLabel}>
${buttonElements}
            </div>
${ariaDescriptions ? ariaDescriptions + '\n' : ''}        </main>
    );
}
`;

        files.push({
            filename: 'PromoPage.tsx',
            content: componentContent,
        });
    }

    return files;
};

// Vue Generator
export const generateVueCode = (
    elements: ElementData[],
    styleType: StyleType,
    _imageSrc: string,
    options: GenerateOptions = {}
): GeneratedCode[] => {
    const files: GeneratedCode[] = [];
    const a11y = options.a11y || DEFAULT_A11Y_OPTIONS;
    const responsive = options.responsive || DEFAULT_RESPONSIVE_OPTIONS;

    const getAriaAttrs = (element: ElementData, index: number): string => {
        if (!a11y.enabled) return '';
        let attrs = '';
        if (a11y.includeAriaLabels) {
            attrs += ` aria-label="${element.styleData.buttonText || 'Button'}"`;
        }
        if (a11y.includeAriaDescribedby) {
            attrs += ` aria-describedby="btn-desc-${index}"`;
        }
        return attrs;
    };

    // Generate role attributes
    const mainRole = a11y.enabled && a11y.includeRoles ? ' role="main"' : '';
    const groupRole = a11y.enabled && a11y.includeRoles ? ' role="group"' : '';
    const groupAriaLabel = a11y.enabled ? ' aria-label="프로모션 버튼 영역"' : '';

    // Generate aria descriptions for Vue
    const generateVueAriaDescriptions = (): string => {
        if (!a11y.enabled || !a11y.includeAriaDescribedby) return '';
        return elements.map((element, index) => {
            const buttonText = element.styleData.buttonText || 'Button';
            const link = element.styleData.buttonLink || '#';
            return `        <span id="btn-desc-${index}" class="sr-only">${buttonText} - ${link} 링크로 이동합니다</span>`;
        }).join('\n');
    };

    const buttonElements = elements.map((element, index) => {
        const ariaAttrs = getAriaAttrs(element, index);

        if (styleType === 'tailwind') {
            const { styleData, x, y } = element;
            const isGradient = isGradientButton(element.style);

            const styleObj = [
                `top: '${y}%'`,
                `left: '${x}%'`,
                `width: '${styleData.width || 200}px'`,
                `height: '${styleData.height || 50}px'`,
                `color: '${styleData.textColor}'`,
                isGradient
                    ? `background: 'linear-gradient(135deg, ${styleData.gradationColor1}, ${styleData.gradationColor2}, ${styleData.gradationColor3}, ${styleData.gradationColor4})'`
                    : `backgroundColor: '${styleData.backgroundColor}'`,
                `borderRadius: '${styleData.borderRadius}px'`,
                `border: '${styleData.borderWidth}px solid ${styleData.borderColor}'`,
                `boxShadow: '${styleData.shadowOffsetX}px ${styleData.shadowOffsetY}px ${styleData.shadowBlurRadius}px ${styleData.shadowColor}'`,
            ].join(', ');

            const focusClasses = a11y.enabled && a11y.includeFocusStyles
                ? ' focus:outline-2 focus:outline-blue-500 focus:outline-offset-2'
                : '';

            if (a11y.enabled && a11y.useSemanticButtons) {
                return `        <button
            @click="openLink('${element.styleData.buttonLink}')"
            class="absolute inline-flex items-center justify-center font-semibold cursor-pointer transition-transform hover:scale-[1.02]${focusClasses}"
            :style="{ ${styleObj} }"${ariaAttrs}
        >
            ${element.styleData.buttonText}
        </button>`;
            }

            return `        <a
            href="${element.styleData.buttonLink}"
            target="_blank"
            rel="noopener noreferrer"
            class="absolute inline-flex items-center justify-center font-semibold cursor-pointer transition-transform hover:scale-[1.02] no-underline${focusClasses}"
            :style="{ ${styleObj} }"${ariaAttrs}
        >
            ${element.styleData.buttonText}
        </a>`;
        }

        if (a11y.enabled && a11y.useSemanticButtons) {
            return `        <button @click="openLink('${element.styleData.buttonLink}')" class="button-${index}"${ariaAttrs}>${element.styleData.buttonText}</button>`;
        }
        return `        <a href="${element.styleData.buttonLink}" target="_blank" rel="noopener noreferrer" class="button-${index}"${ariaAttrs}>${element.styleData.buttonText}</a>`;
    }).join('\n');

    const srOnlyStyles = a11y.enabled && a11y.includeAriaDescribedby ? generateSrOnlyCSS() : '';

    let stylesContent = '';
    if (styleType !== 'tailwind') {
        stylesContent = `
.promo-container {
    position: relative;
    width: 100%;
    max-width: 100%;
}

.promo-image {
    width: 100%;
    height: auto;
    display: block;
}

.buttons-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}${srOnlyStyles}`;

        const responsiveContainerStyles = generateResponsiveContainerCSS(responsive);
        stylesContent += responsiveContainerStyles;

        elements.forEach((element, index) => {
            if (styleType === 'scss') {
                stylesContent += generateButtonSCSS(element, index, options);
            } else {
                stylesContent += generateButtonCSS(element, index, options);
            }
        });
    }

    const ariaDescriptions = generateVueAriaDescriptions();

    const imageAlt = a11y.enabled && a11y.includeAriaLabels
        ? 'Promotion page banner image'
        : 'Promotion';

    const tailwindSrOnlyClass = styleType === 'tailwind' && a11y.enabled && a11y.includeAriaDescribedby
        ? `
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}`
        : '';

    const styleTag = styleType === 'tailwind'
        ? (tailwindSrOnlyClass ? `

<style scoped>
${tailwindSrOnlyClass}
</style>` : '')
        : `

<style${styleType === 'scss' ? ' lang="scss"' : ''} scoped>
${stylesContent}
</style>`;

    const responsiveClasses = responsive.enabled && styleType === 'tailwind'
        ? 'relative w-full max-w-full md:max-w-4xl lg:max-w-6xl mx-auto'
        : styleType === 'tailwind' ? 'relative w-full max-w-full' : 'promo-container';

    const needsScript = a11y.enabled && a11y.useSemanticButtons;
    const scriptContent = needsScript ? `
const openLink = (url: string) => {
    window.open(url, '_blank');
};
` : '';

    const componentContent = `<template>
    <main class="${responsiveClasses}"${mainRole}>
        <img :src="promoImage" alt="${imageAlt}" class="${styleType === 'tailwind' ? 'w-full h-auto block' : 'promo-image'}" />
        <div class="${styleType === 'tailwind' ? 'absolute top-0 left-0 w-full h-full' : 'buttons-container'}"${groupRole}${groupAriaLabel}>
${buttonElements}
        </div>
${ariaDescriptions ? ariaDescriptions + '\n' : ''}    </main>
</template>

<script setup lang="ts">
import promoImage from './promotionPage.jpeg';
${scriptContent}</script>${styleTag}
`;

    files.push({
        filename: 'PromoPage.vue',
        content: componentContent,
    });

    return files;
};

// Main generator function
export const generateCode = (
    elements: ElementData[],
    framework: FrameworkType,
    styleType: StyleType,
    imageSrc: string,
    options: GenerateOptions = {}
): GeneratedCode[] => {
    switch (framework) {
        case 'vanilla':
            return generateVanillaHTML(elements, styleType, imageSrc, options);
        case 'react':
            return generateReactCode(elements, styleType, imageSrc, options);
        case 'vue':
            return generateVueCode(elements, styleType, imageSrc, options);
        default:
            return generateVanillaHTML(elements, styleType, imageSrc, options);
    }
};
