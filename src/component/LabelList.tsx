import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import api from "../utils/api";
import { IssueReopenedIcon } from "@primer/octicons-react";
import { useOnClickOutside } from "usehooks-ts";
import { useGetAllIssuesQuery, useUpdateMutation } from "../state/issueRTK";
import ColorBricksNoProps from "./ColorBricksNoProps";

function useComponentVisible(initialIsVisible: any) {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);

  const ref = useRef<any>(null);

  const handleHideDropdown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsComponentVisible(false);
    }
  };

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleHideDropdown, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleHideDropdown, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { ref, isComponentVisible, setIsComponentVisible, useOnClickOutside };
}

function Refer(props: any) {
  const [update] = useUpdateMutation();
  const { ref, isComponentVisible, setIsComponentVisible, useOnClickOutside } =
    useComponentVisible(false);
  const dispatch = useDispatch();
  const [editOpen, setEditOpen] = useState(false);
  const [editVisible, setEditVisible] = useState(true);
  const handleClickOutside = () => {
    setEditOpen(false);
  };
  useEffect(() => console.log(props.updateLabelInfo), [props.updateLabelInfo]);
  // function toUpdateInfo(types: string, index: any, value: any) {
  //   // let newInfo = [...props.updateLabelInfo];
  //   if (types === "name") {
  //     props.setUpdateLabelInfo((props.updateLabelInfo.newName = value));
  //   }
  //   // else if (types === "description") {
  //   //   props.updateLabelInfo.newDes = value;
  //   // } else if (types === "color") {
  //   //   props.updateLabelInfo.newCol = value;
  //   // }
  //   // props.setUpdateLabelInfo(newInfo);
  //   return;
  // }

  const postInfo = async (item: any) => {
    // console.log(item);
    // let test = "#fffff";
    // console.log(test.subString(0, 1), "inside");

    const body = {
      new_name:
        props.updateLabelInfo.newName.length === 0
          ? item.itemName
          : props.updateLabelInfo.newName,
      description: props.updateLabelInfo.newDes,
      color:
        props.updateLabelInfo.newCol.length === 0
          ? item.itemColor
          : props.updateLabelInfo.newCol.substring(0, 1),
    };

    await update({
      baseType: "repos",
      type: "/labels",
      name: "/emil0519",
      repo: "/testing-issues",
      query: `/${item.itemName}`,
      content: JSON.stringify(body),
    });
    console.log(body);

    props.setUpdateLabelInfo({
      newName: "",
      newDes: "",
      newCol: "",
    });
    props.setLabelIndex(-1);
    props.setAreaOpen(false);
  };

  // function postInfo(index: number) {

  // let updateBody = props.updateLabelInfo[index];

  // api
  //   .updateLabels(
  //     "emil0519",
  //     "testing-issues",
  //     updateBody.name,
  //     updateBody.new_name,
  //     updateBody.description,
  //     updateBody.color
  //   )
  //   .then((data) => {
  //     if (
  //       data.message !== "Validation Failed" ||
  //       data.message === undefined
  //     ) {
  //       props.setLabelIndex(-1);
  //       props.setAreaOpen(false);
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
  // }

  function deleteLabel(index: number) {
    const confirm = window.confirm(
      "Are you sure? Deleting a label will remove it from all issues and pull requests."
    );
    if (confirm) {
      // const response = api.deleteLabel(
      //   "emil0519",
      //   "testing-issues",
      //   props.updateLabelInfo[index].name
      // );

      dispatch({
        type: "deleteItem",
        payload: { deleteName: props.updateLabelInfo[index].name },
      });
    }
  }

  useOnClickOutside(ref, handleClickOutside);
  return (
    <>
      <Sort
        onClick={() => {
          setIsComponentVisible(true);
          setEditOpen(true);
          props.setTest(true);
        }}
        index={props.index}
        editOpen={editOpen}
      >
        <SortText>...</SortText>
        {isComponentVisible && (
          <DropDown ref={ref}>
            <DropDownText
              editVisible={editVisible}
              style={{ display: "flex" }}
              onClick={() => {
                props.setLabelIndex(props.index);
                props.setAreaOpen(true);
                setEditVisible(false);
              }}
            >
              Edit
            </DropDownText>

            <DropDownText
              editVisible={editVisible}
              style={{ display: "none" }}
              onClick={() => {
                props.setLabelIndex(props.index);
                props.setAreaOpen(true);
              }}
            >
              Edit
            </DropDownText>

            <DeleteText
              ref={ref}
              onClick={() => {
                deleteLabel(props.index);
              }}
            >
              Delete
            </DeleteText>
          </DropDown>
        )}
      </Sort>
      <NewLabelSection
        index={props.index}
        labelIndex={props.labelIndex}
        areaOpen={props.areaOpen}
      >
        <BigWrapper>
          <LabelInputSection>
            <LabelName>Label Name</LabelName>
            <LabelInput
              placeholder="Label name"
              defaultValue={`${props.itemName}`}
              onChange={(e) => {
                props.setUpdateLabelInfo({
                  ...props.updateLabelInfo,
                  newName: e.target.value,
                });
              }}
            />
          </LabelInputSection>
          <LabelInputSection>
            <LabelName>Description</LabelName>
            <LabelInput
              placeholder="Description (optional)"
              defaultValue={`${props.itemDescription}`}
              onChange={(e) => {
                props.setUpdateLabelInfo({
                  ...props.updateLabelInfo,
                  newDes: e.target.value,
                });
              }}
            />
          </LabelInputSection>
          <ColorInputSection>
            <ColorText>Color</ColorText>
            <LowerWrapper>
              <ColorRoller>
                <RollerIcon />
              </ColorRoller>

              <ColorBricksNoProps
                defaultValue={`#${props.itemColor}`}
                index={props.index}
                updateLabelInfo={props.updateLabelInfo}
                setUpdateLabelInfo={props.setUpdateLabelInfo}
              />
            </LowerWrapper>
          </ColorInputSection>
          <ButtonWrapper>
            <CreateLabelButton>
              <CreateLabelText
                onClick={() => {
                  postInfo(props);
                }}
              >
                Save changes
              </CreateLabelText>
            </CreateLabelButton>
            <CancelButton>
              <CancelText
                onClick={() => {
                  props.setLabelIndex(-1);
                  props.setAreaOpen(false);
                }}
              >
                Cancel
              </CancelText>
            </CancelButton>
          </ButtonWrapper>
        </BigWrapper>
      </NewLabelSection>
      <BigSort>
        <BigSortText
          index={props.index}
          labelIndex={props.labelIndex}
          areaOpen={props.areaOpen}
          onClick={() => {
            props.setLabelIndex(props.index);
            props.setAreaOpen(true);
            setEditVisible(false);
          }}
        >
          Edit
        </BigSortText>
        <BigSortText
          index={props.index}
          labelIndex={props.labelIndex}
          areaOpen={props.areaOpen}
          onClick={() => {
            deleteLabel(props.index);
          }}
        >
          Delete
        </BigSortText>
      </BigSort>
    </>

    // </div>
  );
}

