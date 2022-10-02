import IssueListLabel from "./IssueListLabel";

export default {
  title: "Issue-List/Label",
  component: IssueListLabel,

  argTypes: {},
};

const Template = (args: any) => <IssueListLabel {...args} />;

export const Component = Template.bind({});
