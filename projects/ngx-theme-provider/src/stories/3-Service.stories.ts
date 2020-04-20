export default {
  title: 'Service',
};

export const Simple = () => {
  return {
    moduleMetadata: {
      imports: [],
      declarations: [],
    },
    template: `
      Hi, check body element of this iframe.
    `,
  };
};
