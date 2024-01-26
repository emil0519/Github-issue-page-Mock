import IssueListPaging from "./IssueListPaging";

export default {
  title: "Issue-List/Paging",
  component: IssueListPaging,
  argTypes: {},
};

const Template = (args: any) => <IssueListPaging {...args} />;

export const Component = Template.bind({});
