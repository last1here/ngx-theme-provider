import { Component, HostBinding, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxThemeProviderService } from '../../ngx-theme-provider.service';
import { Theme } from '../../symbols';

@Component({
  selector: 'theme-provider',
  template: `<ng-content></ng-content>`,
})
export class ThemeProviderComponent {
  private _theme: Theme;

  @Input()
  set theme(themeOrName: Theme | string) {
    this._theme = this.themeProviderService.get(themeOrName);

    if (!this._theme) {
      this.style = this.sanitizer.bypassSecurityTrustStyle('') as string;
    } else {
      this.updateStyles();
    }
  }

  @HostBinding()
  style: string;

  constructor(
    private themeProviderService: NgxThemeProviderService,
    private sanitizer: DomSanitizer,
  ) {}

  private updateStyles() {
    this.style = <string>(
      this.sanitizer.bypassSecurityTrustStyle(
        this.themeProviderService.buildCss(this._theme),
      )
    );
  }
}
