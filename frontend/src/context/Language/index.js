import { createContext } from 'react';
import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

export const LanguageContext = createContext();

export function LanguageProvider(props) {
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(LanguageDetector)
    .use(HttpApi)
    .init({
      // the translations
      // (tip move them in a JSON file and import them,
      // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
      supportedLngs: ['eng', 'fr', 'it'],
      lng: document.querySelector('html').lang, // if you're using a language detector, do not define the lng option
      fallbackLng: 'en',
      detection: {
        order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
        cache: ['cookie']
      },
      backend: {
        loadPath: '/assets/locales/{{lng}}/translation.json'
      },
      react: { useSuspense: false }
    });

  const { t } = useTranslation();

  return (
    <LanguageProvider.Provider value={{ t }}>
      {props.children}
    </LanguageProvider.Provider>
  );
}
