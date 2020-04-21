import { InjectionToken } from '@angular/core';

export class ThemeProviderOptions {
  themes: Theme[];

  defaultTheme: string;

  prefix?: string;

  clean?: boolean;

  disableBody?: boolean;
}

export class Theme<Props = { [key: string]: string }> {
  name: string;

  properties: Props;
}

export const THEME_PROVIDER_OPTIONS = new InjectionToken(
  'THEME_PROVIDER_OPTION',
);
