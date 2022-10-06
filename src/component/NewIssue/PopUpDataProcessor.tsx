import { useEffect, useState } from "react";
import NewAssignee from "../Reusable/NewAssignee";
import { useGetAllIssuesQuery } from "../../state/issueRTK";

function PopUpDataProcessor() {
  const [defaultAssigneesData, setDefaultAssigneesData] = useState<any>();
  const [defaultLabelData, setDefaultLabelData] = useState<any>();
  const [assigneesData, setAssigneesData] = useState<any>();
  const [labelData, setLabelData] = useState<any>();
  const [inputValue, setInputValue] = useState<string>("");
  const [clickIndex, setClickIndex] = useState(0);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [controller, setController] = useState<any>();
  const [clickRate, setClickRate] = useState<number>(0);
  // 用來偵測是否有點擊選單內的元素，如有就加一，目前想不到更好的方法

  useEffect(() => {
    setController([
      {
        title: "Assignee",
        default: {
          descriptionWithoutLink: "No one- ",
          descriptionWithLink: "assign yourself",
          desLink: "https://github.com/emil0519?tab=repositories",
          isLinkDecoration: false,
          inputPlaceholder: "Type or choose a user",
          mainHeader: "Assign up to 10 people to this issue",
          subHeader: "Suggestion",
          clearText: "clear assignee",
          isOpen: true,
          isCancel: false, //can be cancel by"x" button or not
        },
        data: assigneesData,
        defaultData: defaultAssigneesData,
        selected: [] as string[],
      },
      {
        title: "Labels",
        default: {
          descriptionWithoutLink: "None yet",
          inputPlaceholder: "Filter labels",
          mainHeader: "Apply labels to this issue",
          isOpen: true,
          isCancel: true,
        },
        data: labelData,
        defaultData: defaultLabelData,
        selected: [] as string[],
      },
    ]);
  }, [assigneesData, labelData]);

  const fetchedAssigneeData = useGetAllIssuesQuery({
    baseType: "repos",
    type: "/assignees",
    name: "/emil0519",
    repo: "/testing-issues",
    query: "",
  });
  useEffect(() => {
    //處理每張選單勾選的element
    if (controller !== undefined && controller[clickIndex].data !== undefined) {
      if (!controller[clickIndex].selected.includes(selectedValue)) {
        console.log("not included");
        const newController = controller.map((item: any, index: number) => {
          //update element in array of objects
          if (index === clickIndex) {
            return {
              ...item,
              selected: [...item.selected, selectedValue],
            };
          }
          return { ...item };
        });

        setController(newController);

        // setController([
        //   ...controller,
        //   (controller[clickIndex].selected = [
        //     ...controller[clickIndex].selected,
        //     selected,
        //   ]),
        // ]);
      } else if (controller[clickIndex].selected.includes(selectedValue)) {
        const num = controller[clickIndex].selected.indexOf(selectedValue);
        controller[clickIndex].selected.splice(num, 1);
      }
    }
  }, [selectedValue, clickRate]);

  useEffect(() => {
    if (controller !== undefined) {
      console.log(controller);
    }
  }, [selectedValue, clickRate]);

  const fetchedLabelData = useGetAllIssuesQuery({
    baseType: "repos",
    type: "/labels",
    name: "/emil0519",
    repo: "/testing-issues",
    query: "",
  });

  useEffect(() => {
    if (fetchedLabelData.data !== undefined) {
      const processedLabelData = fetchedLabelData.data.map((item: any) => ({
        icon: item.color,
        title: item.name,
        description: item.description,
      }));
      setLabelData(processedLabelData);
      setDefaultLabelData(processedLabelData);
    }
  }, [fetchedLabelData]);

  useEffect(() => {
    if (fetchedAssigneeData.data !== undefined) {
      const processedAssigneeData = fetchedAssigneeData.data.map(
        (item: any) => ({
          icon: item.avatar_url,
          title: item.login,
        })
      );
      setAssigneesData(processedAssigneeData);
      setDefaultAssigneesData(processedAssigneeData);
    }
  }, [fetchedAssigneeData]);

  if (controller === undefined) {
    return <></>;
  }
  return (
    <section className="mt-[48px] flex flex-col">
      <NewAssignee
        controller={controller}
        clickIndex={clickIndex}
        setClickIndex={setClickIndex}
        inputValue={inputValue}
        setInputValue={setInputValue}
        setSelectedValue={setSelectedValue}
        clickRate={clickRate}
        setClickRate={setClickRate}
      />
    </section>
  );
}

export default PopUpDataProcessor;
