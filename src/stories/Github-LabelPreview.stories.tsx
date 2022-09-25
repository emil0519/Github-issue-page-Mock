import { LabelPreviews } from "./Github-LabelPreview";

export default {
  title: "Github/LabelPreview",
  component: LabelPreviews,

  argTypes: {},
};

const Template = (args: any) => <LabelPreviews {...args} />;

export const Component = Template.bind({});
