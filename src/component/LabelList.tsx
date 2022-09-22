import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import api from "../utils/api";

function LabelList() {
  const dispatch = useDispatch();

  const [label, setLabel]: any = useState();
  const updatedLabels: any = useSelector((state) => state);
  console.log(process.env.REACT_APP_TOKEN);

  useEffect(() => {
    (async () => {
      setLabel(await api.getLabels("emil0519", "testing-issues"));
    })().catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setLabel(updatedLabels);
    console.log("update");
  }, [updatedLabels]);

  useEffect(() => {
    dispatch({
      type: "getList",
      payload: { label },
    });
  }, [label]);

  useEffect(() => {
    console.log("updated Label refresh");
  }, [updatedLabels]);

  useEffect(() => console.log(label), []);

  // const labels: any = useSelector((state) => state);
  const [clickIndex, setClickIndex] = useState(-1);
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
              <Sort>
                <SortText onClick={() => setClickIndex(index)}>...</SortText>
                <DropDown
                  key={index}
                  index={index}
                  isActive={index === clickIndex ? true : false}
                  clickIndex={clickIndex}
                >
                  {clickIndex}
                  <DropDownText>Edit</DropDownText>
                  <DropDownText>Delete</DropDownText>
                </DropDown>
              </Sort>
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
  isActive: boolean;
  clickIndex: number;
  index: number;
};

const DropDown = styled.div<Active>`
  display: ${(props) => (props.index === props.clickIndex ? "flex" : "none")};
  /* display: flex; */
  position: absolute;
  top: 100%;
  right: 0;
  width: 160px;
  height: 82px;
  background: yellow;
  flex-direction: column;

  @media screen and (min-width: 1012px) {
  }
`;

const LabelWrap = styled.div`
  width: 15%;
  height: 24px;
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

const Sort = styled.div`
  position: relative;
  width: 42px;
  height: 28px;
  background: #f5f7f9;
  border: 0.5px solid #cad1d9;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;
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
  display: none;
  width: 95vw;
  height: 55px;
  margin: 0 auto;
  background: white;
  border: 0.5px solid #cad1d9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (min-width: 768px) {
  }
`;

export default LabelList;
