import styled from "styled-components";
import labelIcon from "../img/labelicon.png";
import { MilestoneIcon, IssueReopenedIcon } from "@primer/octicons-react";
import { useState, useEffect, useRef } from "react";
import api from "../utils/api";

export interface opener {
  labelOpen: boolean;
}

function LabelButtons() {
  const [labelOpen, setLabelOpen] = useState(true);
  const [defaultColorInput, setDefaultColorInput] = useState("#e99695");
  const [newLabelInfo, setNewLabelInfo] = useState({
    name: "",
    description: "",
    color: "e99695",
  });

  const startCreate = async () => {
    const result = await api.createLabels(
      "emil0519",
      "testing-issues",
      newLabelInfo.name,
      newLabelInfo.description,
      newLabelInfo.color.substring(1)
    );
    console.log(result);
  };

  useEffect(() => console.log(newLabelInfo), [newLabelInfo]);

  return (
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
          <BigSearchBar placeholder="Search all labels" />
        </SubWrapOne>
        <NewLabel>
          <NewLabelText onClick={() => setLabelOpen(true)}>
            New Label
          </NewLabelText>
        </NewLabel>
      </UpperWrapper>
      <SearchBar placeholder="Search all labels" />
      <NewLabelSection labelOpen={labelOpen}>
        <LabelPreview>Label preview</LabelPreview>
        <BigWrapper>
          <LabelInputSection>
            <LabelName>Label Name</LabelName>
            <LabelInput
              placeholder="Label name"
              onChange={(e) =>
                setNewLabelInfo({ ...newLabelInfo, name: e.target.value })
              }
            />
          </LabelInputSection>
          <LabelInputSection>
            <LabelName>Description</LabelName>
            <LabelInput
              placeholder="Description"
              onChange={(e) =>
                setNewLabelInfo({
                  ...newLabelInfo,
                  description: e.target.value,
                })
              }
            />
          </LabelInputSection>
          <ColorInputSection>
            <ColorText>Color</ColorText>
            <LowerWrapper>
              <ColorRoller>
                <RollerIcon />
              </ColorRoller>
              <ColorInput
                maxLength={7}
                value={`${defaultColorInput}`}
                onChange={(e) => {
                  setDefaultColorInput(e.target.value);
                  setNewLabelInfo({ ...newLabelInfo, color: e.target.value });
                }}
              ></ColorInput>
            </LowerWrapper>
          </ColorInputSection>
          <ButtonWrapper>
            <CreateLabelButton>
              <CreateLabelText onClick={() => startCreate()}>
                Create Label
              </CreateLabelText>
            </CreateLabelButton>
            <CancelButton>
              <CancelText onClick={() => setLabelOpen(false)}>
                Cancel
              </CancelText>
            </CancelButton>
          </ButtonWrapper>
        </BigWrapper>
      </NewLabelSection>
    </Wrapper>
  );
}

const BigWrapper = styled.section`
  @media screen and (min-width: 768px) {
    display: flex;
    align-items: center;
    margin-top: 20px;
    margin-right: 6px;
  }
`;

const ButtonWrapper = styled.section`
  display: flex;
  @media screen and (min-width: 768px) {
  }
`;

const CancelText = styled.span`
  color: black;
  font-size: 14px;
  font-weight: 700;
  @media screen and (min-width: 768px) {
  }
`;

const CancelButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid #d1d2d5;
  width: 79.42px;
  height: 32px;
  border-radius: 5px;
  margin-left: 8px;
  cursor: pointer;

  @media screen and (min-width: 768px) {
  }
`;

const CreateLabelText = styled.span`
  color: white;
  font-size: 14px;
  font-weight: 700;
  @media screen and (min-width: 768px) {
  }
`;

const CreateLabelButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #8acd9a;
  border: 1px solid #79b288;
  width: 113.36px;
  height: 32px;
  border-radius: 5px;
  margin-left: 16px;
  cursor: pointer;

  @media screen and (min-width: 768px) {
    order: 2;
  }
`;

const LowerWrapper = styled.div`
  display: flex;
  align-items: center;
  @media screen and (min-width: 768px) {
  }
`;

const ColorText = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: black;
  flex-grow: 1;
  @media screen and (min-width: 768px) {
  }
`;

const LabelInput = styled.input`
  background: #f5f7f9;
  padding: 5px 12px;
  border: 0.5px solid #cad1d9;
  margin-top: 6px;
  width: 90%;
  min-width: 85%;
  border-radius: 5px;
  @media screen and (min-width: 768px) {
  }
`;

const ColorInput = styled.input`
  background: #f5f7f9;
  padding: 5px 12px;
  border: 0.5px solid #cad1d9;
  margin-left: 6px;
  width: 45%;
  border-radius: 5px;
  margin-top: 9px;
`;

const RollerIcon = styled(IssueReopenedIcon)`
  width: 16px;
  height: 16px;
  cursor: pointer;
  @media screen and (min-width: 768px) {
  }
`;

const ColorRoller = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 31px;
  background: #e58b8c;
  border-radius: 5px;
  margin-top: 10px;
  @media screen and (min-width: 768px) {
  }
`;

const ColorInputSection = styled.section`
  display: flex;
  flex-direction: column;
  margin: 0 16px 16px 16px;
  width: 95%;
  @media screen and (min-width: 768px) {
  }
`;

const LabelInputSection = styled.section`
  display: flex;
  flex-direction: column;
  margin: 16px;
  width: 95%;
  @media screen and (min-width: 768px) {
  }
`;

const LabelName = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: black;
  @media screen and (min-width: 768px) {
  }
`;

const LabelPreview = styled.div`
  width: fit-content;
  margin: 16px 16px 0 16px;
  padding-left: 6px;
  padding-right: 6px;
  white-space: no-wrap;
  font-size: 10px;
  height: 24px;
  margin-left: 10px;
  background: #e58b8c;
  color: black;
  font-weight: 600;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media screen and (min-width: 768px) {
    flex-basis: 100;
  }
`;

type NewLabel = {
  labelOpen: boolean;
};
//傳props一定要設定type，在styled component

const NewLabelSection = styled.section<NewLabel>`
  display: ${(props) => (props.labelOpen ? "flex" : "none")};
  flex-direction: column;
  width: 95%;
  height: 328px;
  background: #f5f7f9;
  margin: 20px auto;
  border: 0.5px solid #cad1d9;
  border-radius: 5px;
  @media screen and (min-width: 768px) {
    flex-direction: column;
    height: 149px;
  }
`;

const BigSearchBar = styled.input`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    width: 320px;
    height: 32px;
    padding-left: 32px;
    margin-left: 5px;
    background: #f5f7f9;
    border: 0.5px solid #cad1d9;
    border-radius: 5px;
  }
`;

const SearchBar = styled.input`
  width: 320px;
  height: 32px;
  padding-left: 32px;
  margin-top: 5px;
  background: #f5f7f9;
  border: 0.5px solid #cad1d9;
  border-radius: 5px;
  margin-left: 16px;
  @media screen and (min-width: 768px) {
    display: none;
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
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #288c46;
  }
  @media screen and (min-width: 768px) {
  }
`;

const MileText = styled.span`
  color: black;
  font-size: 14px;
  font-weight: 600;
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
  &:hover {
    background: #f5f7f9;
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
  font-weight: 600;
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
  background: #1760cf;
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
  background: white;
  margin-top: 20px;
  /* display: flex;
    justify-content: space-between;

    margin-right: 16px; */

  @media screen and (min-width: 768px) {
  }
`;

export default LabelButtons;
