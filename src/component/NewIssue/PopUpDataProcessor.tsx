import { useEffect, useState } from "react";
import NewAssignee from "../Reusable/NewAssignee";
import { useGetAllIssuesQuery } from "../../state/issueRTK";

export type ControllerProps = {
  controller: any;
  setController: any;
};

function PopUpDataProcessor({ controller, setController }: ControllerProps) {
  const [defaultAssigneesData, setDefaultAssigneesData] = useState<any>();
  const [defaultLabelData, setDefaultLabelData] = useState<any>();
  const [assigneesData, setAssigneesData] = useState<any>();
  const [labelData, setLabelData] = useState<any>();
  const [inputValue, setInputValue] = useState<string>("");
  const [clickIndex, setClickIndex] = useState<number>(0);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [clickRate, setClickRate] = useState<number>(0);
  const [clearAssigneeRate, setClearAssigneeRate] = useState<number>(0);
  // 用來偵測是否有點擊選單內的元素，如有就加一，目前想不到更好的方法]

  useEffect(() => {
    //Options for reusable component
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
          isGear: true, //can be cancel by"x" button or not
        },
        data: assigneesData,
        defaultData: defaultAssigneesData,
        selected: [] as string[],
        showSelectedData: [],
      },
      {
        title: "Labels",
        default: {
          descriptionWithoutLink: "None yet",
          inputPlaceholder: "Filter labels",
          mainHeader: "Apply labels to this issue",
          isOpen: true,
          isGear: true,
        },
        data: labelData,
        defaultData: defaultLabelData,
        selected: [] as string[],
        showSelectedData: [],
      },
      {
        title: "Projects",
        default: {
          descriptionWithoutLink: "None yet",
          inputPlaceholder: "",
          mainHeader: "",
          isOpen: false,
          isGear: true,
          selected: [] as string[],
        },
      },
      {
        title: "Milestone",
        default: {
          descriptionWithoutLink: "No milestone",
          inputPlaceholder: "",
          mainHeader: "",
          isOpen: false,
          isGear: true,
          selected: [] as string[],
        },
      },
      {
        title: "Development",
        default: {
          descriptionWithoutLink:
            "Shows branches and pull requests linked to this issue.",
          inputPlaceholder: "",
          mainHeader: "",
          isOpen: false,
          isGear: false,
          selected: [] as string[],
        },
      },
      {
        title: "Helpful resources",
        default: {
          descriptionWithLink: "GitHub Community Guidelines",
          inputPlaceholder: "",
          mainHeader: "",
          isOpen: false,
          isGear: false,
          selected: [] as string[],
        },
      },
    ]);
  }, [assigneesData, labelData]);

  useEffect(() => console.log(assigneesData), [assigneesData]);

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
        const filteredData = controller[clickIndex].data.filter(
          (item: any) => item.title === selectedValue
        );
        const newController = controller.map((item: any, index: number) => {
          //update element in array of objects
          if (index === clickIndex) {
            return {
              ...item,
              selected: [...item.selected, selectedValue],
              showSelectedData: [...item.showSelectedData, filteredData],
            };
          }
          return { ...item };
        });
        setController(newController);
      } else if (controller[clickIndex].selected.includes(selectedValue)) {
        const num = controller[clickIndex].selected.indexOf(selectedValue);
        controller[clickIndex].selected.splice(num, 1);
        const newController = controller.map((item: any, index: number) => {
          if (index === clickIndex) {
            return {
              ...item,
              selected: controller[clickIndex].selected,
            };
          }
          return { ...item };
        });
        setController(newController);
      }
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
    //處理fetch回來的label data
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
    //處理fetch回來的assignee data
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

  useEffect(() => {
    // Search function within dropdown menu
    if (controller === undefined) {
      return;
    }
    if (
      controller[0] !== undefined &&
      controller[0].hasOwnProperty("data") &&
      controller[0].data !== undefined &&
      inputValue.length !== 0
    ) {
      let copyController = JSON.parse(JSON.stringify(controller));
      //deep copy

      const found = copyController[clickIndex].data.filter(
        ({ title }: { title: string }) =>
          new RegExp(inputValue, "i").test(title)
      );
      console.log(found);
      const newController = copyController.map((item: any, index: number) => {
        if (index === clickIndex) {
          item.data = found;
        }
        return { ...item };
      });
      setController(newController);
    } else if (inputValue.length === 0) {
      console.log("no input");
      let copyController = JSON.parse(JSON.stringify(controller));
      const newController = copyController.map((item: any, index: number) => {
        if (index === clickIndex) {
          item.data = item.defaultData;
        }
        return { ...item };
      });
      console.log(newController);
      setController(newController);
    }
  }, [inputValue]);

  useEffect(() => {
    if (controller === undefined) {
      return;
    } else {
      let copyController = JSON.parse(JSON.stringify(controller));
      const newController = copyController.map((item: any, index: number) => {
        if (index === clickIndex) {
          item.selected = [];
        }
        //清空
        return { ...item };
      });
      console.log(newController);
      setController(newController);
    }

    //處理Clear選項
    // if (
    //   controller[0] !== undefined &&
    //   controller[0].hasOwnProperty("data") &&
    //   controller[0].data !== undefined &&
    //   clearAssignee
    // ) {
    // let copyController = JSON.parse(JSON.stringify(controller));
    // const newController = copyController.map((item: any, index: number) => {
    //   if (index === clickIndex) {
    //     item.selected = [];
    //   }
    //   //清空
    //   return { ...item };
    // });
    // console.log(newController);
    // setController(newController);
    // }
  }, [clearAssigneeRate]);

  if (controller === undefined) {
    return <></>;
  }
  return (
    <section className="mt-[48px] mr-auto ml-auto flex w-[95%] flex-col med:m-0 med:w-[fit-content]">
      <NewAssignee
        controller={controller}
        clickIndex={clickIndex}
        setClickIndex={setClickIndex}
        inputValue={inputValue}
        setInputValue={setInputValue}
        setSelectedValue={setSelectedValue}
        clickRate={clickRate}
        setClickRate={setClickRate}
        clearAssigneeRate={clearAssigneeRate}
        setClearAssigneeRate={setClearAssigneeRate}
      />
    </section>
  );
}

export default PopUpDataProcessor;
