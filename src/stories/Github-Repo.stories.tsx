import { Repo } from "./Github-Repo";

export default {
  title: "Github/Repo",
  component: Repo,

  argTypes: {},
};

const Template = (args: any) => <Repo {...args} />;

export const Component = Template.bind({});
