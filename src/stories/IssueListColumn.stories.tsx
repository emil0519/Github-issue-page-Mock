import IssueListColumn from "./IssueListColumn";

export default {
  title: "Issue-List/Column",
  component: IssueListColumn,

  argTypes: {},
};

const Template = (args: any) => <IssueListColumn {...args} />;

export const Component = Template.bind({});
