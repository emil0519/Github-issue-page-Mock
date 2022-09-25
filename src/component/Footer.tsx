import styled from "styled-components";
import greyGithub from "../img/grey-github.png";
function Footer() {
  const footerWords = [
    { name: "Terms" },
    { name: "Privacy" },
    { name: "Security" },
    { name: "Status" },
    { name: "Docs" },
    { name: "Contact GitHub" },
    { name: "Pricing" },
    { name: "API" },
    { name: "Training" },
    { name: "Blog" },
    { name: "About" },
  ];
  return (
    <>
      <FooterLine />
      <FooterWrapper>
        <FooterInfo>
          {footerWords.map((item) => {
            return <FooterText>{item.name}</FooterText>;
          })}
        </FooterInfo>
        <GithubWrapper>
          <GithubLogo alt="" src={greyGithub}></GithubLogo>
          <GithubText>© 2022 GitHub, Inc.</GithubText>
        </GithubWrapper>
      </FooterWrapper>
    </>
  );
}

const FooterWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 85%;
  margin: 0 auto 50px auto;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 1012px) {
    flex-direction: row;
    justify-content: flex-start;
    margin-left: 5px;
  }
`;

const GithubText = styled.span`
  font-size: 9px;
  color: #57606a;
  @media screen and (min-width: 1012px) {
    width: 117.25px;
  }
`;

const GithubLogo = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  @media screen and (min-width: 768px) {
  }
`;

const GithubWrapper = styled.section`
  display: flex;
  align-items: center;
  margin-top: 14px;
  @media screen and (min-width: 768px) {
    margin-top: 0;
  }
`;

const FooterText = styled.span`
  font-size: 6px;
  margin-top: 5px;
  color: #1760cf;
  margin-right: 13px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    text-decoration-color: #1760cf;
  }
  @media screen and (min-width: 768px) {
  }
`;

const FooterInfo = styled.section`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  order: -1;
  width: 85%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 1012px) {
    order: 1;
  }
`;

const FooterLine = styled.div`
  border-top: 1px solid #d3d9e0;
  width: 85%;
  margin: 40px auto;
  flex-direction: column;
  @media screen and (min-width: 768px) {
  }
`;

export default Footer;
