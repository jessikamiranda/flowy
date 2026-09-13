import { appConfig } from '@/config/app'

const themes = JSON.stringify(appConfig.theme.colorThemes)

const storageKey = JSON.stringify(appConfig.theme.colorThemeStorageKey)

const defaultTheme = JSON.stringify(appConfig.theme.defaultColorTheme)

export const colorThemeScript = `
(function () {
  try {
    var themes = ${themes};
    var storedTheme = localStorage.getItem(${storageKey});
    var theme = themes.indexOf(storedTheme) !== -1
      ? storedTheme
      : ${defaultTheme};

    document.documentElement.setAttribute(
      'data-color-theme',
      theme
    );
  } catch (_) {
    document.documentElement.setAttribute(
      'data-color-theme',
      ${defaultTheme}
    );
  }
})();
`
