import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import api from "../utils/api";
import { IssueReopenedIcon } from "@primer/octicons-react";
import useOnClickOutside from "../utils/useOnClickOutside";

function LabelList() {
  const dispatch = useDispatch();
  const [labelOpen, setLabelOpen] = useState(false);
  const [label, setLabel]: any = useState();
  const updatedLabels: any = useSelector((state) => state);
  const [clickIndex, setClickIndex] = useState(-1);
  const [updateLabelInfo, setUpdateLabelInfo]: any = useState();
  const ref = useRef(null);
  const handleClickOutside = () => {
    setClickIndex(-1);
    console.log("click outside");
  };
  const handleClickInside = (index: number) => {
    // setClickIndex(index);
    console.log("clicked inside");
  };

  useOnClickOutside(ref, handleClickOutside);

  useEffect(() => console.log(clickIndex), [clickIndex]);

  function toUpdateInfo(types: any, index: any, value: any) {
    let newInfo = [...updateLabelInfo];
    if (types === "name") {
      newInfo[index].new_name = value;
    } else if (types === "description") {
      newInfo[index].description = value;
    } else if (types === "color") {
      newInfo[index].color = value;
    }
    setUpdateLabelInfo(newInfo);
    return;
  }

  function postInfo(index: number) {
    let updateBody = updateLabelInfo[index];
    console.log(updateBody);

    api.updateLabels(
      "emil0519",
      "testing-issues",
      updateBody.name,
      updateBody.new_name,
      updateBody.description,
      updateBody.color.substring(1)
    );
  }

  function deleteLabel(index: number) {
    api.deleteLabel("emil0519", "testing-issues", updateLabelInfo[index].name);
    console.log(updateLabelInfo[index].name);
  }

  useEffect(() => {
    if (label === undefined) {
      return;
    } else {
      setUpdateLabelInfo(
        label.map((item: any) => {
          return {
            name: item.name,
            description: item.description,
            color: item.color,
          };
        })
      );
    }
  }, [label]);

  // useEffect(() => console.log(updateLabelInfo), [updateLabelInfo]);

  useEffect(() => {
    (async () => {
      setLabel(await api.getLabels("emil0519", "testing-issues"));
    })().catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setLabel(updatedLabels);
    // 每次有新label的時候會re-render一次
  }, [updatedLabels]);

  useEffect(() => {
    dispatch({
      type: "getList",
      payload: { label },
    });
  }, [label]);

  // useEffect(() => console.log(label), []);

  // const labels: any = useSelector((state) => state);
  // useEffect(() => {
  //   test();
  // fetch
  // dispatch init state
  // }, []);
  // setTimeout(() => test(), 1000);
  // 改進：useInterval loading boolean, lazy loading, suspends
  // function test() {
  //   dispatch({
  //     type: "",
  //   });
  // }
  // useEffect(() => {
  //   console.log(labels);
  // }, [labels]);
  if (label === undefined) {
    // test();
    return (
      <>
        <h1>Loading</h1>
      </>
    );
  } else {
    return (
      <>
        {label.map((item: any, index: any) => {
          return (
            <Wrapper>
              <LabelWrap>
                <Label color={item.color}>
                  <LabelText color={item.color}>{item.name}</LabelText>
                </Label>
              </LabelWrap>
              <LabelDes>{item.description}</LabelDes>
              <Notification></Notification>
              <Sort clickIndex={clickIndex} index={index}>
                <SortText
                  ref={ref}
                  onClick={() => {
                    setClickIndex(index);
                    handleClickInside(index);
                  }}
                >
                  ...
                </SortText>
                <DropDown key={index} index={index} clickIndex={clickIndex}>
                  <DropDownText
                    onClick={() => handleClickInside(index)}
                    ref={ref}
                  >
                    Edit
                  </DropDownText>
                  <DropDownText onClick={() => deleteLabel(index)}>
                    Delete
                  </DropDownText>
                </DropDown>
              </Sort>
              <NewLabelSection labelOpen={labelOpen}>
                <BigWrapper>
                  <LabelInputSection>
                    <LabelName>Label Name</LabelName>
                    <LabelInput
                      placeholder="Label name"
                      defaultValue={`${item.name}`}
                      onChange={(e) => {
                        toUpdateInfo("name", index, e.target.value);
                      }}
                    />
                  </LabelInputSection>
                  <LabelInputSection>
                    <LabelName>Description</LabelName>
                    <LabelInput
                      placeholder="Description (optional)"
                      defaultValue={`${item.description}`}
                      onChange={(e) => {
                        toUpdateInfo("description", index, e.target.value);
                      }}
                    />
                  </LabelInputSection>
                  <ColorInputSection>
                    <ColorText>Color</ColorText>
                    <LowerWrapper>
                      <ColorRoller>
                        <RollerIcon />
                      </ColorRoller>
                      <ColorInput
                        maxLength={7}
                        type="text"
                        defaultValue={`#${item.color}`}
                        onChange={(e) => {
                          toUpdateInfo("color", index, e.target.value);
                        }}
                        // onChange={(e) => {
                        //   this.value=e.target.value
                        // }}
                      ></ColorInput>
                    </LowerWrapper>
                  </ColorInputSection>
                  <ButtonWrapper>
                    <CreateLabelButton>
                      <CreateLabelText onClick={() => postInfo(index)}>
                        Save changes
                      </CreateLabelText>
                    </CreateLabelButton>
                    <CancelButton>
                      <CancelText>Cancel</CancelText>
                    </CancelButton>
                  </ButtonWrapper>
                </BigWrapper>
              </NewLabelSection>
              <BigSort>
                <BigSortText>Edit</BigSortText>
                <BigSortText>Delete</BigSortText>
              </BigSort>
            </Wrapper>
          );
        })}
      </>
    );
  }
}

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

const CreateLabelButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #8acd9a;
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
  width: 45%;
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

const ColorRoller = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 31px;
  background: #e58b8c;
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

const LabelPreview = styled.div`
  width: fit-content;
  margin: 16px 16px 0 16px;
  padding-left: 6px;
  padding-right: 6px;
  white-space: no-wrap;
  font-size: 10px;
  height: 24px;
  margin-left: 10px;
  background: #e58b8c;
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

const NewLabelSection = styled.section<NewLabel>`
  display: ${(props) => (props.labelOpen ? "flex" : "none")};
  flex-direction: column;
  width: 95%;
  height: 278px;

  margin: 20px auto;

  @media screen and (min-width: 768px) {
    flex-direction: column;
    height: 149px;
  }
`;

const DropDownText = styled.span`
  padding: 8px;
  width: 158px;
  height: 34px;
  font-size: 8px;
  color: #34383b;
  background: white;
  &:hover {
    background: #1760cf;
  }
  @media screen and (min-width: 1012px) {
  }
`;

type Active = {
  clickIndex: number;
  index: number;
};

const DropDown = styled.div<Active>`
  display: ${(props) => (props.index === props.clickIndex ? "flex" : "none")};
  position: absolute;
  top: 141%;
  right: 12px;
  width: 160px;
  height: 82px;
  background: white;
  flex-direction: column;
  z-index: 100;

  @media screen and (min-width: 1012px) {
  }
`;

const LabelWrap = styled.div`
  width: 15%;
  height: 24px;
  margin-top: 25px;
  @media screen and (min-width: 1012px) {
  }
`;

const BigSortText = styled.span`
  display: none;
  @media screen and (min-width: 1012px) {
    display: block;
    font-size: 12px;
    color: #4d555e;
    font-weight: 500;
    cursor: pointer;
    &:nth-child(2) {
      margin-right: 10px;
      margin-left: 15px;
    }
    &:hover {
      color: #1760cf;
      text-decoration: underline;
      text-decoration-color: #1760cf;
    }
  }
`;

const BigSort = styled.div`
  display: none;
  @media screen and (min-width: 1012px) {
    display: flex;
    width: 8%;
  }
`;

const Notification = styled.span`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    font-size: 12px;
    color: #4d555e;
    font-weight: 500;
    cursor: pointer;
    &:hover {
      color: #1760cf;
    }
  }
`;

const LabelDes = styled.span`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    font-size: 12px;
    color: #4d555e;
    font-weight: 500;
    width: 57%;
  }
`;

const SortText = styled.span`
  font-size: 24px;
  margin-bottom: 12px;
`;

const Sort = styled.div<Active>`
  position: relative;
  width: 42px;
  height: 28px;
  background: ${(props) =>
    props.index === props.clickIndex ? "#1760cf" : "white"};
  color: ${(props) => (props.index === props.clickIndex ? "white" : "black")};
  border: 0.5px solid #cad1d9;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;
  /* margin-top: 25px; */

  &:hover {
    background: #1760cf;
    > * {
      color: white;
    }
  }
  @media screen and (min-width: 1012px) {
    display: none;
  }
`;

const LabelText = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: ${(props) => (props.color === "ffffff" ? "black" : "white")};
  @media screen and (min-width: 768px) {
  }
`;

const Label = styled.div`
  width: fit-content;
  padding-left: 6px;
  padding-right: 6px;
  white-space: no-wrap;
  border: ${(props) =>
    props.color === "ffffff" ? "0.5px solid #b7b7b7" : "none"};
  /* max-width: 50%;
  min-width: 50px; */
  height: 24px;
  margin-left: 10px;
  background: #${(props) => props.color};
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media screen and (min-width: 768px) {
  }
`;

const Wrapper = styled.section`
  width: 95vw;
  height: 339px;
  /* 要設條件 */
  margin: 0 auto;
  background: white;
  border: 0.5px solid #cad1d9;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  @media screen and (min-width: 768px) {
  }
`;

export default LabelList;
