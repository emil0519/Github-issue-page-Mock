import styled from "styled-components";
import labelIcon from "../img/labelicon.png";
import { MilestoneIcon, IssueReopenedIcon } from "@primer/octicons-react";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useOnClickOutside } from "usehooks-ts";
import ColorBricks from "./ColorBricks";
import api from "../utils/api";

export interface opener {
  labelOpen: boolean;
}

// function useComponentVisible(initialIsVisible: any) {
//   const [isComponentVisible, setIsComponentVisible] =
//     useState(initialIsVisible);
//   // useEffect(() => console.log(initialIsVisible), [initialIsVisible]);
//   const ref = useRef<any>(null);

//   const handleHideDropdown = (event: KeyboardEvent) => {
//     if (event.key === "Escape") {
//       setIsComponentVisible(false);
//     }
//   };

//   const handleClickOutside = (event: any) => {
//     if (ref.current && !ref.current.contains(event.target)) {
//       setIsComponentVisible(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("keydown", handleHideDropdown, true);
//     document.addEventListener("click", handleClickOutside, true);
//     return () => {
//       document.removeEventListener("keydown", handleHideDropdown, true);
//       document.removeEventListener("click", handleClickOutside, true);
//     };
//   });

//   return { ref, isComponentVisible, setIsComponentVisible, useOnClickOutside };
// }

// function ColorBricks(props: any) {
//   const { ref, isComponentVisible, setIsComponentVisible, useOnClickOutside } =
//     useComponentVisible(false);
//   const [editOpen, setEditOpen] = useState(false);

//   const handleClickOutside = () => {
//     setEditOpen(false);
//     setIsComponentVisible(false);
//     console.log("clicked outside");
//   };
//   useOnClickOutside(ref, handleClickOutside);

//   const solidColorList: any = [
//     {
//       name: "#b6070c",
//     },
//     {
//       name: "#d94017",
//     },
//     {
//       name: "#fbca31",
//     },
//     {
//       name: "#0e8a25",
//     },
//     {
//       name: "#006b75",
//     },
//     {
//       name: "#1b76d8",
//     },
//     {
//       name: "#0052c8",
//     },
//     {
//       name: "#521be2",
//     },
//   ];

//   const lightColorList: any = [
//     {
//       name: "#e99796",
//     },
//     {
//       name: "#f9d0c5",
//     },
//     {
//       name: "#fef2c3",
//     },
//     {
//       name: "#c2e0c7",
//     },
//     {
//       name: "#bfdadc",
//     },
//     {
//       name: "#c5def4",
//     },
//     {
//       name: "#bfd4f1",
//     },
//     {
//       name: "#d4c5f7",
//     },
//   ];

//   return (
//     <>
//       <ColorInput
//         maxLength={7}
//         value={`${props.defaultColor}`}
//         onChange={(e) => {
//           props.setDefaultColor(e.target.value);
//           props.setNewLabelInfo({
//             ...props.newLabelInfo,
//             color: e.target.value,
//           });
//         }}
//         onClick={() => {
//           setIsComponentVisible(true);
//           setEditOpen(true);
//         }}
//       ></ColorInput>
//       {isComponentVisible && (
//         <ColorSelector style={{ display: "flex" }} ref={ref}>
//           <DefaultColorText>Choose from default colors:</DefaultColorText>
//           <DefaultColor>
//             {solidColorList.map(({ name }: any, index: number) => {
//               return (
//                 <ColorBrick
//                   colors={name}
//                   onClick={() => {
//                     props.setDefaultColor(name);
//                     props.setNewLabelInfo({
//                       ...props.newLabelInfo,
//                       color: name,
//                     });
//                   }}
//                 />
//               );
//             })}
//           </DefaultColor>
//           <DefaultColor>
//             {lightColorList.map(({ name }: any) => {
//               return (
//                 <ColorBrick
//                   colors={name}
//                   onClick={() => {
//                     props.setDefaultColor(name);
//                     props.setNewLabelInfo({
//                       ...props.newLabelInfo,
//                       color: name,
//                     });
//                   }}
//                 />
//               );
//             })}
//           </DefaultColor>
//         </ColorSelector>
//       )}
//       <ColorSelector style={{ display: "none" }}>
//         <DefaultColorText>Choose from default colors:</DefaultColorText>
//         <DefaultColor>
//           {solidColorList.map(({ name }: any, index: number) => {
//             return (
//               <ColorBrick
//                 colors={name}
//                 onClick={() => {
//                   props.setDefaultColor(name);
//                   props.setNewLabelInfo({
//                     ...props.newLabelInfo,
//                     color: name,
//                   });
//                 }}
//               />
//             );
//           })}
//         </DefaultColor>
//         <DefaultColor>
//           {lightColorList.map(({ name }: any) => {
//             return (
//               <ColorBrick
//                 colors={name}
//                 onClick={() => {
//                   props.setDefaultColor(name);
//                   props.setNewLabelInfo({
//                     ...props.newLabelInfo,
//                     color: name,
//                   });
//                 }}
//               />
//             );
//           })}
//         </DefaultColor>
//       </ColorSelector>
//     </>
//   );
// }

