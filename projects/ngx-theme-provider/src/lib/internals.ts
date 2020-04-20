import { ThemeProviderOptions } from './symbols';

export function themeConfigFactory(
  options: ThemeProviderOptions | undefined
): ThemeProviderOptions {
  return {
    prefix: 'tp',
    clean: true,
    disableBody: false,
    ...options,
  };
}
