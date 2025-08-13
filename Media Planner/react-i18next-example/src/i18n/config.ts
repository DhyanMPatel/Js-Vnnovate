import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zh-tw',
    fallbackLng: ['zh-tw', 'zh-cn', 'en'],
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    // Add an error handler
    debug: true, // Enable debug mode to see logs
    load: 'languageOnly',
  })
  .catch(err => {
    console.error('i18next initialization error:', err);
  });

export default i18n;
