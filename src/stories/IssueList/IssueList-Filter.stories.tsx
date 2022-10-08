import IssueListFilter from "./IssueList-Filter";

export default {
  title: "Issue-List/Filter",
  component: IssueListFilter,

  argTypes: {},
};

const Template = (args: any) => <IssueListFilter {...args} />;

export const Component = Template.bind({});
