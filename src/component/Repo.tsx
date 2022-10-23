import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import repoLogo from "../img/repo.svg";
import Watch from "./Watch";

function Repo() {
  const [repo, setRepo] = useState();
  const [user, setUser] = useState<any>();
  const navigate = useNavigate();

  useEffect(() => {
    const localUser: any = localStorage.getItem("supabase.auth.token");
    const localRepo: any = localStorage.getItem("repo");
    setUser(JSON.parse(localUser));
    setRepo(JSON.parse(localRepo));
  }, []);

  if (user === undefined && repo === undefined) {
    return <></>;
  }
  return (
    <TitleWrapper>
      <RepoWrapper>
        <RepoLogo alt="" src={repoLogo} />
        <UserName onClick={() => navigate("/Repo")}>
          {user.currentSession.user.user_metadata.user_name}{" "}
        </UserName>
        <Slash>/</Slash>
        <RepoName onClick={() => navigate("/App")}>{repo}</RepoName>
        <RepoType>Public</RepoType>
      </RepoWrapper>
      <Watch />
    </TitleWrapper>
  );
}

const RepoWrapper = styled.section`
  display: flex;
  margin: 16px;
  align-items: center;
  @media screen and (min-width: 768px) {
  }
`;

const RepoType = styled.span`
  font-size: 14px;
  color: #4d555e;
  border: 0.5px solid #cad1d9;
  border-radius: 25px;
  margin-left: 8px;
  padding: 5px;
  @media screen and (min-width: 768px) {
  }
`;

const RepoName = styled.span`
  font-weight: 700;
  font-size: 20px;
  color: #1760cf;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    text-decoration-color: #1760cf;
  }
  @media screen and (min-width: 768px) {
  }
`;

const Slash = styled.span`
  font-size: 20px;
  color: #4d555e;
  margin: 0 2px;
  @media screen and (min-width: 768px) {
  }
`;

const UserName = styled.span`
  font-size: 20px;
  color: #1760cf;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    text-decoration-color: #1760cf;
  }
  @media screen and (min-width: 768px) {
  }
`;

const RepoLogo = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 8px;
  @media screen and (min-width: 768px) {
  }
`;

const TitleWrapper = styled.section`
  display: flex;
  align-items: center;
  background: #f5f7f9;
  justify-content: space-between;
  width: 100%;
  @media screen and (min-width: 768px) {
    /* display: flex; 
    align-items: center;
    margin-right: 10px; */
  }
`;

export default Repo;
