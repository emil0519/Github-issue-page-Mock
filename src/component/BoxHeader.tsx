import { TriangleDownIcon } from "@primer/octicons-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useGetAllIssuesQuery } from "../state/issueRTK";

function BoxHeader() {
  const [userInfo, setUserInfo] = useState<any>();
  const [skip, setSkip] = useState(true);
  const [repo, setRepo] = useState("/testing-issues");
  useEffect(() => {
    const items = localStorage.getItem("supabase.auth.token");
    const repo = localStorage.getItem("repo");
    if (
      items !== null &&
      items !== undefined &&
      repo !== undefined &&
      repo !== null
    ) {
      setUserInfo(JSON.parse(items));
      setRepo(JSON.parse(repo));
    }
  }, []);

  useEffect(() => {
    if (userInfo !== undefined && repo !== undefined) {
      setSkip(false);
    }
  }, [userInfo, repo]);

  const { data } = useGetAllIssuesQuery(
    {
      baseType: "repos",
      type: "/labels",
      name: `/${
        skip ? "" : userInfo.currentSession.user.user_metadata.user_name
      }`,
      repo: `/${skip ? "" : repo}`,
      query: "",
      token: `${skip ? "" : userInfo.currentSession.provider_token}`,
    },
    { skip: skip }
  );

  if (data === undefined) {
    return <></>;
  }

  return (
    <>
      <Wrapper>
        <Header>
          <HeaderText>{data.length} labels</HeaderText>
          <SortSection>
            <SortText>Sort</SortText>
            <SortDown />
          </SortSection>
        </Header>
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
