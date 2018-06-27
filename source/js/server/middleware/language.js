import CONFIG from '../../config';

// =================== //
// HANDLE APP LANGUAGE //
// =================== //
export const handleLanguage = (req, res, next) => {
  // We only accept routes with a language
  const { language } = req.params;
  let redirect = '/en';
  // IF we don't have a language redirect to dashboard
  if (!language) return res.redirect(302, redirect);
  // IF language not white listed redirect to english equivalent
  if (!CONFIG.languages.includes(language)) {
    redirect = req.url.replace(language, 'en');
    return res.redirect(302, redirect);
  }
  return next();
};