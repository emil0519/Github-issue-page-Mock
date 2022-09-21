import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function LabelList() {
  const dispatch = useDispatch();
  const labels: any = useSelector((state) => state);
  // useEffect(() => {
  //   test();
  // }, []);
  setTimeout(() => test(), 1000);
  // 改進：useInterval loading boolean, lazy loading, suspends
  function test() {
    dispatch({
      type: "",
    });
  }
  useEffect(() => {
    console.log(labels);
  }, [labels]);

  if (labels === undefined) {
    // test();
    return (
      <>
        <h1>Loading</h1>
      </>
    );
  } else {
    return (
      <>
        {labels.map((item: any) => {
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
                <SortText>...</SortText>
              </Sort>
              <BigSort>
                <BigSortText>Edit</BigSortText>
                <BigSortText>Delete</BigSortText>
              </BigSort>
            </Wrapper>
          );
        })}
        {/* <Label>
        <LabelText>documentation</LabelText>
      </Label>
      <LabelDes>Improvements or additions to documentation</LabelDes>
      <Notification>1 open issue or pull request</Notification>
      <Sort>
        <SortText>...</SortText>
      </Sort>
      <BigSort>
        <BigSortText>Edit</BigSortText>
        <BigSortText>Delete</BigSortText>
      </BigSort> */}
        {/* </Wrapper> */}
      </>
    );
  }
}

// const TextWrap = styled.div`

//   @media screen and (min-width: 768px) {
//     display: flex;
//     width: 1280px;
//     height: 18px;
//     justify-content: center;
//   }
// `;

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
