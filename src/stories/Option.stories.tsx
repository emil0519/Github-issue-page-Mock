/* eslint-disable storybook/story-exports */
/* eslint-disable @typescript-eslint/dot-notation */
import { Option } from "./Option";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Github/Option",
  component: Option,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: any) => <Option {...args} />;

export const Light = Template.bind({});
// export const Primary = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
// Primary['args'] = {
//   primary: true,
//   label: 'Button',
// };

// export const Secondary = Template.bind({});
// Secondary['args'] = {
//   label: 'Button',
// };

// export const Large = Template.bind({});
// Large['args'] = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small['args'] = {
//   size: 'small',
//   label: 'Button',
// };
