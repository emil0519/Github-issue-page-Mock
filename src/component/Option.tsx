import styled from "styled-components";
import {ChevronLeftIcon, ChevronRightIcon,IssueOpenedIcon} from '@primer/octicons-react'


function Option(){
    return (
        <Wrapper>
            <CodeSection>
            <CodeLeftIMG />
            <CodeRightIMG />
            <CodeText>Code</CodeText>
            </CodeSection>
            <CodeSection>
            <IssueIMG />
            <CodeText>Issues</CodeText>
            </CodeSection>
        </Wrapper>
    )
}

const IssueIMG = styled(IssueOpenedIcon)`
    display:none;
    margin-right:5px;
  @media screen and (min-width: 543) {
    width:15px;
    height:15px;
    display: block;
  }

`;

const CodeRightIMG = styled(ChevronRightIcon)`
    display:none;
  @media screen and (min-width: 543) {
    width:15px;
    height:15px;
    display: block
  }

`;

const CodeLeftIMG = styled(ChevronLeftIcon)`
        display:none;
  @media screen and (min-width: 543) {
    width:15px;
    height:15px;
    display: block
  }
/* imported icon cannot be displayed none, need to fix afterwards */

`;

const CodeText = styled.span`
    color: black;
    font-size: 16px;
  @media screen and (min-width: 768px) {
    
  }

`;



const CodeSection = styled.div`
    display: flex;
    align-items: center;
    width: 75.38px;
    height: 30px;
    background: #f5f7f9;
    border-radius: 5px;
    margin-left: 16px;
    margin-right: 5px;
    cursor: pointer;
    &:hover{
        background: #e7ebef
    }
  @media screen and (min-width: 768px) {
    
  }

`;


const Wrapper = styled.section`
    display: flex;
    background:#f5f7f9;
    height: 48px;
  @media screen and (min-width: 768px) {
    
  }

`;

export default Option;