import { useEffect, useState } from "react";
import NewAssignee from "../Reusable/NewAssignee";
import { useGetAllIssuesQuery } from "../../state/issueRTK";
import { useSearchParams } from "react-router-dom";

export type ControllerProps = {
  controller: any;
  setController: any;
  showDropDown: string;
  setShowDropDown: React.Dispatch<React.SetStateAction<string>>;
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  type: string;
};

function PopUpDataProcessor({
  controller,
  setController,
  setShowDropDown,
  showDropDown,
  selectedValue,
  setSelectedValue,
  type,
}: ControllerProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [clickRate, setClickRate] = useState<number>(0);
  const [clearAssigneeRate, setClearAssigneeRate] = useState<number>(0);
  const [clickIndex, setClickIndex] = useState<number>(0);
  // 用來偵測是否有點擊選單內的元素，如有就加一，目前想不到更好的方法]
  const [searchParams] = useSearchParams();
  const [reRender, setreRender] = useState<number>(0);
  const query = searchParams.get("query");

  const { data, isError, isSuccess, isLoading } = useGetAllIssuesQuery({
    baseType: "repos",
    type: "/issues",
    name: "/emil0519",
    repo: "/testing-issues",
    query: `/${query}`,
    // skip: `${type==="new" ? true : false}`,
  });

  useEffect(() => {
    if (query === null) {
      return;
    }
  });

  // useEffect(() => console.log(isError), [isError]);
  // 改進: call in condition or else it will return 404 in new issue page
  const [localData, setLocalData] = useState<any>();
  // useEffect(() => {
  //   if (query === null) {
  //     setLocalData([]);
  //   } else {
  //     setLocalData(data);
  //   }
  // }, [query]);
  // useEffect(() => console.log(clickIndex), [clickIndex]);
  useEffect(() => {
    //處理每張選單勾選的element
    if (controller !== undefined && controller[clickIndex].data !== undefined) {
      if (!controller[clickIndex].selected.includes(selectedValue)) {
        //如果不include selected value

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
      } else {
        let copyController = JSON.parse(JSON.stringify(controller));
        const num = controller[clickIndex].selected.indexOf(selectedValue);
        copyController[clickIndex].selected.splice(num, 1);

        // console.log(controller[clickIndex].selected.splice(num, 1));
        // const newController = controller;
        // newController[0].selected = controller[clickIndex].selected.splice(
        //   num,
        //   1
        // );

        // console.log(newController);
        // 改進：這邊console.log的話會看到controller改變了，但不會重新render
        //可能因為改變了object react會沒有反應，目前先讓NewAssignee吃一個number，強制讓它rerender
        //參見 https://stackoverflow.com/questions/71185474/component-not-re-rendering-after-change-in-an-array-state-in-react
        setController(copyController);
        setreRender(reRender + 1);
      }
    }
  }, [selectedValue, clickRate]);

  useEffect(() => {
    // Search function within dropdown menu
    console.log("controller reset 1");

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

      const newController = copyController.map((item: any, index: number) => {
        if (index === clickIndex) {
          item.data = found;
        }
        return { ...item };
      });
      console.log(newController);

      setController(newController);
    } else if (inputValue.length === 0) {
      let copyController = JSON.parse(JSON.stringify(controller));
      const newController = copyController.map((item: any, index: number) => {
        if (index === clickIndex) {
          item.data = item.defaultData;
        }
        return { ...item };
      });
      console.log(newController);
      console.log("controller reset 2");

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
      console.log("controller reset 3");

      setController(newController);
    }
  }, [clearAssigneeRate]);

  if (controller === undefined) {
    return <></>;
  }
  return (
    <section className="mt-[48px] mr-auto ml-auto flex w-[95%] flex-col med:m-0 med:w-[fit-content]">
      <NewAssignee
        showDropDown={showDropDown}
        setShowDropDown={setShowDropDown}
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
        setController={setController}
        data={data}
        reRender={reRender}
        type={type}
        // isError={isError}
      />
    </section>
  );
}

export default PopUpDataProcessor;
