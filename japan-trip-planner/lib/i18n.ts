import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import en from "@/locales/en/translation.json"
import zh from "@/locales/zh/translation.json"

// Detect saved language preference (client-side only)
const getSavedLanguage = (): string => {
  if (typeof window === "undefined") return "en" // SSR: use fixed default
  return localStorage.getItem("i18nextLng") || "en"
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    zh: { translation: zh },
  },
  lng: getSavedLanguage(), // Fixed initial language — avoids hydration mismatch
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
