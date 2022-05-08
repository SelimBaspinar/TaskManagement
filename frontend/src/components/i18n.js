
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from 'i18next-browser-languagedetector';







i18n
  .use(initReactI18next) 
  .use(Backend)
  .use(LanguageDetector)
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    lng:"en",
    fallbackLng: "en",
    debug: true,
    backend: {

        /* translation file path */
  
        loadPath: "/api/translate/?format=json&Component={{ns}}&Lang={{lng}}",
  
      },
      ns: ["TaskManagement","AddTasks","Login","Register","Profile"],


      defaultNS: "TaskManagement",
  
  
      interpolation: {
  
        escapeValue: false,
  
        formatSeparator: ",",
  
      },
  
      react: {
        useSuspense: true,
  
      },
  
    });
  

export default i18n;