function LabelList() {
  const [labelIndex, setLabelIndex] = useState(-1);
  const [areaOpen, setAreaOpen] = useState(false);

  const [test, setTest] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const [label, setLabel]: any = useState();
  const updatedLabels: any = useSelector((state) => state);

  const [updateLabelInfo, setUpdateLabelInfo] = useState({
    newName: "",
    newDes: "",
    newCol: "",
  });
  const { data } = useGetAllIssuesQuery({
    baseType: "repos",
    type: "/labels",
    name: "/emil0519",
    repo: "/testing-issues",
    query: "",
  });
  // useEffect(() => {
  //   console.log(data);
  //   if (data !== undefined) {
  //     setUpdateLabelInfo(
  //       data.map((item: any) => {
  //         return {
  //           name: item.name,
  //           description: item.description,
  //           color: item.color,
  //           new_name: item.name,
  //         };
  //       })
  //     );
  //   }
  // }, [data]);

  // useEffect(() => {
  //   console.log(updateLabelInfo);
  // }, [updateLabelInfo]);

  if (data === undefined) {
    return <></>;
  }

  return (
    <>
      {data.map((item: any, index: any) => {
        return (
          <Wrapper
            key={item.id}
            index={index}
            labelIndex={labelIndex}
            areaOpen={areaOpen}
          >
            <OuterWrapper>
              <LabelWrap>
                <Label color={item.color}>
                  <LabelText color={item.color}>{item.name}</LabelText>
                </Label>
              </LabelWrap>
            </OuterWrapper>
            <LabelDes>{item.description}</LabelDes>
            <Notification></Notification>

            <Refer
              key={item.id}
              index={index}
              itemName={item.name}
              itemDescription={item.description}
              itemColor={item.color}
              updateLabelInfo={updateLabelInfo}
              setUpdateLabelInfo={setUpdateLabelInfo}
              test={test}
              setTest={setTest}
              areaOpen={areaOpen}
              setAreaOpen={setAreaOpen}
              labelIndex={labelIndex}
              setLabelIndex={setLabelIndex}
              refresh={refresh}
            />
          </Wrapper>
        );
      })}
    </>
  );
}
// }

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
  background: #2da454;
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

