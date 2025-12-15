export const MENU = ['페이지 이미지 업로드', '버튼'] as const;

export type MainMenuType = typeof MENU[number];

export const ELEMENT_MENU = {
    button: ['수정', '삭제'],
} as const;
