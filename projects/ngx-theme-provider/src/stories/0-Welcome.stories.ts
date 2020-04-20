import { Component } from '@angular/core';

@Component({
  selector: 'story-welcome',
  template: `
    <h1>Ngx Theme Provider</h1>
    <p>Stories to display the basic implementations of the ThemeProvider.</p>
  `,
})
class WelcomeComponent {}

export default {
  title: 'Welcome',
};

export const ToStorybook = () => ({
  component: WelcomeComponent,
  props: {},
});

ToStorybook.story = {
  name: 'Introduction',
};
