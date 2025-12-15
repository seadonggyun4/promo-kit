/// <reference types="vite/client" />

declare namespace JSX {
    interface IntrinsicElements {
        'seo-toast': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
            position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
        }, HTMLElement>;
    }
}
