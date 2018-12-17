import CONFIG from '../config';

// CHECK LOCALE & PARAMS
export const getLocaleParams = (lang, branch) => {
  let locale = lang;
  let matchParams;
  branch.forEach(({ match }) => {
    if (match && match.params && Object.keys(match.params).length > 0) {
      if (match.params.language && CONFIG.languages.indexOf(match.params.language) !== -1) {
        locale = match.params.language;
      }
      matchParams = match.params;
    }
  });
  locale = CONFIG.languages.includes(locale) ? locale : 'en';
  return { locale, matchParams };
};