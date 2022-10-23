import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetAllIssuesQuery } from "../../state/issueRTK";
import NewAssignee from "../Reusable/NewAssignee";

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
  const [userInfo, setUserInfo] = useState<any>();
  const [skip, setSkip] = useState(true);
  const [repo, setRepo] = useState("/testing-issues");
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
    if (userInfo !== undefined && repo !== undefined) {
      setSkip(false);
    }
  }, [userInfo, repo]);

  const { data } = useGetAllIssuesQuery(
    {
      baseType: "repos",
      type: "/issues",
      name: `/${
        skip ? "" : userInfo.currentSession.user.user_metadata.user_name
      }`,
      repo: `/${skip ? "" : repo}`,
      query: `/${query}`,
    },
    { skip: skip }
  );

  useEffect(() => {
    if (query === null) {
      return;
    }
  });

  // 改進: call in condition or else it will return 404 in new issue page
  const [localData, setLocalData] = useState<any>();
  // useEffect(() => {
  //   if (query === null) {
  //     setLocalData([]);
  //   } else {
  //     setLocalData(data);
  //   }
  // }, [query]);

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
        setController(copyController);
        setreRender(reRender + 1);
      }
    }
  }, [selectedValue, clickRate]);

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

      const newController = copyController.map((item: any, index: number) => {
        if (index === clickIndex) {
          item.data = found;
        }
        return { ...item };
      });

      setController(newController);
    } else if (inputValue.length === 0) {
      let copyController = JSON.parse(JSON.stringify(controller));
      const newController = copyController.map((item: any, index: number) => {
        if (index === clickIndex) {
          item.data = item.defaultData;
        }
        return { ...item };
      });

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

      setController(newController);
    }
  }, [clearAssigneeRate]);

  if (controller === undefined || userInfo === undefined) {
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
        user={userInfo.currentSession.user.user_metadata.user_name}
      />
    </section>
  );
}

export default PopUpDataProcessor;
