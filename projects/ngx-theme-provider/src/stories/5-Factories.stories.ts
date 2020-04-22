import markdown from './5-Factories.stories.md';
import { Component } from '@angular/core';
import { NgxThemeProviderModule } from '../lib/ngx-theme-provider.module';
import { NgxThemeProviderService } from '../lib/ngx-theme-provider.service';
import { Theme } from '../lib/symbols';

export default {
  title: 'Factories',
  parameters: { notes: markdown },
};

@Component({
  selector: 'themed-component',
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

@Component({
  selector: 'themed-changer',
  template: `
    <a (click)="set('default')">Set to default</a>
    <a (click)="set('dark')">Set to dark</a>
  `,
  styles: [`a {margin: 5px; display: inline-block;}`]
})
class ThemeChangerComponent {
  constructor(private themeProviderService: NgxThemeProviderService) {}

  set(theme: string) {
    this.themeProviderService.setCurrent(theme);
  }
}

export const Simple = () => {
  const addToAllFactory = (theme: Theme) => {
    return {
      name: theme.name,
      properties: {
        bodyText: '#111',
        bodyBackground: '#f9f9f9',
        ...theme.properties,
      },
    } as Theme;
  };

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
          factory: addToAllFactory,
          defaultTheme: 'default',
        }),
      ],
      declarations: [ThemedComponent, ThemeChangerComponent],
    },
    template: `
      <themed-component>
        Test item.
        <div style="background: var(--tp-body-background); color: var(--tp-body-text); padding: 20px; margin: 20px 0 0;">Using body styles</div>
      </themed-component>

      <themed-changer></themed-changer>
    `,
  };
};
