import { Component } from '@angular/core';
import { NgxThemeProviderModule } from '../public-api';

export default {
  title: 'Component',
};

@Component({
  selector: 'themed-item',
  template: ` <ng-content></ng-content> `,
  styles: [
    `
      :host {
        background: var(--tp-background);
        color: var(--tp-color);
        padding: 20px;
        display: block;
      }
    `,
  ],
})
class ThemedComponent {}

export const Simple = () => {
  return {
    moduleMetadata: {
      imports: [
        NgxThemeProviderModule.forRoot({
          themes: [
            {
              name: 'default',
              properties: {
                color: '#333',
                background: '#EEE',
              },
            },
            {
              name: 'dark',
              properties: {
                color: 'pink',
                background: 'black',
              },
            },
          ],
          defaultTheme: 'default',
        }),
      ],
      declarations: [ThemedComponent],
    },
    template: `
      <themed-item>
        test<br/><br/>
        <theme-provider theme="dark">
          <themed-item>Test inner</themed-item>
        </theme-provider>
      </themed-item>
    `,
  };
};
