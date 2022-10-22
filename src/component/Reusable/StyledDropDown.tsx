import { useEffect } from "react";
import styled from "styled-components";
import { superbase } from "../../utils/client";

type ControllerProps = {
  controller: {
    content: string;
  }[];
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

function StyledDropDown({ controller, show, setShow }: ControllerProps) {
  async function signOut() {
    await superbase.auth.signOut();
    localStorage.clear();
    window.location.assign(`/`);
  }

  useEffect(() => console.log(show), [show]);

  if (controller === undefined) {
    return <></>;
  }

  return (
    <>
      <SpaceOutside
        show={show}
        onClick={() => {
          setShow(false);
        }}
      />
      <Wrapper show={show}>
        {controller.map((item) =>
          item.content === "|" ? (
            <Line />
          ) : item.content === "Sign out" ? (
            <EachItem
              onClick={() => {
                signOut();
                setShow(false);
              }}
            >
              {item.content}
            </EachItem>
          ) : (
            <EachItem onClick={() => setShow(false)}>{item.content}</EachItem>
          )
        )}
      </Wrapper>
    </>
  );
}

const Line = styled.section`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    width: 100%;
    height: 1px;
    background-color: #d5dae1;
  }
`;

type ShowProps = {
  show: boolean;
};

const SpaceOutside = styled.section<ShowProps>`
  display: none;
  @media screen and (min-width: 768px) {
    display: ${(props) => (props.show ? "block" : "none")};
    position: fixed;
    width: ${(props) => (props.show ? "103%" : "0")};
    height: ${(props) => (props.show ? "100vh" : "0")};
    top: 1%;
    right: 13%;
    background-color: black;
    opacity: 0;
    z-index: 2;
  }
`;

const Wrapper = styled.section<ShowProps>`
  display: none;
  @media screen and (min-width: 768px) {
    display: ${(props) => (props.show ? "flex" : "none")};
    flex-direction: column;
    width: max-content;
    border-radius: 0.375rem;
    z-index: 6;
    /* position: ${(props) => props.show && "fixed"};
    right: ${(props) => props.show && "30px"}; */
  }
`;

const EachItem = styled.section`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    padding: 10px;
    font-size: 12px;
    background: white;
    cursor: pointer;
    &:hover {
      color: white;
      background: #1760cf;
    }
  }
`;

export default StyledDropDown;
