import {
  IssueReopenedIcon,
  MilestoneIcon,
  SearchIcon,
  TagIcon,
} from "@primer/octicons-react";
import { useWindowWidth } from "@react-hook/window-size";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useGenerateRandomColor from "../../utils/useGenerateRandomColor";
import Filter from "../IssueList/Filter";

export interface opener {
  labelOpen: boolean;
}

function LabelButtonsIssues() {
  const windowWidth = useWindowWidth();
  const [labelOpen, setLabelOpen] = useState(false);
  const navigate = useNavigate();
  const [defaultColor, setDefaultColor] = useState("#e99695");
  const [newLabelInfo, setNewLabelInfo] = useState({
    name: "",
    description: "",
    color: "#e99695",
  });
  const [labelText, setLabelText] = useState("Create Label");
  const { color, generateColor } = useGenerateRandomColor();
  useEffect(() => {
    generateColor();
    setDefaultColor(color);
  }, []);
  useEffect(() => {
    setDefaultColor(`#${color}`);

    setNewLabelInfo({ ...newLabelInfo, color: `#${color}` });
  }, [color]);

  const [defaultLabelPreview, setDefaultLabelPreview] =
    useState("Label Preview");
  const [createLabelChange, setCreateLabelChange] = useState(false);
  const [redBorder, setRedBorder] = useState(false);
  useEffect(() => {
    //validation on input
    newLabelInfo.color.includes("#") ? setRedBorder(false) : setRedBorder(true);
    newLabelInfo.name.length >= 1
      ? setCreateLabelChange(true)
      : setCreateLabelChange(false);
  }, [newLabelInfo]);
  const [created, setCreated] = useState(0);
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <UpperWrapper>
        <SubWrapOne>
          <LabelSection onClick={() => navigate("/Label")}>
            <LabelSubSection>
              <LabelTag />
              <LabelText>Labels</LabelText>
            </LabelSubSection>
          </LabelSection>
          <MileSection>
            <MileStoneSubSection>
              <MileStoneIMG />
              <MileText>Milestones</MileText>
            </MileStoneSubSection>
          </MileSection>
        </SubWrapOne>
        <NewLabel onClick={() => navigate("/NewIssue")}>
          <NewLabelText>
            {windowWidth <= 768 ? "New" : "New Issue"}
          </NewLabelText>
        </NewLabel>
      </UpperWrapper>
      <Filter />
    </Wrapper>
  );
}

const LabelTag = styled(TagIcon)`
  width: 14.78px;
  height: 14.78px;
  margin-right: 5px;
`;

const SearchIconIMG = styled(SearchIcon)`
  width: 21px;
  height: 21px;
  position: absolute;
  top: 25%;
  left: 20px;
  @media screen and (min-width: 768px) {
    width: 0;
    height: 0;
  }
`;

const BigSearchIcon = styled(SearchIcon)`
  display: none;
  @media screen and (min-width: 768px) {
    width: 21px;
    height: 21px;
    position: absolute;
    top: 21%;
    left: 13px;
    display: block;
  }
`;

const SearchBarWrapper = styled.div`
  position: relative;
  @media screen and (min-width: 768px) {
  }
`;

const BigSearchBarWrapper = styled(SearchBarWrapper)`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    position: relative;
  }
`;

type Col = {
  colors: string;
};

const InputWrapper = styled.section`
  position: relative;
  width: 100%;
  @media screen and (min-width: 768px) {
  }
`;

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

type Changer = {
  createLabelChange: boolean;
  redBorder: boolean;
};

const CreateLabelButton = styled.div<Changer>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.createLabelChange && props.redBorder === false
      ? "#2da454"
      : "#8acd9a"};
  border: 1px solid #79b288;
  width: 113.36px;
  height: 32px;
  border-radius: 5px;
  margin-left: 16px;
  cursor: ${(props) => (props.createLabelChange ? "pointer" : "none")};
  pointer-events: ${(props) =>
    props.createLabelChange && props.redBorder === false ? "all" : "none"};
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

const RollerIcon = styled(IssueReopenedIcon)`
  width: 16px;
  height: 16px;
  cursor: pointer;
  @media screen and (min-width: 768px) {
  }
`;

const ColorRoller = styled.div<Col>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 31px;
  background: ${(props) => props.colors};
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

const LabelPreview = styled.div<Col>`
  width: max-content;
  margin: 16px 16px 0 16px;
  padding-left: 6px;
  padding-right: 6px;
  white-space: no-wrap;
  font-size: 10px;
  height: 24px;
  margin-left: 10px;
  background: ${(props) => props.colors};
  color: white;
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

type NewLabels = {
  labelOpen: boolean;
};
//傳props一定要設定type，在styled component

const NewLabelSection = styled.section<NewLabels>`
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
  margin-left: 0;
  @media screen and (min-width: 768px) {
    justify-content: flex-end;
    order: 2;
    width: 413px;
    margin: 0;
    /* margin-right: 16px; */
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
  margin-left: 16px;
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
  color: black;
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
  background: white;
  width: 97px;
  height: 32px;
  align-items: center;
  display: flex;
  justify-content: center;
  border: 1px solid #d1d2d5;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  /* margin-left: 16px; */
  cursor: pointer;
  &:hover {
    background: #f5f7f9;
  }
  @media screen and (min-width: 768px) {
  }
`;

const Wrapper = styled.section`
  background: white;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  @media screen and (min-width: 768px) {
    flex-wrap: nowrap;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
`;

export default LabelButtonsIssues;
