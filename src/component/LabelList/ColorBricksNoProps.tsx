import { useState } from "react";
import styled from "styled-components";
import { useComponentVisible } from "../../utils/useComponentVisible";

function ColorBricksNoProps(props: any) {
  const { ref, isComponentVisible, setIsComponentVisible, useOnClickOutside } =
    useComponentVisible(false);
  const [, setEditOpen] = useState(false);
  const [changeColor, setChangeColor] = useState<string>();

  const handleClickOutside = () => {
    setEditOpen(false);
    setIsComponentVisible(false);
  };
  useOnClickOutside(ref, handleClickOutside);

  const solidColorList: any = [
    {
      name: "b6070c",
    },
    {
      name: "d94017",
    },
    {
      name: "fbca31",
    },
    {
      name: "0e8a25",
    },
    {
      name: "006b75",
    },
    {
      name: "1b76d8",
    },
    {
      name: "0052c8",
    },
    {
      name: "521be2",
    },
  ];

  const lightColorList: any = [
    {
      name: "e99796",
    },
    {
      name: "f9d0c5",
    },
    {
      name: "fef2c3",
    },
    {
      name: "c2e0c7",
    },
    {
      name: "bfdadc",
    },
    {
      name: "c5def4",
    },
    {
      name: "bfd4f1",
    },
    {
      name: "d4c5f7",
    },
  ];

  return (
    <ColorWrap>
      <WrapNumberSign>
        <ColorDefault>#</ColorDefault>
        <ColorInput
          maxLength={6}
          type="text"
          defaultValue={`${props.defaultValue}`}
          value={`${props.localColor}`}
          onClick={() => {
            setIsComponentVisible(true);
            setEditOpen(true);
          }}
          onChange={(e) => {
            props.setUpdateLabelInfo({
              ...props.updateLabelInfo,
              newCol: e.target.value,
            });
            setChangeColor(e.target.value);
            props.setLocalColor(e.target.value);
          }}
        ></ColorInput>
      </WrapNumberSign>

      {isComponentVisible && (
        <ColorSelector style={{ display: "flex" }} ref={ref}>
          <DefaultColorText>Choose from default colors:</DefaultColorText>
          <DefaultColor>
            {solidColorList.map(({ name }: any, index: number) => {
              return (
                <ColorBrick
                  key={name}
                  colors={name}
                  onClick={(e) => {
                    props.setUpdateLabelInfo({
                      ...props.updateLabelInfo,
                      newCol: name,
                    });
                    setChangeColor(name);
                    props.setLocalColor(name);
                  }}
                />
              );
            })}
          </DefaultColor>
          <DefaultColor>
            {lightColorList.map(({ name }: any) => {
              return (
                <ColorBrick
                  key={name}
                  colors={name}
                  onClick={(e) => {
                    props.setUpdateLabelInfo({
                      ...props.updateLabelInfo,
                      newCol: name,
                    });
                    setChangeColor(name);
                    props.setLocalColor(name);
                  }}
                />
              );
            })}
          </DefaultColor>
        </ColorSelector>
      )}
      <ColorSelector style={{ display: "none" }}>
        <DefaultColorText>Choose from default colors:</DefaultColorText>
        <DefaultColor>
          {solidColorList.map(({ name }: any, index: number) => {
            return <ColorBrick key={name} colors={name} />;
          })}
        </DefaultColor>
        <DefaultColor>
          {lightColorList.map(({ name }: any) => {
            return <ColorBrick key={name} colors={name} />;
          })}
        </DefaultColor>
      </ColorSelector>
    </ColorWrap>
  );
}
type Col = {
  colors: string;
};
const ColorBrick = styled.div<Col>`
  background: #${(props) => props.colors};
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

const WrapNumberSign = styled.div`
  position: relative;
  @media screen and (min-width: 768px) {
  }
`;

const ColorDefault = styled.span`
  position: absolute;
  top: 33%;
  left: 12px;

  @media screen and (min-width: 768px) {
  }
`;

const DefaultColorText = styled.div`
  color: #57606a;
  font-size: 8px;
  margin: 8px auto 4px 8px;
  @media screen and (min-width: 768px) {
  }
`;

const ColorSelector = styled.section`
  width: 240px;
  height: 87px;
  background: white;
  position: absolute;
  top: 119%;
  left: 197px;
  border: 0.5px solid #cad1d9;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  display: none;
  @media screen and (min-width: 768px) {
    left: 0;
  }
`;

const ColorWrap = styled.section`
  width: 100%;
  position: relative;
  top: 0px;
  left: 0px;
`;

const ColorInput = styled.input`
  background: rgb(245, 247, 249);
  padding: 5px 18px;
  border: 0.5px solid #cad1d9;
  margin-left: 6px;
  width: 89%;
  border-radius: 5px;
  margin-top: 9px;
`;

//傳props一定要設定type，在styled component

export default ColorBricksNoProps;
