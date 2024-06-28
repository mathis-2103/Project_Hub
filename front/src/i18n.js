import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from "react-i18next";
import enTranslation from "./locales/en/tranlation.json"
import frTranslation from "./locales/fr/tranlation.json"

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: {
        translation: frTranslation,
      },
      en: {
        translation: enTranslation,
      },
    },
    fallbackLng: 'fr',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  }).then(r => (console.log('init languages')));
export default i18n;
