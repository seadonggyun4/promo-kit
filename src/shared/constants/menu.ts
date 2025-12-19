export const MENU = ['imageUpload', 'buttonStyle', 'textStyle', 'imageOverlayStyle'] as const;

export type MainMenuType = typeof MENU[number];

export const ELEMENT_MENU = {
    button: ['edit', 'delete'],
    text: ['edit', 'delete'],
    'image-overlay': ['edit', 'delete'],
} as const;
