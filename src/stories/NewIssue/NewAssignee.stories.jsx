import { ComponentStory, ComponentMeta } from "@storybook/react";
import NewAssignee from "../../component/Reusable/NewAssignee";

export default {
  title: "New-Issue/NewAssignee",
  component: NewAssignee,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
};

const Template = (args) => <NewAssignee {...args} />;

// type controllerProps = {
//     controller: {
//       title: string;
//       default: {
//         descriptionWithoutLink: string;
//         descriptionWithLink?: string;
//         desLink?: string;
//         isLinkDecoration?: boolean;
//         inputPlaceholder: string;
//         mainHeader: string;
//         subHeader?: string;
//         clearText?: string;
//         isOpen: boolean;
//         isGear?: boolean;
//       };
//       data?: any;
//       defaultData?: any;
//       selected?: string[];
//       showSelectedData: { title: string; icon: string };
//     }[];
//     clickIndex: number;
//     inputValue: string;
//     clickRate: number;
//     clearAssigneeRate: number;
//     setClickIndex: React.Dispatch<React.SetStateAction<number>>;
//     setInputValue: React.Dispatch<React.SetStateAction<string>>;
//     setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
//     setClickRate: React.Dispatch<React.SetStateAction<number>>;
//     setClearAssigneeRate: React.Dispatch<React.SetStateAction<number>>;
//   };

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
