import {
  APP_INITIALIZER,
  InjectionToken,
  ModuleWithProviders,
  NgModule,
} from '@angular/core';
import { noop } from 'rxjs';
import { ThemeProviderComponent } from './components/theme-provider/theme-provider.component';
import { themeConfigFactory } from './internals';
import { NgxThemeProviderService } from './ngx-theme-provider.service';
import { ThemeProviderOptions, THEME_PROVIDER_OPTIONS } from './symbols';

export const USER_OPTIONS = new InjectionToken('USER_OPTIONS');

export function themeServiceFactory(ts: NgxThemeProviderService) {
  return noop;
}

@NgModule({
  declarations: [ThemeProviderComponent],
  imports: [],
  exports: [ThemeProviderComponent],
})
export class NgxThemeProviderModule {
  static forRoot(
    config?: ThemeProviderOptions
  ): ModuleWithProviders<NgxThemeProviderModule> {
    return {
      ngModule: NgxThemeProviderModule,
      providers: [
        {
          provide: USER_OPTIONS,
          useValue: config,
        },
        {
          provide: THEME_PROVIDER_OPTIONS,
          useFactory: themeConfigFactory,
          deps: [USER_OPTIONS],
        },
        {
          provide: APP_INITIALIZER,
          useFactory: themeServiceFactory,
          deps: [NgxThemeProviderService],
          multi: true,
        },
      ],
    };
  }
}
