import { BellIcon, MarkGithubIcon } from "@primer/octicons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import down from "../img/down.png";
import hamburger from "../img/hamburger.png";
import icon from "../img/icon.png";
import plus from "../img/plus.png";
import SmallDrop from "./Reusable/SmallDrop";

import StyledDropDown from "./Reusable/StyledDropDown";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>();
  const [show, setShow] = useState<boolean>(false);
  const [repo, setRepo] = useState();
  const [hoverOnGit, setHoverOnGit] = useState<boolean>(false);
  const [hoverOnBell, setHoverOnBell] = useState<boolean>(false);
  const [showDrop, setShowDrop] = useState<boolean>(false);
  const [headerDropDown, setHeaderDropDown] = useState<any>([
    {
      content: "",
    },
  ]);
  const [dropInfo, setDropInfo] = useState<any>([
    {
      content: "",
    },
  ]);

  useEffect(() => {
    const localUser: any = localStorage.getItem("supabase.auth.token");
    const localRepo: any = localStorage.getItem("repo");
    setUser(JSON.parse(localUser));
    setRepo(JSON.parse(localRepo));
  }, []);

  useEffect(() => {
    const items = localStorage.getItem("supabase.auth.token");
    if (items !== null && items !== undefined) {

      return;
    } else {

      navigate("/");
    }
  }, []);



  useEffect(() => {
    if (user !== undefined) {
      setHeaderDropDown([
        {
          content: `Sign in as ${user.currentSession.user.user_metadata.user_name}`,
        },
        { content: "|" },
        { content: "Your profile" },
        { content: "Your repositories" },
        { content: "Your codespaces" },
        { content: "Your organizations" },
        { content: "Your projects" },
        { content: "Your stars" },
        { content: "Your gists" },
        { content: "|" },
        { content: "Upgrade" },
        { content: "Try Enterprise" },
        { content: "Feature preview" },
        { content: "Help" },
        { content: "Settings" },
        { content: "|" },
        { content: "Sign out" },
      ]);
      setDropInfo([
        { content: "Dashboard" },
        { content: "|" },
        { content: "Pull request" },
        { content: "|" },
        { content: "Issues" },
        { content: "|" },
        { content: "Codespaces" },
        { content: "|" },
        { content: "Marketplace" },
        { content: "|" },
        { content: "Explore" },
        { content: "|" },
        { content: "Sponsors" },
        { content: "|" },
        { content: "Settings" },
        { content: "|" },
        {
          content: `User: ${user.currentSession.user.user_metadata.user_name}`,
        },
        { content: "|" },
        { content: "Sign out" },
      ]);
    }
  }, [user]);

  if (user === undefined || repo === undefined) {
    return <></>;
  } else {
    return (
      <>
        <Wrapper>
          <BigWrapOne>
            <Search placeholder="Search or jump to..." />
            <GithubIcon onClick={() => navigate("/Repo")} alt="" src={icon} />
            <HeaderText>Pull requests</HeaderText>
            <HeaderText onClick={() => navigate("/Repo")}>Issues</HeaderText>
            <HeaderText>Marketplace</HeaderText>
            <HeaderText>Explore</HeaderText>
          </BigWrapOne>
          <BirWrapTwo>
            <BellIconsIMG fill="white" />
            <Plus alt="" src={plus} />
            <AvatarWrapper>
              <Avatar
                onClick={() => setShow(true)}
                alt=""
                src={user.currentSession.user.user_metadata.avatar_url}
              />
              <Down onClick={() => setShow(true)} alt="" src={down} />
              <DropDownWrap>
                <StyledDropDown
                  controller={headerDropDown}
                  show={show}
                  setShow={setShow}
                />
              </DropDownWrap>
            </AvatarWrapper>
          </BirWrapTwo>
          <Hamburger
            onClick={() => (showDrop ? setShowDrop(false) : setShowDrop(true))}
            alt=""
            src={hamburger}
          ></Hamburger>
          <SmallGitWrap
            onMouseOver={() => setHoverOnGit(true)}
            onMouseOut={() => setHoverOnGit(false)}
          >
            <SmallGithubIcon fill={`${hoverOnGit ? "#bebfc1" : "white"}`} />
          </SmallGitWrap>
          <SmallBellWrap
            onMouseOver={() => setHoverOnBell(true)}
            onMouseOut={() => setHoverOnBell(false)}
          >
            <SmallBell fill={`${hoverOnBell ? "#bebfc1" : "white"}`} />
          </SmallBellWrap>
        </Wrapper>
        <SmallDrop
          controller={dropInfo}
          showDrop={showDrop}
          setShowDrop={setShowDrop}
        />
      </>
    );
  }
}

const DropDownWrap = styled.div`
  display: none;
  @media screen and (min-width: 768px) {
    position: absolute;
    display: block;
    top: 145%;
    right: 0;
    z-index: 4;
  }
`;

const AvatarWrapper = styled.div`
  display: none;
  @media screen and (min-width: 768px) {
    display: flex;
    position: relative;
  }
`;

const Down = styled.img`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    width: 12px;
    height: 12px;
  }
`;

const Avatar = styled.img`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    cursor: pointer;
    width: 20px;
    height: 20px;
    border-radius: 9999px;
    margin-right: 2px;
  }
`;

const BellIconsIMG = styled(BellIcon)`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    width: 16px;
    height: 16px;
    margin-right: 16px;
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
    margin-right: 16px;
    margin-top: 3px;
  }
`;

const SmallGitWrap = styled.section`
  display: block;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const SmallBellWrap = styled.section`
  display: block;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const SmallGithubIcon = styled(MarkGithubIcon)`
  display: block;
  cursor: pointer;
  width: 32px;
  height: 32px;
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
    font-weight: 600;
    color: white;
    cursor: pointer;
    margin-right: 10px;
    &:hover {
      color: #bbbdbe;
    }
  }
`;

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

const SmallBell = styled(BellIcon)`
  width: 18px;
  height: 18px;
  padding-top: 4px;
  cursor: pointer;
  margin-right: 16px;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const GithubIcon = styled.img`
  @media screen and (min-width: 768px) {
    cursor: pointer;
    order: -1;
    width: 40px;
    height: 40px;
    margin-right: 10px;
    margin-left: 32px;
  }
`;

const Hamburger = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 16px;
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
export default Header;
