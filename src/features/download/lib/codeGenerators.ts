import { ElementData, FrameworkType, StyleType } from '@/shared/types';

interface GeneratedCode {
    filename: string;
    content: string;
}

// Helper to check if button is gradient type
const isGradientButton = (style: string): boolean => {
    return ['GradationBtn', 'SunsetBtn', 'OceanBtn', 'ForestBtn', 'PurpleHazeBtn', 'FireBtn', 'AuroraBtn', 'MidnightBtn', 'RoseGoldBtn', 'CyberBtn'].includes(style);
};

// Generate CSS styles for a button
const generateButtonCSS = (element: ElementData, index: number): string => {
    const { styleData, x, y } = element;
    const isGradient = isGradientButton(element.style);

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

    return baseStyles;
};

// Generate SCSS styles
const generateButtonSCSS = (element: ElementData, index: number): string => {
    const { styleData, x, y } = element;
    const isGradient = isGradientButton(element.style);

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
    }
}`;
};

// Generate Tailwind classes
const generateTailwindClasses = (): string => {
    // Note: Tailwind can't handle all custom values, so we use inline styles for specific values
    const baseClasses = 'absolute inline-flex items-center justify-center font-semibold cursor-pointer transition-transform hover:scale-[1.02]';

    return baseClasses;
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

// Vanilla HTML Generator
export const generateVanillaHTML = (
    elements: ElementData[],
    styleType: StyleType,
    imageSrc: string
): GeneratedCode[] => {
    const files: GeneratedCode[] = [];

    // Generate styles
    let stylesContent = '';
    const styleExtension = styleType === 'scss' ? 'scss' : 'css';

    elements.forEach((element, index) => {
        if (styleType === 'scss') {
            stylesContent += generateButtonSCSS(element, index);
        } else if (styleType === 'tailwind') {
            // Tailwind uses inline styles mostly
        } else {
            stylesContent += generateButtonCSS(element, index);
        }
    });

    // Container styles
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
}`;

    if (styleType !== 'tailwind') {
        files.push({
            filename: `styles.${styleExtension}`,
            content: containerStyles + stylesContent,
        });
    }

    // Generate HTML
    const buttonsHTML = elements.map((element, index) => {
        if (styleType === 'tailwind') {
            const classes = generateTailwindClasses();
            const inlineStyles = generateTailwindInlineStyles(element);
            return `    <a href="${element.styleData.buttonLink}" target="_blank" class="${classes}" style='${inlineStyles.replace(/"/g, "'")}'>${element.styleData.buttonText}</a>`;
        }
        return `    <a href="${element.styleData.buttonLink}" target="_blank" class="button-${index}">${element.styleData.buttonText}</a>`;
    }).join('\n');

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Promotion Page</title>
    ${styleType === 'tailwind'
        ? '<script src="https://cdn.tailwindcss.com"></script>'
        : `<link rel="stylesheet" href="styles.${styleExtension}">`
    }
</head>
<body>
    <div class="promo-container"${styleType === 'tailwind' ? ' style="position: relative; width: 100%; max-width: 100%;"' : ''}>
        <img src="${imageSrc}" alt="Promotion" class="promo-image"${styleType === 'tailwind' ? ' style="width: 100%; height: auto; display: block;"' : ''} />
        <div class="buttons-container"${styleType === 'tailwind' ? ' style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"' : ''}>
