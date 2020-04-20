import { Inject, Injectable } from '@angular/core';
import { Theme, ThemeProviderOptions, THEME_PROVIDER_OPTIONS } from './symbols';

function isString(x: any): x is string {
  return typeof x === 'string';
}

@Injectable({
  providedIn: 'root',
})
export class NgxThemeProviderService {
  private _currentTheme: Theme;

  constructor(
    @Inject(THEME_PROVIDER_OPTIONS) private options: ThemeProviderOptions
  ) {
    this.resetToTheme();
  }

  getTheme(name: string) {
    return this.options.themes.find((t) => t.name === name);
  }

  resetToTheme() {
    this.setCurrentTheme(this.options.defaultTheme);
  }

  setCurrentTheme(name: string) {
    this._currentTheme = this.getTheme(name);

    if (this.options.disableBody === false) {
      if (this.options.clean) {
        document.body.style.cssText = '';
      }

      document.body.style.cssText += this.buildCssString(this._currentTheme);
    }
  }

  getCurrentTheme() {
    return this._currentTheme;
  }

  getThemes() {
    return this.options.themes;
  }

  buildCssString(themeOrName: Theme | string) {
    let theme: Theme = isString(themeOrName)
      ? this.getTheme(themeOrName)
      : themeOrName;

    if (!theme) {
      throw new Error(`Unknown theme: ${themeOrName}.`);
    }

    return Object.keys(theme.properties)
      .map((property) => {
        return [
          this.toCssCustomPropertySyntax(property),
          theme.properties[property],
        ].join(':');
      })
      .join(';');
  }

  private toCssCustomPropertySyntax(camelCase: string) {
    let parts = [];

    if (this.options.prefix) {
      parts.push(this.options.prefix);
    }
    parts.push(camelCase.replace(/([A-Z0-9])/g, '-$1').toLowerCase());

    return '--' + parts.join('-');
  }
}
