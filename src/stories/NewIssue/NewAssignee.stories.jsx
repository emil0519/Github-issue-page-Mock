import { ComponentStory, ComponentMeta } from "@storybook/react";
import NewAssigneeStories from "./NewAssigneeStory";

export default {
  title: "New-Issue/NewAssignee",
  component: NewAssigneeStories,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
};

const Template = (args) => <NewAssigneeStories {...args} />;

export const Default = Template.bind({});
Default.args = {
  controller: {
    title: "Assignee",
    default: {
      descriptionWithoutLink: "No one- ",
      descriptionWithLink: "assign yourself",
      desLink: "https://github.com/emil0519?tab=repositories",
      isLinkDecoration: false,
      inputPlaceholder: "Type or choose a user",
      mainHeader: "Assign up to 10 people to this issue",
      subHeader: "Suggestion",
      clearText: "clear assignee",
      isOpen: true,
      isGear: true, //can be cancel by"x" button or not
    },
    data: [
      {
        icon: "https://avatars.githubusercontent.com/u/97882056?v=4",
        title: "emil0519",
      },
      {
        icon: "https://avatars.githubusercontent.com/u/82010307?v=4",
        title: "Xie-MS",
      },
    ],
    defaultData: [
      {
        icon: "https://avatars.githubusercontent.com/u/97882056?v=4",
        title: "emil0519",
      },
      {
        icon: "https://avatars.githubusercontent.com/u/82010307?v=4",
        title: "Xie-MS",
      },
    ],
    selected: [],
    showSelectedData: [],
  },
};