function LabelButtons() {
  const [labelOpen, setLabelOpen] = useState(false);
  const [defaultColor, setDefaultColor] = useState("#e99695");
  const [newLabelInfo, setNewLabelInfo] = useState({
    name: "",
    description: "",
    color: "#e99695",
  });
  const [labelText, setLabelText] = useState("Create Label");

  const [defaultLabelPreview, setDefaultLabelPreview] =
    useState("Label Preview");
  const [createLabelChange, setCreateLabelChange] = useState(false);
  useEffect(() => {
    newLabelInfo.name.length >= 1
      ? setCreateLabelChange(true)
      : setCreateLabelChange(false);
  }, [newLabelInfo]);
  const [created, setCreated] = useState(0);
  const dispatch = useDispatch();
  console.log(process.env.REACT_APP_PASSWORD);

  const startCreate = async () => {
    const result: any = await api
      .createLabels(
        "emil0519",
        "testing-issues",
        newLabelInfo.name,
        newLabelInfo.description,
        newLabelInfo.color.substring(1)
      )
      .then((data) => {
        dispatch({
          type: "createList",
          payload: { data },
        });
      });
    setCreateLabelChange(false);
    setLabelText("Saving ...");
    setTimeout(() => setLabelOpen(false), 1000);
  };

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
  // useEffect(() => {
  //   dispatch({
  //     type: "getList",
  //   });
  // }, [created]);

  // useEffect(() => console.log(newLabelInfo), [newLabelInfo]);

  return (
    <Wrapper>
      <UpperWrapper>
        <SubWrapOne>
          <LabelSection>
            <LabelSubSection>
              <LabelIcon alt="" src={labelIcon}></LabelIcon>
              <LabelText>Labels</LabelText>
            </LabelSubSection>
          </LabelSection>
          <MileSection>
            <MileStoneSubSection>
              <MileStoneIMG />
              <MileText>Milestones</MileText>
            </MileStoneSubSection>
          </MileSection>
          <BigSearchBar placeholder="Search all labels" />
        </SubWrapOne>
        <NewLabel>
          <NewLabelText
            onClick={() => {
              setLabelOpen(true);
              setLabelText("Create Label");
              setCreated(created + 1);
              setDefaultLabelPreview("Label Preview");
              setNewLabelInfo({
                name: "",
                description: "",
                color: "#e99695",
              });
            }}
          >
            New Label
          </NewLabelText>
        </NewLabel>
      </UpperWrapper>
      <SearchBar placeholder="Search all labels" />
      <NewLabelSection labelOpen={labelOpen}>
        <LabelPreview colors={defaultColor}>{defaultLabelPreview}</LabelPreview>
        <BigWrapper>
          <LabelInputSection>
            <LabelName>Label Name</LabelName>
            <LabelInput
              value={newLabelInfo.name}
              placeholder="Label name"
              onChange={(e) => {
                setNewLabelInfo({ ...newLabelInfo, name: e.target.value });
                setDefaultLabelPreview(e.target.value);
              }}
            />
          </LabelInputSection>
          <LabelInputSection>
            <LabelName>Description</LabelName>
            <LabelInput
              value={newLabelInfo.description}
              placeholder="Description (Optional)"
              onChange={(e) =>
                setNewLabelInfo({
                  ...newLabelInfo,
                  description: e.target.value,
                })
              }
            />
          </LabelInputSection>
          <ColorInputSection>
            <ColorText>Color</ColorText>
            <LowerWrapper>
              <ColorRoller colors={defaultColor}>
                <RollerIcon />
              </ColorRoller>
              <InputWrapper>
                {/* <ColorInput
                  maxLength={7}
                  value={`${defaultColor}`}
                  onChange={(e) => {
                    setDefaultColor(e.target.value);
                    setNewLabelInfo({ ...newLabelInfo, color: e.target.value });
                  }}
                ></ColorInput> */}
                <ColorBricks
                  setNewLabelInfo={setNewLabelInfo}
                  newLabelInfo={newLabelInfo}
                  setDefaultColor={setDefaultColor}
                  defaultColor={defaultColor}
                />
                {/* <ColorSelector>
                  <DefaultColorText>
                    Choose from default colors:
                  </DefaultColorText>
                  <DefaultColor>
                    {solidColorList.map(({ name }: any, index: number) => {
                      return (
                        <ColorBrick
                          colors={name}
                          onClick={() => {
                            setDefaultColor(name);
                            setNewLabelInfo({ ...newLabelInfo, color: name });
                          }}
                        />
                      );
                    })}
                  </DefaultColor>
                  <DefaultColor>
                    {lightColorList.map(({ name }: any) => {
                      return (
                        <ColorBrick
                          colors={name}
                          onClick={() => {
                            setDefaultColor(name);
                            setNewLabelInfo({ ...newLabelInfo, color: name });
                          }}
                        />
                      );
                    })}
                  </DefaultColor>
                </ColorSelector> */}
              </InputWrapper>
            </LowerWrapper>
          </ColorInputSection>
          <ButtonWrapper>
            <CreateLabelButton createLabelChange={createLabelChange}>
              <CreateLabelText onClick={() => startCreate()}>
                {labelText}
              </CreateLabelText>
            </CreateLabelButton>
            <CancelButton>
              <CancelText onClick={() => setLabelOpen(false)}>
                Cancel
              </CancelText>
            </CancelButton>
          </ButtonWrapper>
        </BigWrapper>
      </NewLabelSection>
      <div>
        {solidColorList.map((item: any, index: number) => {
          return <span>{item[index]}</span>;
        })}
      </div>
    </Wrapper>
  );
}
type Col = {
  colors: string;
};
const ColorBrick = styled.div<Col>`
  background: ${(props) => props.colors};
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

const DefaultColorText = styled.div`
  color: #57606a;
  font-size: 8px;
  margin: 8px auto 4px 8px;
  @media screen and (min-width: 768px) {
  }
