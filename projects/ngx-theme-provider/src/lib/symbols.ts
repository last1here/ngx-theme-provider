import { InjectionToken } from '@angular/core';

export type ThemeFactory = (theme: Theme) => Theme;

export type PropertyFactory = (property: string, prefix?: string) => string;

export class ThemeProviderOptions {
  themes: Theme[];

  defaultTheme: string;

  prefix?: string;

  cleanBody?: boolean;

  disableGlobal?: boolean;

  useStyleTag?: boolean;

  factory?: ThemeFactory;

  propertyTransform?: PropertyFactory;
}

export class Theme<Props = { [key: string]: string }> {
  name: string;

  properties: Props;
}

export const THEME_PROVIDER_OPTIONS = new InjectionToken(
  'THEME_PROVIDER_OPTION',
);
