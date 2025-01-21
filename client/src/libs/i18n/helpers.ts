const RTL_LANGUAGES = ['ar', 'dv', 'fa', 'he', 'ps', 'sd'];
export const isLocaleRTL = (locale: string) => {
  return Boolean(RTL_LANGUAGES.find((code) => (locale || '').includes(code)));
};