${buttonsHTML}
        </div>
    </div>
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
    _imageSrc: string
): GeneratedCode[] => {
    const files: GeneratedCode[] = [];

    if (styleType === 'styled-components') {
        const buttonsCode = elements.map((element, index) => {
            const { styleData, x, y } = element;
            const isGradient = isGradientButton(element.style);

            return `const Button${index} = styled.a\`
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
    }
\`;`;
        }).join('\n\n');

        const buttonElements = elements.map((element, index) =>
            `            <Button${index} href="${element.styleData.buttonLink}" target="_blank">${element.styleData.buttonText}</Button${index}>`
        ).join('\n');

        const componentContent = `import styled from 'styled-components';
import promoImage from './promotionPage.jpeg';

${buttonsCode}

const Container = styled.div\`
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
\`;

export function PromoPage() {
    return (
        <Container>
            <PromoImage src={promoImage} alt="Promotion" />
            <ButtonsContainer>
${buttonElements}
            </ButtonsContainer>
        </Container>
    );
}
`;

        files.push({
            filename: 'PromoPage.tsx',
            content: componentContent,
        });

    } else if (styleType === 'emotion') {
        const buttonsCode = elements.map((element, index) => {
            const { styleData, x, y } = element;
            const isGradient = isGradientButton(element.style);

            return `const button${index}Style = css\`
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
    }
\`;`;
        }).join('\n\n');

        const buttonElements = elements.map((element, index) =>
            `            <a href="${element.styleData.buttonLink}" target="_blank" css={button${index}Style}>${element.styleData.buttonText}</a>`
        ).join('\n');

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
\`;

export function PromoPage() {
    return (
        <div css={containerStyle}>
            <img src={promoImage} alt="Promotion" css={imageStyle} />
            <div css={buttonsContainerStyle}>
${buttonElements}
            </div>
        </div>
    );
}
`;

        files.push({
            filename: 'PromoPage.tsx',
            content: componentContent,
        });

    } else if (styleType === 'tailwind') {
        const buttonElements = elements.map((element) => {
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

            return `            <a
                href="${element.styleData.buttonLink}"
                target="_blank"
                className="absolute inline-flex items-center justify-center font-semibold cursor-pointer transition-transform hover:scale-[1.02] no-underline"
                style={${JSON.stringify(style)}}
            >
                ${element.styleData.buttonText}
            </a>`;
        }).join('\n');

        const componentContent = `import promoImage from './promotionPage.jpeg';

export function PromoPage() {
    return (
        <div className="relative w-full max-w-full">
            <img src={promoImage} alt="Promotion" className="w-full h-auto block" />
            <div className="absolute top-0 left-0 w-full h-full">
${buttonElements}
            </div>
        </div>
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
}`;

        elements.forEach((element, index) => {
            if (styleType === 'scss') {
                stylesContent += generateButtonSCSS(element, index);
            } else {
                stylesContent += generateButtonCSS(element, index);
            }
        });

        files.push({
            filename: `PromoPage.${styleExtension}`,
            content: stylesContent,
        });

        const buttonElements = elements.map((element, index) =>
            `            <a href="${element.styleData.buttonLink}" target="_blank" className="button-${index}">${element.styleData.buttonText}</a>`
        ).join('\n');

        const componentContent = `import './PromoPage.${styleExtension}';
import promoImage from './promotionPage.jpeg';

export function PromoPage() {
    return (
        <div className="promo-container">
            <img src={promoImage} alt="Promotion" className="promo-image" />
            <div className="buttons-container">
${buttonElements}
            </div>
        </div>
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
    _imageSrc: string
): GeneratedCode[] => {
    const files: GeneratedCode[] = [];

    const buttonElements = elements.map((element, index) => {
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

            return `        <a
            href="${element.styleData.buttonLink}"
            target="_blank"
            class="absolute inline-flex items-center justify-center font-semibold cursor-pointer transition-transform hover:scale-[1.02] no-underline"
            :style="{ ${styleObj} }"
        >
            ${element.styleData.buttonText}
        </a>`;
        }
        return `        <a href="${element.styleData.buttonLink}" target="_blank" class="button-${index}">${element.styleData.buttonText}</a>`;
    }).join('\n');

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
}`;

        elements.forEach((element, index) => {
            if (styleType === 'scss') {
                stylesContent += generateButtonSCSS(element, index);
            } else {
                stylesContent += generateButtonCSS(element, index);
            }
        });
    }

    const styleTag = styleType === 'tailwind'
        ? ''
        : `

<style${styleType === 'scss' ? ' lang="scss"' : ''} scoped>
${stylesContent}
</style>`;

    const componentContent = `<template>
    <div class="${styleType === 'tailwind' ? 'relative w-full max-w-full' : 'promo-container'}">
        <img :src="promoImage" alt="Promotion" class="${styleType === 'tailwind' ? 'w-full h-auto block' : 'promo-image'}" />
        <div class="${styleType === 'tailwind' ? 'absolute top-0 left-0 w-full h-full' : 'buttons-container'}">
${buttonElements}
        </div>
    </div>
</template>

<script setup lang="ts">
import promoImage from './promotionPage.jpeg';
</script>${styleTag}
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
    imageSrc: string
): GeneratedCode[] => {
    switch (framework) {
        case 'vanilla':
            return generateVanillaHTML(elements, styleType, imageSrc);
        case 'react':
            return generateReactCode(elements, styleType, imageSrc);
        case 'vue':
            return generateVueCode(elements, styleType, imageSrc);
        default:
            return generateVanillaHTML(elements, styleType, imageSrc);
    }
};
