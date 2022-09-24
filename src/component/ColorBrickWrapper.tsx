import styled from "styled-components";

export function ColorBrickWrapper(props: { onClick: (name: string) => void }) {
  const solidColorList: any = [
    {
      name: "#b6070c",
    },
    {
      name: "#d94017",
    },
    {
      name: "#fbca31",
    },
    {
      name: "#0e8a25",
    },
    {
      name: "#006b75",
    },
    {
      name: "#1b76d8",
    },
    {
      name: "#0052c8",
    },
    {
      name: "#521be2",
    },
  ];

  const lightColorList: any = [
    {
      name: "#e99796",
    },
    {
      name: "#f9d0c5",
    },
    {
      name: "#fef2c3",
    },
    {
      name: "#c2e0c7",
    },
    {
      name: "#bfdadc",
    },
    {
      name: "#c5def4",
    },
    {
      name: "#bfd4f1",
    },
    {
      name: "#d4c5f7",
    },
  ];

  return (
    <>
      <DefaultColor>
        {solidColorList.map(({ name }: any, index: number) => {
          return (
            <ColorBrick colors={name} onClick={() => props.onClick(name)} />
          );
        })}
      </DefaultColor>
      <DefaultColor>
        {lightColorList.map(({ name }: any) => {
          return (
            <ColorBrick colors={name} onClick={() => props.onClick(name)} />
          );
        })}
      </DefaultColor>
    </>
  );
}
type Col = {
  colors: string;
};
const ColorBrick = styled.div<Col>`
  background: ${(props: any) => props.colors};
  width: 12px;
  height: 12px;
  border-radius: 3px;
  width: 21px;
  height: 21px;
  margin-right: 8px;
  cursor: pointer;
  @media screen and (min-width: 768px) {
  }
`;
const DefaultColor = styled.div`
  display: flex;
  margin: 5px auto 0 8px;

  @media screen and (min-width: 768px) {
  }
`;
