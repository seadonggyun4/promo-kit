export const MENU = ['imageUpload', 'buttonStyle'] as const;

export type MainMenuType = typeof MENU[number];

export const ELEMENT_MENU = {
    button: ['edit', 'delete'],
} as const;
