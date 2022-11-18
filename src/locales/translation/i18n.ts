import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "../en/translation.json";
import translationVI from "../vi/translation.json";

// the translations
const resources = {
  vi: {
    translation: translationVI,
  },
  en: {
    translation: translationEN,
  },
};

i18n.use(Backend).use(initReactI18next).use(LanguageDetector).init({
  resources,
  fallbackLng: "vi",
  debug: true,
});

export default i18n;
