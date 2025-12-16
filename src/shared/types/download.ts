// Framework types
export type FrameworkType = 'vanilla' | 'react' | 'vue';

// Style types
export type StyleType = 'css' | 'scss' | 'styled-components' | 'emotion' | 'tailwind';

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
