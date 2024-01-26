import { useState } from "react";
import check from "../../img/check.svg";
import down from "../../img/triangle-down.svg";
import x from "../../img/x.svg";

export function IssueAssignee({ TITLE = "Assignee", ...props }) {
  const [showAssignee, setShowAssignee] = useState(false);
  const [renderData, setRenderData] = useState<any>([
    {
      login: "emil0519",
      url: "https://avatars.githubusercontent.com/u/97882056?v=4",
    },
    {
      login: "Xie-MS",
      url: "https://avatars.githubusercontent.com/u/82010307?v=4",
    },
  ]);
  const [localData, setLocalData] = useState<any>([
    {
      login: "emil0519",
      url: "https://avatars.githubusercontent.com/u/97882056?v=4",
    },
    {
      login: "Xie-MS",
      url: "https://avatars.githubusercontent.com/u/82010307?v=4",
    },
  ]);

  const [itemName, setItemName] = useState<string>();

  function labelFilter(input: string) {
    if (input.length === 0) {
      setRenderData(localData);
    } else {
      const found = renderData.filter(({ login }: { login: string }) =>
        new RegExp(input, "i").test(login)
      );

      setRenderData(found);
    }
  }
  return (
    <>
      <span
        onClick={() => setShowAssignee(true)}
        className="ml-[16px] mr-[16px] flex cursor-pointer text-xs text-[#212529] hover:text-[black] small:relative small:items-center"
      >
        {TITLE}
        <img
          src={down}
          alt=""
          className="ml-[2px] hidden h-[4px] small:block small:w-[8px]"
        ></img>
      </span>
      <div
        // 透明外面，點擊會關掉彈窗
        onClick={() => setShowAssignee(false)}
        className={`${
          showAssignee ? "fixed" : "hidden"
        } top-0 right-0 bottom-0 left-0 z-[99] flex bg-[black] p-[16px] opacity-25 small:opacity-0`}
      ></div>
      <div
        //彈出的清單
        className={`${
          showAssignee ? "fixed" : "hidden"
        }   top-[1.5%] right-[9px] z-[99] flex h-[max-content] w-[95vw] flex-col rounded-lg border-[0.5px] border-solid border-[#cad1d9] bg-[white] small:absolute  small:top-[18px] small:left-[84px] small:h-[max-content] small:w-[298px] med:top-[20px] big:top-[18px] big:left-[77px] `}
      >
        <div className="right-[5vw] flex h-[54px] w-[100%] items-center justify-between small:h-[33px]">
          <span className="ml-[16px] text-xs font-semibold small:p-0 ">
            Filter by who's assigned
          </span>
          <img
            src={x}
            onClick={() => setShowAssignee(false)}
            className="mr-[16px] h-[16px] w-[16px] cursor-pointer"
            alt=""
          ></img>
        </div>
        <div className="flex h-[65px] w-[100%] items-center justify-center border-t-[0.5px] border-b-[0.5px] border-solid border-[#d3d9e0] bg-[white] small:h-[49px] ">
          <input
            placeholder="Filter users"
            onChange={(e) => labelFilter(e.target.value)}
            className="h-[32px] w-[85%] rounded-md border-[1px] border-solid border-[#d3d9e0] p-[5px_12px] small:w-[95%] small:text-xs"
          ></input>
        </div>
        <div className="h-[202px] overflow-y-auto overflow-x-hidden small:h-[416px]">
          <div className="flex h-[54px] w-[100%] cursor-pointer items-center justify-between border-t-[0.5px] border-b-[0.5px] border-solid border-[#d3d9e0] bg-[white] hover:bg-[#f3f5f7] small:h-[49px] small:w-[298px]">
            <span
              onClick={() => {
                setItemName("");
                setShowAssignee(false);
              }}
              className=" m-[16px] ml-[52px] text-xs font-semibold"
            >
              Assigned to nobody
            </span>
          </div>

          {renderData.map((item: any) => (
            <div
              onClick={() => {
                setShowAssignee(false);

                setItemName(item.login);
              }}
              className="ml-[31px] flex h-[54px] w-[100%] cursor-pointer flex-row items-center justify-start border-t-[0.5px] border-b-[0.5px] border-solid border-[#d3d9e0] bg-[white] hover:bg-[#f3f5f7] small:h-[49px]"
            >
              <div className="flex flex-row">
                <img
                  src={check}
                  alt=""
                  className={`${
                    item.login === itemName ? "visible" : "invisible"
                  } ml-[16px] mr-[8px] h-[16px] w-[16px]`}
                ></img>
                <img
                  src={item.url}
                  alt=""
                  className="mr-[8px] h-[20px] w-[20px] rounded-[9999px]"
                ></img>
                <span className=" text-xs font-semibold">{item.login}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default IssueAssignee;
