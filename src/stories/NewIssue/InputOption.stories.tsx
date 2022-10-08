import { ComponentStory, ComponentMeta } from "@storybook/react";
import InputOptions from "../../component/Reusable/InputOptions";
import {
  HeadingIcon,
  BoldIcon,
  ItalicIcon,
  ListUnorderedIcon,
  ListOrderedIcon,
  TasklistIcon,
} from "@primer/octicons-react";

export default {
  title: "New-Issue/InputOptions",
  component: InputOptions,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof InputOptions>;

const Template: ComponentStory<typeof InputOptions> = (args) => (
  <InputOptions {...args} />
);

export const Default = Template.bind({});
Default.args = {
  array: [
    [<HeadingIcon fill="#4d555e" />, "Add heading text", "title"],
    [<BoldIcon fill="#4d555e" />, "Add bold text, <Cmd+b>", "bold"],
    [<ItalicIcon fill="#4d555e" />, "Add italic text, <Cmd+i>", "italic"],
    [
      <ListUnorderedIcon fill="#4d555e" />,
      "Add a bulleted list, <Cmd+Shift+8>",
      "ordered-list",
    ],
    [
      <ListOrderedIcon fill="#4d555e" />,
      "Add a numbered list, <Cmd+Shift+7>",
      "unordered-list",
    ],
    [
      <TasklistIcon fill="#4d555e" />,
      "Add a task list, <Cmd+Shift+l>",
      "task-list",
    ],
  ],
};
