import { NewLabels } from "./Github-NewLabel";

export default {
  title: "Github/LabelPreview",
  component: NewLabels,
  argTypes: {},
};

const Template = (args: any) => <NewLabels {...args} />;

export const Component = Template.bind({});
