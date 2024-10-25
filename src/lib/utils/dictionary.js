import "server-only";

const dictionaries = {
  en: () =>
    import("../../../public/locales/en.json").then((module) => module.default),
  de: () =>
    import("../../../public/locales/de.json").then((module) => module.default),
};

export const getDictionary = async (locale) => dictionaries[locale]();
