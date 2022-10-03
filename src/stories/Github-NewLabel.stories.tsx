import { NewLabels } from "./Github-NewLabel";

export default {
  title: "Label-List/LabelPreview",
  component: NewLabels,
  argTypes: {},
};

const Template = (args: any) => <NewLabels {...args} />;

export const Component = Template.bind({});
