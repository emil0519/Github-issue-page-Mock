import { LabelPreviews } from "./Github-LabelPreview";

export default {
  title: "Label-List/LabelPreview",
  component: LabelPreviews,

  argTypes: {},
};

const Template = (args: any) => <LabelPreviews {...args} />;

export const Component = Template.bind({});
