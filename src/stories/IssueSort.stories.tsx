import IssueSort from "./IssueSort";

export default {
  title: "Issue-List/Sort",
  component: IssueSort,

  argTypes: {},
};

const Template = (args: any) => <IssueSort {...args} />;

export const Component = Template.bind({});
