import { Repo } from "./Github-Repo";

export default {
  title: "Label-List/Repo",
  component: Repo,

  argTypes: {},
};

const Template = (args: any) => <Repo {...args} />;

export const Component = Template.bind({});
