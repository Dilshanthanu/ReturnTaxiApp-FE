import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import English from "../../assets/locals/english.json";
import Sinhala from "../../assets/locals/sinhala.json";

const resources = {
  en: {
    translation: English,
  },
  si: {
    translation: Sinhala,
  },
  ta: {
    translation: {
      network_error: "இணைய இணைப்பு இழந்துவிட்டது",
      welcome: "வரவேற்கிறோம்",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: Localization.getLocales()[0]?.languageCode ?? "en",
  fallbackLng: "en",
  compatibilityJSON: "v4",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
