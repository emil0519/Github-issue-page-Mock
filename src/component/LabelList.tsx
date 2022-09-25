import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  useEffect,
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import api from "../utils/api";
import { IssueReopenedIcon } from "@primer/octicons-react";
import { useOnClickOutside } from "usehooks-ts";
import useForceUpdate from "use-force-update";
import ColorBricksNoProps from "./ColorBricksNoProps";

function useComponentVisible(initialIsVisible: any) {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  // useEffect(() => console.log(initialIsVisible), [initialIsVisible]);
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
  const { ref, isComponentVisible, setIsComponentVisible, useOnClickOutside } =
    useComponentVisible(false);
  const dispatch = useDispatch();
  const [editOpen, setEditOpen] = useState(false);
  const [editVisible, setEditVisible] = useState(true);
  const handleClickOutside = () => {
    setEditOpen(false);
    console.log("clicked outside");
  };
  // const [deleteCount, setDeletCount]=useState(0);
  // const forceUpdate = useForceUpdate();

  const removeConfirm = () => {
    props.setRefresh(true);
  };

  // useEffect(() => console.log(updateLabelInfo), [updateLabelInfo]);

  // useEffect(
  //   () => props.setUpdateLabelInfo(props.updateLabelInfo),
  //   [props.updateLabelInfo]
  // );

  // useEffect(() => console.log(updateLabelInfo), [updateLabelInfo]);

  function toUpdateInfo(types: any, index: any, value: any) {
    let newInfo = [...props.updateLabelInfo];
    if (types === "name") {
      newInfo[index].new_name = value;
    } else if (types === "description") {
      newInfo[index].description = value;
    } else if (types === "color") {
      console.log("function work");
      newInfo[index].color = value;
    }
    props.setUpdateLabelInfo(newInfo);
    return;
  }
  function postInfo(index: number) {
    let updateBody = props.updateLabelInfo[index];
    console.log(updateBody);

    api.updateLabels(
      "emil0519",
      "testing-issues",
      updateBody.name,
      updateBody.new_name,
      updateBody.description,
      updateBody.color
    );
  }

  function deleteLabel(index: number) {
    const confirm = window.confirm(
      "Are you sure? Deleting a label will remove it from all issues and pull requests."
    );
    if (confirm) {
      const response = api.deleteLabel(
        "emil0519",
        "testing-issues",
        props.updateLabelInfo[index].name
      );
      // console.log("dispatch now");

      dispatch({
        type: "deleteItem",
        payload: { deleteName: props.updateLabelInfo[index].name },
      });
    }

    // setDeleteCount(deleteCount+1)
    // console.log(response);
    // console.log("deletelabel");
  }

  useOnClickOutside(ref, handleClickOutside);
  return (
    <>
      <Sort
        onClick={() => {
          setIsComponentVisible(true);
          setEditOpen(true);
          props.setTest(true);
          // console.log(props.index);
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
                // removeConfirm();
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
                toUpdateInfo("name", props.index, e.target.value);
              }}
            />
          </LabelInputSection>
          <LabelInputSection>
            <LabelName>Description</LabelName>
            <LabelInput
              placeholder="Description (optional)"
              defaultValue={`${props.itemDescription}`}
              onChange={(e) => {
                toUpdateInfo("description", props.index, e.target.value);
              }}
            />
          </LabelInputSection>
          <ColorInputSection>
            <ColorText>Color</ColorText>
            <LowerWrapper>
              <ColorRoller>
                <RollerIcon />
              </ColorRoller>
              {/* <ColorInput
                // maxLength={7}
                // type="text"
                defaultValue={`#${props.itemColor}`}
                onChange={(e) => {
                  toUpdateInfo("color", props.index, e.target.value);
                }}
                // onChange={(e) => {
                //   this.value=e.target.value
                // }}
              ></ColorInput> */}
              <ColorBricksNoProps
                // defaultValue={`#${props.itemColor}`}
                defaultValue={`#${props.itemColor}`}
                toUpdateInfo={toUpdateInfo}
                index={props.index}
              />
            </LowerWrapper>
          </ColorInputSection>
          <ButtonWrapper>
            <CreateLabelButton>
              <CreateLabelText
                onClick={() => {
                  postInfo(props.index);
                  props.setLabelIndex(-1);
                  props.setAreaOpen(false);
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
            // removeConfirm();
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
  const ref = useRef(null);
  const [test, setTest] = useState(false);

  const [clickIndex, setClickIndex] = useState(-1);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const forceUpdate = useForceUpdate();

  const removeConfirm = () => {
    // const confirmed = window.confirm("Are you sure?");
    if (refresh) {
      // console.log("hello");
      // forceUpdate();
    }
  };

  useLayoutEffect(() => {
    // if (refresh === true) {
    // console.log("checking updates");
    removeConfirm();
    // setRefresh(false);
    // }
  }, [refresh]);

  // const [labelIndex, setLabelIndex] = useState<
  //   number[] | object | (() => number[])
  // >([]);
  // const [areaOpen, setAreaOpen] = useState(false);
  const [label, setLabel]: any = useState();
  const updatedLabels: any = useSelector((state) => state);
  // console.log("直接印");
  // console.log(updatedLabels);

  // useEffect(() => {
  //   console.log("updated label update");

  //   console.log(updatedLabels);
  // }, [updatedLabels]);
  const [updateLabelInfo, setUpdateLabelInfo]: any = useState();

  useEffect(() => console.log(updateLabelInfo), [updateLabelInfo]);

  // function toUpdateInfo(types: any, index: any, value: any) {
  //   let newInfo = [...updateLabelInfo];
  //   if (types === "name") {
  //     newInfo[index].new_name = value;
  //   } else if (types === "description") {
  //     newInfo[index].description = value;
  //   } else if (types === "color") {
  //     newInfo[index].color = value;
  //   }
  //   setUpdateLabelInfo(newInfo);
  //   return;
  // }

  // function postInfo(index: number) {
  //   let updateBody = updateLabelInfo[index];
  //   console.log(updateBody);

  //   api.updateLabels(
  //     "emil0519",
  //     "testing-issues",
  //     updateBody.name,
  //     updateBody.new_name,
  //     updateBody.description,
  //     updateBody.color.substring(1)
  //   );
  // }

  function deleteLabel(index: number) {
    // const response = api.deleteLabel(
    //   "emil0519",
    //   "testing-issues",
    //   updateLabelInfo[index].name
    // );
    // dispatch({
    //   type: "deleteItem",
    //   payload: { deleteName: updateLabelInfo[index].name },
    // });
    // console.log(response);
    console.log("deletelabel");
  }

  useEffect(() => {
    (async () => {
      setLabel(await api.getLabels("emil0519", "testing-issues"));
    })().catch((error) => console.log(error));
  }, []);
  //第一次setLabel

  useEffect(() => {
    if (label === undefined) {
      return;
    } else {
      console.log("firs render");
      setUpdateLabelInfo(
        label.map((item: any) => {
          return {
            name: item.name,
            description: item.description,
            color: item.color,
            new_name: item.name,
          };
        })
      );
    }
  }, [label]);

  useEffect(() => {
    if (updatedLabels === undefined) {
      console.log("i didnt do anything");
      return;
    } else {
      console.log("this is updated labels");
      setUpdateLabelInfo(updatedLabels);
      setLabel(updatedLabels);
    }
  }, [updatedLabels]);

  // useEffect(() => {
  //   setLabel(updateLabelInfo);
  // }, [updateLabelInfo]);

  // useEffect(() => {
  //   if (label === undefined) {
  //     return;
  //   } else {
  //     console.log("updating label");

  //     setUpdateLabelInfo(updateLabelInfo);
  //   }
  // }, [label]);

  // useEffect(() => console.log(updateLabelInfo), [updateLabelInfo]);

  // useEffect(() => {
  //   if (label === undefined) {
  //     return;
  //   } else {
  //     console.log("update here");
  //     console.log(updatedLabels);
  //     setUpdateLabelInfo(updatedLabels);
  //   }
  //   // 每次有新label的時候會re-render一次
  // }, [updatedLabels]);

  // useEffect(() => {
  //   dispatch({
  //     type: "getList",
  //     payload: { label },
  //   });
  // }, [label]);

  // useEffect(() => console.log(label), []);

  // const labels: any = useSelector((state) => state);
  // useEffect(() => {
  //   test();
  // fetch
  // dispatch init state
  // }, []);
  // setTimeout(() => test(), 1000);
  // 改進：useInterval loading boolean, lazy loading, suspends
  // function test() {
  //   dispatch({
  //     type: "",
  //   });
  // }
  // useEffect(() => {
  //   console.log(labels);
  // }, [labels]);
  // useEffect(() => console.log(updateLabelInfo), [updateLabelInfo]);
  useEffect(() => console.log(updateLabelInfo), [updateLabelInfo]);

  if (label === undefined || updateLabelInfo === undefined) {
    return (
      <>
        <h1>Loading</h1>
      </>
    );
  } else {
    return (
      <>
        {label.map((item: any, index: any) => {
          return (
            <Wrapper index={index} labelIndex={labelIndex} areaOpen={areaOpen}>
              <OuterWrapper>
                <LabelWrap>
                  <Label color={updateLabelInfo[index].color}>
                    <LabelText color={item.color}>
                      {updateLabelInfo[index].new_name}
                    </LabelText>
                  </Label>
                </LabelWrap>
              </OuterWrapper>
              <LabelDes>{item.description}</LabelDes>
              <Notification></Notification>
              {/* <Sort
                clickIndex={clickIndex}
                index={index}
                onClick={() => {
                  setClickIndex(index);
                  console.log(index);
                }}
              >
                <SortText>...</SortText> */}
              <Refer
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
                setRefresh={setRefresh}
              />
              {/* <DropDown key={index} index={index} clickIndex={clickIndex}>
                  <DropDownText
                    //感覺這邊只有拿到最後一個ref，因為在.map的時候都賦予同一個ref
                    onClick={() => {
                      //這邊會把work log出來，但只有在最後一個的時候會log
                      console.log("edit label");
                      // console.log(index);
                      // handleClickInside();
                      // setLabelIndex((labelIndex: any) => [
                      //   ...labelIndex,
                      //   index,
                      // ]);
                    }}
                  >
                    Edit
                  </DropDownText>
                  <DropDownText ref={ref} onClick={() => deleteLabel(index)}>
                    Delete
                  </DropDownText>
                </DropDown> */}
              {/* </Sort> */}
              {/* <NewLabelSection
              // index={index}
              // labelIndex={labelIndex}
              // areaOpen={areaOpen}
              >
                <BigWrapper>
                  <LabelInputSection>
                    <LabelName>Label Name</LabelName>
                    <LabelInput
                      placeholder="Label name"
                      defaultValue={`${item.name}`}
                      onChange={(e) => {
                        toUpdateInfo("name", index, e.target.value);
                      }}
                    />
                  </LabelInputSection>
                  <LabelInputSection>
                    <LabelName>Description</LabelName>
                    <LabelInput
                      placeholder="Description (optional)"
                      defaultValue={`${item.description}`}
                      onChange={(e) => {
                        toUpdateInfo("description", index, e.target.value);
                      }}
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
                        type="text"
                        defaultValue={`#${item.color}`}
                        onChange={(e) => {
                          toUpdateInfo("color", index, e.target.value);
                        }}
                        // onChange={(e) => {
                        //   this.value=e.target.value
                        // }}
                      ></ColorInput>
                    </LowerWrapper>
                  </ColorInputSection>
                  <ButtonWrapper>
                    <CreateLabelButton>
                      <CreateLabelText onClick={() => postInfo(index)}>
                        Save changes
                      </CreateLabelText>
                    </CreateLabelButton>
                    <CancelButton>
                      <CancelText>Cancel</CancelText>
                    </CancelButton>
                  </ButtonWrapper>
                </BigWrapper>
              </NewLabelSection>
              <BigSort>
                <BigSortText>Edit</BigSortText>
                <BigSortText>Delete</BigSortText>
              </BigSort> */}
            </Wrapper>
          );
        })}
      </>
    );
  }
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
  /* display: ; */
  /* display: none; */
  &:hover {
    background: #1760cf;
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
  }
  @media screen and (min-width: 1012px) {
  }
`;

type Active = {
  clickIndex: number;
  index: number;
};

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
  /* margin-top: 25px; */
  @media screen and (min-width: 1012px) {
  }
`;

const LabelWrap = styled.div`
  width: auto;
  height: 24px;
  /* margin-top: 25px; */
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
  /* margin-top: 25px; */
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
  /* max-width: 50%;
  min-width: 50px; */
  height: 24px;
  margin-left: 10px;
  background: #${(props) => props.color.replace("#", "")};
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
  /* 要設條件 */
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

export default LabelList;