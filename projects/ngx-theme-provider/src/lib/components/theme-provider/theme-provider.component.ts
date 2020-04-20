import { Component, HostBinding, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxThemeProviderService } from '../../ngx-theme-provider.service';

@Component({
  selector: 'theme-provider',
  template: `<ng-content></ng-content>`,
})
export class ThemeProviderComponent {
  private _theme: string;

  @Input()
  set theme(name: string) {
    this._theme = name;
    if (!this._theme) {
      this.styles = this.sanitizer.bypassSecurityTrustStyle('') as string;
    } else {
      this.updateStyles();
    }
  }

  get theme() {
    return this._theme;
  }

  @HostBinding('style')
  styles: string;

  constructor(
    private themeProviderService: NgxThemeProviderService,
    private sanitizer: DomSanitizer
  ) {}

  private updateStyles() {
    this.styles = <string>(
      this.sanitizer.bypassSecurityTrustStyle(
        this.themeProviderService.buildCssString(this.theme)
      )
    );
  }
}
