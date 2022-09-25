/* eslint-disable storybook/story-exports */
/* eslint-disable @typescript-eslint/dot-notation */
import { Repo } from './Github-Repo';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Github/Repo',
  component: Repo,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Repo {...args} />;

export const Component = Template.bind({});
