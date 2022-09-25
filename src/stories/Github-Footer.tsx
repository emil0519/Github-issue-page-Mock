import styled from 'styled-components';
import { MarkGithubIcon } from '@primer/octicons-react';

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

type FooterProps = {
  /**
   * Is this the principal call to action on the page?
   */
  TEXT: string;
};

export const Footer = ({ TEXT = 'Terms', ...props }: FooterProps) => {
  return (
    <>
      <FooterLine />
      <FooterInfo>
        <FooterText>{TEXT}</FooterText>
        <FooterText>Privacy</FooterText>
        <FooterText>Security</FooterText>
        <FooterText>Status</FooterText>
        <FooterText>Docs</FooterText>
        <FooterText>Contract Github</FooterText>
        <FooterText>Pricing</FooterText>
        <FooterText>API</FooterText>
        <FooterText>Training</FooterText>
        <FooterText>Blog</FooterText>
        <FooterText>About</FooterText>
      </FooterInfo>
      <MarkGithubIcon size={40} fill="gray" />
    </>
  );
};
