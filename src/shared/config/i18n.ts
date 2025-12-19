import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ko from '../../../docs/locales/ko.json';
import en from '../../../docs/locales/en.json';
import ja from '../../../docs/locales/ja.json';

const resources = {
    ko: { translation: ko },
    en: { translation: en },
    ja: { translation: ja },
};

const savedLanguage = localStorage.getItem('language') || 'ko';

i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
