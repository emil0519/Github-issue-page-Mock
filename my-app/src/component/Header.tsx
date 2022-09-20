import styled from "styled-components";
import bell from "../img/bell.png"
// const bell=require('./img/bell.png')

declare module "*.png" {
    const value: any;
  }
  
  
function Header(){
    return(
        <>
        <Wrapper>
        <Bell alt="" src={bell}></Bell>
        </Wrapper>
        <div>from header</div>
        </>
    )
}

const Bell = styled.img`
  width: 24px;
  height: 24px;
  @media screen and (min-width: 768px) {
  }
`;
const Wrapper = styled.div`
  background: #24292f;
  width: 100%;
  height: 64px;
  @media screen and (min-width: 768px) {
  }
`;
export default Header;