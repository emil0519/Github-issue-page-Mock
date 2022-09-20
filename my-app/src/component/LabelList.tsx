import styled from "styled-components";

function LabelList(){
    return(
        <Wrapper>
            <Label>
                <LabelText>documentation</LabelText>
            </Label>
            <LabelDes>Improvements or additions to documentation</LabelDes>
            <Notification>1 open issue or pull request</Notification>
            <Sort><SortText>...</SortText></Sort>
            <BigSort><BigSortText>Edit</BigSortText><BigSortText>Delete</BigSortText></BigSort>
        </Wrapper>
    )
}

const BigSortText = styled.span`
    display: none;
  @media screen and (min-width: 1012px) {
    display: block;
    font-size:12px;
    color:#4d555e;
    font-weight: 500;
    cursor: pointer;
    &:nth-child(2) {
        margin-right: 10px;
        margin-left:15px;
    }
    &:hover{
        color:#1760cf;
        text-decoration: underline;
        text-decoration-color: #1760cf;
    }
  }
`;

const BigSort = styled.div`
    display: none;
  @media screen and (min-width: 1012px) {
    display: flex;
  }
`;

const Notification = styled.span`
    display: none;
  @media screen and (min-width: 768px) {
    display: block;
    font-size:12px;
    color:#4d555e;
    font-weight: 500;
    cursor: pointer;
    &:hover{
        color:#1760cf;
    }
  }
`;

const LabelDes = styled.span`
    display: none;
  @media screen and (min-width: 768px) {
    display: block;
    font-size:12px;
    color:#4d555e;
    font-weight: 500;
  }
`;

const SortText = styled.span`
    font-size:24px;
    margin-bottom: 12px;
`;

const Sort = styled.div`
    width: 42px;
    height: 28px;
    background: #f5f7f9;
    border: 0.5px solid #cad1d9;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-right: 10px;
    &:hover{
        background: #1760cf;
        > * {
            color:white;
        }
    }
  @media screen and (min-width: 1012px) {
    display:none;
  }
`;

const LabelText = styled.span`
    font-size:12px;
    font-weight: 700;
    color: white;
  @media screen and (min-width: 768px) {
    
  }
`;

const Label = styled.div`
    width: 109px;
    height: 24px;
    margin-left:10px;
    background: #126bbf;
    border-radius:15px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  @media screen and (min-width: 768px) {
    
  }
`;

const Wrapper = styled.section`
    width: 95vw;
    height: 55px;
    margin:0 auto;
    background: white;
    border: 0.5px solid #cad1d9;
    display: flex;
    align-items: center;
    justify-content: space-between;
  @media screen and (min-width: 768px) {


  }
`;

export default LabelList;