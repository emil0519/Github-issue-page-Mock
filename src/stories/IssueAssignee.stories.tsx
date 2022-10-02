import IssueAssignee from "./IssueAssignee";

export default {
  title: "Issue-List/Assignee",
  component: IssueAssignee,

  argTypes: {},
};

const Template = (args: any) => <IssueAssignee {...args} />;

export const Component = Template.bind({});
