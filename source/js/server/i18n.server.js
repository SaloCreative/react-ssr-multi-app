import i18n from 'i18next';
import Backend from 'i18next-node-fs-backend';
import { LanguageDetector } from 'i18next-express-middleware';
import CONFIG from '../config';

const createi18nServerInstance = (namespace = 'common') => {
  return i18n
    .use(Backend)
    .use(LanguageDetector)
    .init({
      whitelist: CONFIG.languages,
      wait: false,
      fallbackLng: 'en',

      // have a common namespace used around the full app
      ns: [namespace === 'common' ? 'common' : 'common', namespace],
      defaultNS: namespace,

      debug: false,

      load: 'all',

      lowerCaseLng: true,
      
      interpolation: {
        escapeValue: false, // not needed for react!!
        formatSeparator: ',',
        format(value, format) {
          if (format === 'uppercase') return value.toUpperCase();
          return value;
        }
      },

      backend: {
        loadPath: 'build/client/locales/{{lng}}/{{ns}}.json',
        jsonIndent: 2
      }
    });
};

export default createi18nServerInstance;