`;

const InputWrapper = styled.section`
  position: relative;
  width: 100%;
  @media screen and (min-width: 768px) {
  }
`;

const ColorSelector = styled.section`
  width: 240px;
  height: 87px;
  background: white;
  position: absolute;
  top: 110%;
  left: 6px;
  border: 0.5px solid #cad1d9;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  display: none;
  @media screen and (min-width: 768px) {
  }
`;

const BigWrapper = styled.section`
  @media screen and (min-width: 768px) {
    display: flex;
    align-items: center;
    margin-top: 20px;
    margin-right: 6px;
  }
`;

const ButtonWrapper = styled.section`
  display: flex;
  @media screen and (min-width: 768px) {
  }
`;

const CancelText = styled.span`
  color: black;
  font-size: 14px;
  font-weight: 700;
  @media screen and (min-width: 768px) {
  }
`;

const CancelButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid #d1d2d5;
  width: 79.42px;
  height: 32px;
  border-radius: 5px;
  margin-left: 8px;
  cursor: pointer;
  @media screen and (min-width: 768px) {
  }
`;

const CreateLabelText = styled.span`
  color: white;
  font-size: 14px;
  font-weight: 700;
  @media screen and (min-width: 768px) {
  }
`;

type Changer = {
  createLabelChange: boolean;
};

const CreateLabelButton = styled.div<Changer>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.createLabelChange ? "#2da454" : "#8acd9a")};
  border: 1px solid #79b288;
  width: 113.36px;
  height: 32px;
  border-radius: 5px;
  margin-left: 16px;
  cursor: pointer;
  @media screen and (min-width: 768px) {
    order: 2;
  }
`;

const LowerWrapper = styled.div`
  display: flex;
  align-items: center;
  @media screen and (min-width: 768px) {
  }
`;

const ColorText = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: black;
  flex-grow: 1;
  @media screen and (min-width: 768px) {
  }
`;

const LabelInput = styled.input`
  background: #f5f7f9;
  padding: 5px 12px;
  border: 0.5px solid #cad1d9;
  margin-top: 6px;
  width: 90%;
  min-width: 85%;
  border-radius: 5px;
  @media screen and (min-width: 768px) {
  }
`;

const ColorInput = styled.input`
  background: #f5f7f9;
  padding: 5px 12px;
  border: 0.5px solid #cad1d9;
  margin-left: 6px;
  width: 89%;
  border-radius: 5px;
  margin-top: 9px;
`;

