import styled from "styled-components";

type Label = {
  background: string;
};

const LabelPreview = styled.div<Label>`
  width: fit-content;
  margin: 16px 16px 0 16px;
  padding-left: 6px;
  padding-right: 6px;
  white-space: no-wrap;
  font-size: 10px;
  height: 24px;
  margin-left: 10px;
  background: ${(props) => props.background};
  color: black;
  font-weight: 600;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media screen and (min-width: 768px) {
    flex-basis: 100;
  }
`;

type LabelProps = {
  TEXT: string;
  background: string;
};

export const LabelPreviews = ({
  TEXT = "Label Preview",
  background = "#e99695",
  ...props
}: LabelProps) => {
  return (
    <>
      <LabelPreview background={background}>{TEXT}</LabelPreview>
    </>
  );
};
