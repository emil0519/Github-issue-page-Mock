import { Header } from "./Github-Header";

export default {
  title: "Label-List/Header",
  component: Header,

  argTypes: {},
};

const Template = (args: any) => <Header {...args} />;

export const Component = Template.bind({});
