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
