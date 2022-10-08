import styled from "styled-components";
import repo from "../../img/repo.png";

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
  padding: 16px;
  align-items: center;
  background: #f5f7f9;
  @media screen and (min-width: 768px) {
    /* display: flex; 
    align-items: center;
    margin-right: 10px; */
  }
`;

type RepoProps = {
  /**
   * Is this the principal call to action on the page?
   */
  OWNER: string;
  REPO: string;
  TYPE: string;
};

export const Repo = ({ OWNER = "emil0519", ...props }: RepoProps) => {
  return (
    <TitleWrapper>
      <RepoLogo alt="" src={repo} />
      <UserName>{OWNER} </UserName>
      <Slash>/</Slash>
      <RepoName>testing-issues</RepoName>
      <RepoType>Public</RepoType>
    </TitleWrapper>
  );
};
