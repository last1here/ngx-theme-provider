import markdown from './5-Factories.stories.md';

export default {
  title: 'Factories',
  parameters: { notes: markdown },
};

export const Simple = () => {
  return {
    parameters: {
      notes: markdown,
    },

    moduleMetadata: {
      imports: [],
      declarations: [],
    },
    template: `
      Hi, check body element of this iframe.
    `,
  };
};
