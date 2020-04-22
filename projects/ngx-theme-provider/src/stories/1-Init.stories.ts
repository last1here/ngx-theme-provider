import { NgxThemeProviderModule } from '../public-api';

export default {
  title: 'Init',
};

export const Simple = () => {
  return {
    moduleMetadata: {
      imports: [
        NgxThemeProviderModule.forRoot({
          themes: [
            {
              name: 'default',
              properties: {
                key: '#333',
              },
            },
          ],
          defaultTheme: 'default',
        }),
      ],
      declarations: [],
    },
    template: `
      Hi, check body element of this iframe.
    `,
  };
};

export const UseStyleTag = () => {
  return {
    moduleMetadata: {
      imports: [
        NgxThemeProviderModule.forRoot({
          themes: [
            {
              name: 'default',
              properties: {
                key: '#333',
              },
            },
          ],
          defaultTheme: 'default',
          useStyleTag: true,
        }),
      ],
      declarations: [],
    },
    template: `
      Hi, check head for a style element with the id #ngxthemeprovider__tag.
    `,
  };
};