const RollerIcon = styled(IssueReopenedIcon)`
  width: 16px;
  height: 16px;
  cursor: pointer;
  @media screen and (min-width: 768px) {
  }
`;

const ColorRoller = styled.div<Col>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 31px;
  background: ${(props) => props.colors};
  border-radius: 5px;
  margin-top: 10px;
  @media screen and (min-width: 768px) {
  }
`;

const ColorInputSection = styled.section`
  display: flex;
  flex-direction: column;
  margin: 0 16px 16px 16px;
  width: 95%;
  @media screen and (min-width: 768px) {
  }
`;

const LabelInputSection = styled.section`
  display: flex;
  flex-direction: column;
  margin: 16px;
  width: 95%;
  @media screen and (min-width: 768px) {
  }
`;

const LabelName = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: black;
  @media screen and (min-width: 768px) {
  }
`;

const LabelPreview = styled.div<Col>`
  width: fit-content;
  margin: 16px 16px 0 16px;
  padding-left: 6px;
  padding-right: 6px;
  white-space: no-wrap;
  font-size: 10px;
  height: 24px;
  margin-left: 10px;
  background: ${(props) => props.colors};
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

type NewLabel = {
  labelOpen: boolean;
};
//傳props一定要設定type，在styled component

const NewLabelSection = styled.section<NewLabel>`
  display: ${(props) => (props.labelOpen ? "flex" : "none")};
  flex-direction: column;
  width: 95%;
  height: 328px;
  background: #f5f7f9;
  margin: 20px auto;
  border: 0.5px solid #cad1d9;
  border-radius: 5px;
  @media screen and (min-width: 768px) {
    flex-direction: column;
    height: 149px;
  }
`;

const BigSearchBar = styled.input`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    width: 320px;
    height: 32px;
    padding-left: 32px;
    margin-left: 5px;
    background: #f5f7f9;
    border: 0.5px solid #cad1d9;
    border-radius: 5px;
  }
`;

const SearchBar = styled.input`
  width: 320px;
  height: 32px;
  padding-left: 32px;
  margin-top: 5px;
  background: #f5f7f9;
  border: 0.5px solid #cad1d9;
  border-radius: 5px;
  margin-left: 16px;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const UpperWrapper = styled.div`
  /* width:40%; */
  display: flex;
  justify-content: space-between;
  /* margin-right: 16px; */
  width: 95%;
  margin: 0 auto;
  @media screen and (min-width: 768px) {
  }
`;

const SubWrapOne = styled.div`
  /* width:40%; */
  display: flex;
  @media screen and (min-width: 768px) {
  }
`;

const NewLabelText = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: white;
  text-align: center;
  @media screen and (min-width: 768px) {
  }
`;

const NewLabel = styled.div`
  background: #29994a;
  width: 98.69px;
  height: 32px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #288c46;
  }
  @media screen and (min-width: 768px) {
  }
`;

const MileText = styled.span`
  color: black;
  font-size: 14px;
  font-weight: 600;
  @media screen and (min-width: 768px) {
  }
`;

const MileSection = styled.section`
  display: flex;
  align-items: center;
  width: 125.38px;
  height: 32px;
  background: white;
  justify-content: center;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border: 0.5px solid #dbe0e5;
  cursor: pointer;
  @media screen and (min-width: 768px) {
  }
`;

const MileStoneSubSection = styled.div`
  display: flex;
  align-items: center;
  width: 125.38px;
  height: 32px;
  justify-content: center;
  &:hover {
    background: #f5f7f9;
  }
  @media screen and (min-width: 768px) {
  }
`;

const MileStoneIMG = styled(MilestoneIcon)`
  @media screen and (min-width: 768px) {
  }
`;

const LabelText = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: white;
  @media screen and (min-width: 768px) {
  }
`;

const LabelIcon = styled.img`
  width: 14px;
  height: 14px;
  @media screen and (min-width: 768px) {
  }
`;

const LabelSubSection = styled.div`
  display: flex;
  align-items: center;
  @media screen and (min-width: 768px) {
  }
`;

const LabelSection = styled.section`
  background: #1760cf;
  width: 97px;
  height: 32px;
  align-items: center;
  display: flex;
  justify-content: center;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  cursor: pointer;
  @media screen and (min-width: 768px) {
  }
`;

const Wrapper = styled.section`
  background: white;
  margin-top: 20px;
  /* display: flex;
    justify-content: space-between;
    margin-right: 16px; */
  @media screen and (min-width: 768px) {
  }
`;

export default LabelButtons;
