import { Inject, Injectable } from '@angular/core';
import { Theme, ThemeProviderOptions, THEME_PROVIDER_OPTIONS } from './symbols';

@Injectable({
  providedIn: 'root',
})
export class NgxThemeProviderService {
  static StyleTageId = 'ngxthemeprovider__tag';
  private _currentTheme: Theme;
  private _themes: Theme[];

  constructor(
    @Inject(THEME_PROVIDER_OPTIONS) private options: ThemeProviderOptions,
  ) {
    this._themes = options.themes;
    this.resetToDefault();
  }

  getByName(name: string) {
    return this._themes.find((t) => t.name === name);
  }

  resetToDefault() {
    if (
      this.options.defaultTheme ||
      !this.options.themes ||
      this.options.themes.length < 1
    ) {
      this.setCurrent(this.options.defaultTheme);
    }
  }

  setCurrent(themeOrName: Theme | string) {
    this._currentTheme = this.get(themeOrName);

    if (!this._currentTheme) {
      throw new Error(`Unknown theme: ${themeOrName}.`);
    }

    if (this.options.disableGlobal === false) {
      if (this.options.cleanBody) {
        document.body.style.cssText = '';
      }

      const css = this.buildCss(this._currentTheme);
      if (this.options.useStyleTag) {
        this.buildStyleTag(css);
      } else {
        document.body.style.cssText += css;
      }
    }
  }

  getCurrent() {
    return this._currentTheme;
  }

  getAll() {
    return this._themes;
  }

  get(themeOrName: Theme | string) {
    return typeof themeOrName === 'string'
      ? this.getByName(themeOrName)
      : themeOrName;
  }

  buildCss(theme: Theme) {
    if (this.options.factory) {
      theme = this.options.factory(theme);
    }

    return Object.keys(theme.properties)
      .map((property) => {
        return [
          this.cssPropertyName(property),
          theme.properties[property],
        ].join(':');
      })
      .join(';');
  }

  private buildStyleTag(css: string) {
    let styleTag: any = document.getElementById(
      NgxThemeProviderService.StyleTageId,
    );

    if (styleTag == null) {
      styleTag = document.createElement('STYLE');
      styleTag.id = NgxThemeProviderService.StyleTageId;
      styleTag.type = 'text/css';
      document.head.appendChild(styleTag);
    }

    styleTag.innerText = `:root { ${css} }`;
  }

  private cssPropertyName(camelCase: string) {
    return (
      this.options.propertyTransform(camelCase, this.options.prefix) ||
      camelCase
    );
  }
}
