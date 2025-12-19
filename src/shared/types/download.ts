// Framework types
export type FrameworkType =
    | 'vanilla'
    | 'react'
    | 'vue'
    | 'svelte'
    | 'angular'
    | 'solid'
    | 'preact'
    | 'astro'
    | 'qwik'
    | 'lit';

// Style types
export type StyleType =
    | 'css'
    | 'scss'
    | 'styled-components'
    | 'emotion'
    | 'tailwind'
    | 'css-modules'
    | 'unocss'
    | 'panda-css'
    | 'vanilla-extract'
    | 'stitches'
    | 'less'
    | 'stylus'
    | 'bootstrap'
    | 'bulma'
    | 'chakra-ui'
    | 'mui';

// Responsive breakpoint types
export type ResponsiveBreakpoint = 'mobile' | 'tablet' | 'desktop';

// Responsive options
export interface ResponsiveOptions {
    enabled: boolean;
    breakpoints: {
        mobile: number;   // max-width for mobile (default: 480)
        tablet: number;   // max-width for tablet (default: 768)
    };
}

// Accessibility options
export interface A11yOptions {
    enabled: boolean;
    includeAriaLabels: boolean;
    includeFocusStyles: boolean;
    useSemanticButtons: boolean; // Use <button> instead of <a> where appropriate
    includeRoles: boolean; // Include role attributes (banner, main, navigation)
    includeAriaDescribedby: boolean; // Include aria-describedby for button descriptions
}

// SEO options (for vanilla HTML only)
export interface SeoOptions {
    enabled: boolean;
    title: string;
    description: string;
    ogImage: string;
    canonical: string;
}

// Code generation options
export interface CodeGenerationOptions {
    framework: FrameworkType;
    styleType: StyleType;
    responsive: ResponsiveOptions;
    a11y: A11yOptions;
    seo: SeoOptions;
}

// Download options
export interface DownloadOptions {
    framework: FrameworkType;
    styleType: StyleType;
}

// Framework option for UI
export interface FrameworkOption {
    value: FrameworkType;
    label: string;
    icon: string;
}

// Style option for UI
export interface StyleOption {
    value: StyleType;
    label: string;
    supportedFrameworks: FrameworkType[];
}

// Default options
export const DEFAULT_RESPONSIVE_OPTIONS: ResponsiveOptions = {
    enabled: false,
    breakpoints: {
        mobile: 480,
        tablet: 768,
    },
};

export const DEFAULT_A11Y_OPTIONS: A11yOptions = {
    enabled: false,
    includeAriaLabels: true,
    includeFocusStyles: true,
    useSemanticButtons: false,
    includeRoles: true,
    includeAriaDescribedby: true,
};

export const DEFAULT_SEO_OPTIONS: SeoOptions = {
    enabled: false,
    title: 'Promotion Page',
    description: '',
    ogImage: '',
    canonical: '',
};
