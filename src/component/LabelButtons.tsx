import {
  IssueReopenedIcon,
  MilestoneIcon,
  SearchIcon,
} from "@primer/octicons-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import labelIcon from "../img/labelicon.png";
import { useUpdateMutation } from "../state/issueRTK";
import useGenerateRandomColor from "../utils/useGenerateRandomColor";
import ColorBricks from "./ColorBricks";

export interface opener {
  labelOpen: boolean;
}

function LabelButtons() {
  const [update] = useUpdateMutation();
  const [labelOpen, setLabelOpen] = useState(false);
  const [defaultColor, setDefaultColor] = useState("e99695");
  const [newLabelInfo, setNewLabelInfo] = useState({
    name: "",
    description: "",
    color: "e99695",
  });
  const [labelText, setLabelText] = useState("Create Label");
  const { color, generateColor } = useGenerateRandomColor();
  useEffect(() => {
    generateColor();
    setDefaultColor(color);
    setNewLabelInfo({
      ...newLabelInfo,
      color: color,
    });
  }, []);
  useEffect(() => {
    setDefaultColor(`${color}`);

    setNewLabelInfo({ ...newLabelInfo, color: `${color}` });
  }, [color]);

  const [defaultLabelPreview, setDefaultLabelPreview] =
    useState("Label Preview");
  const [createLabelChange, setCreateLabelChange] = useState(false);
  const [redBorder, setRedBorder] = useState(false);

  const [repo, setRepo] = useState("");
  const [userInfo, setUserInfo] = useState<any>();
  useEffect(() => {
    const items = localStorage.getItem("supabase.auth.token");
    const repo = localStorage.getItem("repo");
    if (
      items !== null &&
      items !== undefined &&
      repo !== undefined &&
      repo !== null
    ) {
      setUserInfo(JSON.parse(items));
      setRepo(JSON.parse(repo));
    }
  }, []);

  useEffect(() => {
    //validation on input
    newLabelInfo.name.length >= 1
      ? setCreateLabelChange(true)
      : setCreateLabelChange(false);
  }, [newLabelInfo]);
  const [created, setCreated] = useState(0);

  const startCreate = async () => {
    const body = {
      name: newLabelInfo.name,
      description: newLabelInfo.description,
      color: newLabelInfo.color,
    };

    const message = await update({
      baseType: "repos",
      type: "/labels",
      name: `/${userInfo.currentSession.user.user_metadata.user_name}`,
      repo: `/${repo}`,
      query: ``,
      content: JSON.stringify(body),
      token: userInfo.currentSession.provider_token,
    });

    if (message.error === undefined) {
      setNewLabelInfo({
        name: "",
        description: "",
        color: "#e99695",
      });
      setCreateLabelChange(false);
      setLabelText("Saving ...");
      setTimeout(() => setLabelOpen(false), 1000);
    } else {
      alert(
        `Your ${
          message.error.data.errors[0].resource
        } have some problem, it may be caused by ${
          message.error.data.errors[0].code === "custom"
            ? message.error.data.errors[0].message
            : message.error.data.errors[0].code
        }.`
      );
    }

    // await api
    //   .createLabels(
    //     "emil0519",
    //     "testing-issues",
    //     newLabelInfo.name,
    //     newLabelInfo.description,
    //     newLabelInfo.color.substring(1)
    //   )
    //   .then((data) => {
    //     if (
    //       data.message !== "Validation Failed" ||
    //       data.message === undefined
    //     ) {
    //       dispatch({
    //         type: "createList",
    //         payload: { data },
    //       });
    // setCreateLabelChange(false);
    // setLabelText("Saving ...");
    // setTimeout(() => setLabelOpen(false), 1000);
    //     } else if (data.errors !== undefined) {
    //       alert(
    //         `Your label ${
    //           data.errors[0].field
    //         } is ${data.errors[0].code.replace("_", " ")}. Please try again.`
    //       );
    //     } else {
    //       alert(
    //         "Something in your input went wrong, please check if \n\tYour label is already exist or \n\tColor is not in hex format."
    //       );
    //     }
    //   });
  };

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
          <BigSearchBarWrapper>
            <BigSearchIcon />
            <BigSearchBar placeholder="Search all labels" />
          </BigSearchBarWrapper>
        </SubWrapOne>
        <NewLabel>
          <NewLabelText
            onClick={() => {
              setLabelOpen(true);
              setLabelText("Create Label");
              setCreated(created + 1);
              setDefaultLabelPreview("Label Preview");
              if (labelOpen) {
                setLabelOpen(false);
              }
            }}
          >
            New Label
          </NewLabelText>
        </NewLabel>
      </UpperWrapper>
      <SearchBarWrapper>
        <SearchIconIMG />
        <SearchBar placeholder="Search all labels" />
      </SearchBarWrapper>
      <NewLabelSection labelOpen={labelOpen}>
        <LabelPreview colors={defaultColor}>{defaultLabelPreview}</LabelPreview>
        <BigWrapper>
          <LabelInputSection>
            <LabelName>Label Name</LabelName>
            <LabelInput
              value={newLabelInfo.name}
              placeholder="Label name"
              onChange={(e) => {
                setNewLabelInfo({ ...newLabelInfo, name: e.target.value });
                setDefaultLabelPreview(e.target.value);
              }}
            />
          </LabelInputSection>
          <LabelInputSection>
            <LabelName>Description</LabelName>
            <LabelInput
              value={newLabelInfo.description}
              placeholder="Description (Optional)"
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
              <ColorRoller
                colors={defaultColor}
                onClick={() => generateColor()}
              >
                <RollerIcon />
              </ColorRoller>
              <InputWrapper>
                <ColorBricks
                  color={color}
                  setNewLabelInfo={setNewLabelInfo}
                  newLabelInfo={newLabelInfo}
                  setDefaultColor={setDefaultColor}
                  defaultColor={defaultColor}
                  redBorder={redBorder}
                />
              </InputWrapper>
            </LowerWrapper>
          </ColorInputSection>
          <ButtonWrapper>
            <CreateLabelButton
              redBorder={redBorder}
              createLabelChange={createLabelChange}
            >
              <CreateLabelText onClick={() => startCreate()}>
                {labelText}
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
    /* margin-right: 6px; */
  }
`;

const ButtonWrapper = styled.section`
  display: flex;
  @media screen and (min-width: 768px) {
    margin-right: 20px;
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
  background: #${(props) => props.colors};
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
  background: #${(props) => props.colors};
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
  height: 360px;
  background: #f5f7f9;
  margin: 20px auto;
  border: 0.5px solid #cad1d9;
  border-radius: 5px;
  @media screen and (min-width: 768px) {
    flex-direction: column;
    height: 149px;
    width: 100%;
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
  width: 100%;
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
  width: 95%;
  margin-right: auto;
  margin-left: auto;
  @media screen and (min-width: 768px) {
  }
`;

export default LabelButtons;
