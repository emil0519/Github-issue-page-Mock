import styled from "styled-components";
import labelIcon from "../img/labelicon.png"
import {MilestoneIcon} from '@primer/octicons-react'


function LabelButtons(){
    return(
        <Wrapper>
            <UpperWrapper>
            <SubWrapOne>
            <LabelSection>
            <LabelSubSection>
            <LabelIcon alt="" src={labelIcon}></LabelIcon>
            <LabelText>Labels</LabelText>
            </LabelSubSection>
            </LabelSection>
            <MileSection>
            <MileStoneSubSection>
            <MileStoneIMG />
            <MileText>Milestones</MileText>
            </MileStoneSubSection>
            </MileSection>
            <BigSearchBar placeholder="Search all labels"/>
            </SubWrapOne>
            <NewLabel><NewLabelText>New Label</NewLabelText></NewLabel>
            </UpperWrapper>
            <SearchBar placeholder="Search all labels"/>
        </Wrapper>
    )
}

const BigSearchBar = styled.input`
    display:none;
  @media screen and (min-width: 768px) {
    display:block;
    width:320px;
    height: 32px;
    padding-left: 32px;
    margin-left: 5px;
    background: #f5f7f9;
    border: 0.5px solid #cad1d9;
    border-radius: 5px;
  }
`;

const SearchBar = styled.input`
    width:320px;
    height: 32px;
    padding-left: 32px;
    margin-top: 5px;
    background: #f5f7f9;
    border: 0.5px solid #cad1d9;
    border-radius: 5px;
  @media screen and (min-width: 768px) {
    display:none
  }
`;

const UpperWrapper = styled.div`
    /* width:40%; */
    display: flex;
    justify-content: space-between;

    /* margin-right: 16px; */
    width: 95%;
    margin: 0 auto;
    
  @media screen and (min-width: 768px) {
 
  }
`;

const SubWrapOne = styled.div`
    /* width:40%; */
    display: flex;
    
  @media screen and (min-width: 768px) {
 
  }
`;

const NewLabelText = styled.span`
    
    font-size: 14px;
    font-weight: 600;
    color: white;
    text-align: center;
    
  @media screen and (min-width: 768px) {
 
  }
`;

const NewLabel = styled.div`
    background: #29994a;
    width: 98.69px;
    height: 32px;
    font-size: 14px;
    font-weight: 600;
    color: white;
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: center;
    border-radius:5px;
    cursor: pointer;
    &:hover{
        background: #288c46;
    }
  @media screen and (min-width: 768px) {
 
  }
`;

const MileText = styled.span`
    color: black;
    font-size: 14px;
    font-weight:600;
  @media screen and (min-width: 768px) {
 
  }
`;

const MileSection = styled.section`
    display: flex;
    align-items: center;
    width: 125.38px;
    height: 32px;
    background: white;
    justify-content: center;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border: 0.5px solid #dbe0e5;
    cursor: pointer;
  @media screen and (min-width: 768px) {
 
  }
`;

const MileStoneSubSection = styled.div`
    display: flex;
    align-items: center;
    width: 125.38px;
    height: 32px;
    justify-content: center;
    &:hover{
        background: #f5f7f9
    }
  @media screen and (min-width: 768px) {
 
  }
`;

const MileStoneIMG = styled(MilestoneIcon)`
  
  @media screen and (min-width: 768px) {
 
  }

`;

const LabelText = styled.span`
    font-size: 14px;
    font-weight:600;
    color: white;
  @media screen and (min-width: 768px) {
 
  }

`;


const LabelIcon = styled.img`
    width: 14px;
    height: 14px;
  @media screen and (min-width: 768px) {
 
  }

`;

const LabelSubSection = styled.div`
    display: flex;
    align-items: center;
  @media screen and (min-width: 768px) {
 
  }

`;

const LabelSection = styled.section`
    background:#1760cf;
    width: 97px;
    height: 32px;
    align-items: center;
    display: flex;
    justify-content: center;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    cursor: pointer;

  @media screen and (min-width: 768px) {
 
  }

`;


const Wrapper = styled.section`
    background:white;
    margin-top: 20px;
    /* display: flex;
    justify-content: space-between;

    margin-right: 16px; */

  @media screen and (min-width: 768px) {
 
  }

`;

export default LabelButtons