type NewLabel = {
  areaOpen: boolean;
  index: any;
  labelIndex: any;
};

const NewLabelSection = styled.section<NewLabel>`
  display: ${(props) =>
    props.areaOpen && props.index === props.labelIndex ? "flex" : "none"};
  flex-direction: column;
  width: 95%;
  height: 278px;
  margin: 20px auto;
  @media screen and (min-width: 768px) {
    flex-direction: column;
    height: 149px;
  }
`;

type Visible = {
  editVisible: boolean;
};

const DropDownText = styled.span<Visible>`
  padding: 8px;
  width: 158px;
  height: 34px;
  font-size: 8px;
  color: #34383b;
  background: white;
  &:hover {
    background: #1760cf;
    color: white;
  }
  @media screen and (min-width: 1012px) {
  }
`;

const DeleteText = styled.span`
  padding: 8px;
  width: 158px;
  height: 34px;
  font-size: 8px;
  color: #34383b;
  background: white;
  &:hover {
    background: #1760cf;
    color: white;
  }
  @media screen and (min-width: 1012px) {
  }
`;

const DropDown = styled.div`
  display: flex;
  position: absolute;
  top: 141%;
  right: 12px;
  width: 160px;
  height: 82px;
  background: white;
  flex-direction: column;
  z-index: 100;
  @media screen and (min-width: 1012px) {
  }
`;
const OuterWrapper = styled.section`
  width: 15%;
  height: 24px;
  @media screen and (min-width: 1012px) {
  }
`;

const LabelWrap = styled.div`
  width: auto;
  height: 24px;
  @media screen and (min-width: 1012px) {
  }
`;

type BigSortter = {
  labelIndex: number;
  areaOpen: boolean;
  index: number;
};

const BigSortText = styled.span<BigSortter>`
  display: none;
  @media screen and (min-width: 1012px) {
    display: ${(props) =>
      props.areaOpen && props.labelIndex === props.index ? "none" : "block"};
    font-size: 12px;
    color: #4d555e;
    font-weight: 500;
    cursor: pointer;
    &:nth-child(2) {
      margin-right: 10px;
      margin-left: 15px;
    }
    &:hover {
      color: #1760cf;
      text-decoration: underline;
      text-decoration-color: #1760cf;
    }
  }
`;

const BigSort = styled.div`
  display: none;
  @media screen and (min-width: 1012px) {
    display: flex;
    width: 8%;
  }
`;

const Notification = styled.span`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    font-size: 12px;
    color: #4d555e;
    font-weight: 500;
    cursor: pointer;
    &:hover {
      color: #1760cf;
    }
  }
`;

const LabelDes = styled.span`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    font-size: 12px;
    color: #4d555e;
    font-weight: 500;
    width: 57%;
  }
`;

const SortText = styled.span`
  font-size: 24px;
  margin-bottom: 12px;
`;

type Sorter = {
  index: number;
  editOpen: boolean;
};

const Sort = styled.div<Sorter>`
  position: relative;
  width: 42px;
  height: 28px;
  background: ${(props) => (props.editOpen ? "#1760cf" : "white")};
  color: ${(props) => (props.editOpen ? "white" : "black")};
  border: 0.5px solid #cad1d9;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;
  &:hover {
    background: #1760cf;
    > * {
      color: white;
    }
  }
  @media screen and (min-width: 1012px) {
    display: none;
  }
`;

const LabelText = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: ${(props) => (props.color === "ffffff" ? "black" : "white")};
  @media screen and (min-width: 768px) {
  }
`;

type LabelProp = {
  color: string;
};

const Label = styled.div<LabelProp>`
  width: fit-content;
  padding-left: 6px;
  padding-right: 6px;
  white-space: no-wrap;
  border: ${(props) =>
    props.color === "ffffff" ? "0.5px solid #b7b7b7" : "none"};
  height: 24px;
  margin-left: 10px;
  background: #${(props) => props.color};
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media screen and (min-width: 768px) {
  }
`;
type NewLabels = {
  areaOpen: boolean;
  index: any;
  labelIndex: any;
};

const Wrapper = styled.section<NewLabels>`
  width: 95vw;
  height: ${(props) =>
    props.areaOpen && props.index === props.labelIndex ? "339px" : "61px"};
  margin: 0 auto;
  background: white;
  border: 0.5px solid #cad1d9;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  @media screen and (min-width: 768px) {
  }
`;

const NoLabelWrapper = styled.section`
  width: 95vw;
  height: 61px;
  margin: 0 auto;
  background: white;
  border: 0.5px solid #cad1d9;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 768px) {
  }
`;
const NoLabelText = styled.span`
  text-align: center;
  font-size: 20;
`;

export default LabelList;
