import { ThemeProviderOptions } from './symbols';

const toCssCustomPropertySyntax = function (
  camelCase: string,
  prefix?: string,
) {
  let parts = [];

  if (prefix) {
    parts.push(prefix);
  }
  parts.push(camelCase.replace(/([A-Z0-9])/g, '-$1').toLowerCase());

  return '--' + parts.join('-');
};

export function themeConfigFactory(
  options: ThemeProviderOptions | undefined,
): ThemeProviderOptions {
  return {
    prefix: 'tp',
    cleanBody: true,
    disableGlobal: false,
    useStyleTag: false,
    factory: null,
    propertyTransform: toCssCustomPropertySyntax,
    ...options,
  };
}
