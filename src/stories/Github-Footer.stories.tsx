/* eslint-disable storybook/story-exports */
/* eslint-disable @typescript-eslint/dot-notation */
import { Footer } from './Github-Footer';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Github/Footer',
  component: Footer,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Footer {...args} />;

export const Component = Template.bind({});
