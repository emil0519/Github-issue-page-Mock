import styled from "styled-components";

function Footer() {
  return (
    <>
      <FooterLine />
      <FooterInfo>
        <FooterText>Terms</FooterText>
      </FooterInfo>
    </>
  );
}

const FooterText = styled.span`
  font-size: 6px;
  color: #1760cf;
  @media screen and (min-width: 768px) {
  }
`;

const FooterInfo = styled.section`
  display: flex;
  width: 85%;
  flex-wrap: wrap;
  align-items: center;
  @media screen and (min-width: 768px) {
  }
`;

const FooterLine = styled.div`
  border-top: 1px solid #d3d9e0;
  width: 85%;
  margin: 40px auto;
  @media screen and (min-width: 768px) {
  }
`;

export default Footer;
