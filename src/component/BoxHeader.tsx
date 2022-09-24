import styled from "styled-components";
import { TriangleDownIcon } from "@primer/octicons-react";
import LabelList from "./LabelList";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { useEffect, useState } from "react";
import api from "../utils/api";
import type { RootState, AppDispatch } from "../state/store";

function BoxHeader() {
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  let updatedLabels: any = useAppSelector((state) => state?.reducer);
  const [labels, setLabel]: any = useState();
  useEffect(() => {
    (async () => {
      setLabel(await api.getLabels("emil0519", "testing-issues"));
    })().catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    setLabel(updatedLabels);
    // 每次有新label的時候會re-render一次
  }, [updatedLabels]);

  // useEffect(() => console.log(labels), [labels]);
  if (labels === undefined) {
    return <></>;
  }

  return (
    <>
      <Wrapper>
        <Header>
          <HeaderText>{labels.length} labels</HeaderText>
          {/* why cannot read properties of undefined even if conditional statement
            set */}
          <SortSection>
            <SortText>Sort</SortText>
            <SortDown />
          </SortSection>
        </Header>
        <LabelList />
      </Wrapper>
    </>
  );
}
// }

const SortDown = styled(TriangleDownIcon)`
  width: 10px;
  height: 10px;
  margin-top: 4px;
  @media screen and (min-width: 768px) {
  }
`;

const SortText = styled.span`
  display: flex;
  color: #4d555e;
  font-size: 10px;
  @media screen and (min-width: 768px) {
  }
`;

const SortSection = styled.div`
  display: flex;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  @media screen and (min-width: 768px) {
  }
`;

const HeaderText = styled.span`
  color: black;
  font-size: 14px;
  font-weight: 700;
  margin-left: 10px;
  @media screen and (min-width: 768px) {
  }
`;

const Wrapper = styled.section`
  width: 100%;
  margin: 16px auto 0 auto;
  background: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media screen and (min-width: 768px) {
  }
`;

const Header = styled.div`
  width: 95vw;
  height: 55px;
  margin: 0 auto;
  background: #f5f7f9;
  border: 0.5px solid #cad1d9;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (min-width: 768px) {
  }
`;

export default BoxHeader;
