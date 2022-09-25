import styled from "styled-components";
import hamburger from "../img/hamburger.png";
import icon from "../img/icon.png";
import bell from "../img/bell.png";
import plus from "../img/plus.png";
import avatar from "../img/avatar.png";
import down from "../img/down.png";

const Down = styled.img`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    width: 12px;
    height: 12px;
    /* padding-top: 2px; */
  }
`;

const Avatar = styled.img`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    width: 20px;
    height: 20px;
    /* padding-top: 2px; */
    margin-right: 2px;
  }
`;

const BigBellIcons = styled.img`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    width: 16px;
    height: 16px;
    /* padding-top: 2px; */
    margin-right: 5px;
  }
`;

const BirWrapTwo = styled.section`
  display: none;
  @media screen and (min-width: 768px) {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
`;

const Plus = styled.img`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    width: 27.59px;
    height: 21px;
  }
`;

const SmallGithubIcon = styled.img`
  display: block;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const BigWrapOne = styled.section`
  display: none;
  @media screen and (min-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const HeaderText = styled.span`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    font-size: 16px;
    color: white;
    cursor: pointer;
    margin-right: 10px;
    &:hover {
      color: #bbbdbe;
    }
  }
`;

// const SearchButton = styled.img`
//   display: none;
//   @media screen and (min-width: 768px) {
//     display: block;
//     width: 19.86px;
//     height: 20px;
//   }

// `;

const Search = styled.input`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    width: 264.14px;
    height: 28px;
    color: white;
    background: #24292f;
    border-radius: 10px;
    border: 1px solid #57606a;
    padding: 5px;
    margin-right: 10px;
  }
`;

const BellIcons = styled.img`
  width: 16px;
  height: 16px;
  padding-top: 4px;
  cursor: pointer;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const GithubIcon = styled.img`
  /* width: 32px;
  height: 32px;
  cursor: pointer; */
  /* background-image: url(${icon}); */
  @media screen and (min-width: 768px) {
    order: -1;
    width: 35px;
    height: 35px;
    margin-right: 10px;
  }
`;

const Hamburger = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;
const Wrapper = styled.div`
  background: #24292f;
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (min-width: 768px) {
  }
`;

type HeaderProps = {
  /**
   * Is this the principal call to action on the page?
   */
  TEXT: string;
};

export const Header = ({ TEXT = "Issues", ...props }: HeaderProps) => {
  return (
    <>
      <Wrapper>
        <BigWrapOne>
          <Search placeholder="Search or jump to..." />
          {/* <SearchButton alt="" src="searchButton"></SearchButton> */}
          <GithubIcon alt="" src={icon} />
          <HeaderText>Pull requests</HeaderText>
          <HeaderText>Issues</HeaderText>
          <HeaderText>Marketplace</HeaderText>
          <HeaderText>Explore</HeaderText>
        </BigWrapOne>
        <BirWrapTwo>
          <BigBellIcons alt="" src={bell} />
          <Plus alt="" src={plus} />
          <Avatar alt="" src={avatar} />
          <Down alt="" src={down} />
        </BirWrapTwo>
        <Hamburger alt="" src={hamburger}></Hamburger>
        <SmallGithubIcon alt="" src={icon} />
        <BellIcons alt="" src={bell} />
      </Wrapper>
    </>
  );
};
