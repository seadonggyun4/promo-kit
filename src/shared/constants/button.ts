import { SimpleBtnStyleData, GradationBtnStyleData, ButtonStyleDataLegacy } from '../types';

export const SIMPLE_BTN: SimpleBtnStyleData = {
    buttonText: '심플 버튼',
    buttonLink: '',
    textColor: '#ffffff',
    backgroundColor: '#434ce8',
    borderRadius: '5',
    borderWidth: '0',
    borderColor: '#000000',
    shadowOffsetX: '0',
    shadowOffsetY: '0',
    shadowBlurRadius: '0',
    shadowColor: '#000000',
};

export const GRADATION_BTN: GradationBtnStyleData = {
    buttonText: '그라데이션 버튼',
    buttonLink: '',
    textColor: '#ffffff',
    gradationColor1: '#03a9f4',
    gradationColor2: '#434ce8',
    gradationColor3: '#404089',
    gradationColor4: '#03a9f4',
    borderRadius: '20',
    borderWidth: '0',
    borderColor: '#000000',
    shadowOffsetX: '0',
    shadowOffsetY: '0',
    shadowBlurRadius: '0',
    shadowColor: '#000000',
};

export const BTN_STYLE: Record<string, ButtonStyleDataLegacy> = {
    SimpleBtn: SIMPLE_BTN,
    GradationBtn: GRADATION_BTN,
};

export const FORM_MENU = ['텍스트 & 링크', '색상', '테두리', '그림자'];
