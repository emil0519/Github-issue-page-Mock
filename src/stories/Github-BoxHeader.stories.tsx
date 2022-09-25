/* eslint-disable storybook/story-exports */
/* eslint-disable @typescript-eslint/dot-notation */
import { BoxHeader } from './Github-BoxHeader';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Github/BoxHeader',
  component: BoxHeader,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <BoxHeader {...args} />;

export const Component = Template.bind({});
