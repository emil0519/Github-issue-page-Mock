import x from "../../img/x.svg";
import solidDown from "../../img/solid-down.svg";
import external from "../../img/external.svg";
import search from "../../img/search.svg";
import { useState } from "react";
import check from "../../img/check.svg";
import down from "../../img/triangle-down.svg";

function IssueListLabel() {
  const [labelData, setLabelData] = useState([
    {
      name: "Hello world",
      description: "This is a description",
      color: "e86e64",
    },
    { name: "Your issues", color: "f7c9bf" },
    { name: "PR", color: "1c1c1c", description: "I do have a description" },
    { name: "Everything assigned to you", color: "ac6a4c" },
    { name: "Everything mentioning you", color: "e86e64" },
    { name: "Everything mentioning you", color: "e86e64" },
    { name: "Everything mentioning you", color: "e86e64" },
    { name: "Everything mentioning you", color: "e86e64" },
    { name: "Everything mentioning you", color: "e86e64" },
    { name: "Everything mentioning you", color: "e86e64" },
    { name: "Everything mentioning you", color: "e86e64" },
    { name: "Everything mentioning you", color: "e86e64" },
  ]);
  const [localLabel, setLocalLabel] = useState([
    {
      name: "Hello world",
      description: "This is a description",
      color: "e86e64",
    },
    { name: "Your issues", color: "f7c9bf" },
    { name: "PR", color: "1c1c1c", description: "I do have a description" },
    { name: "Everything assigned to you", color: "ac6a4c" },
    { name: "Everything mentioning you", color: "e86e64" },
    { name: "Everything mentioning you", color: "e86e64" },
    { name: "Everything mentioning you", color: "e86e64" },
    { name: "Everything mentioning you", color: "e86e64" },
    { name: "Everything mentioning you", color: "e86e64" },
    { name: "Everything mentioning you", color: "e86e64" },
    { name: "Everything mentioning you", color: "e86e64" },
    { name: "Everything mentioning you", color: "e86e64" },
  ]);
  const [labelListOpen, setLabelListOpen] = useState(false);
  const [clickName, setClickName] = useState<any>([]);

  function labelFilter(value: string) {
    if (value.length === 0) {
      setLabelData(localLabel);
    } else {
      const found = labelData.filter(({ name }: { name: string }) =>
        new RegExp(value, "i").test(name)
      );
      setLabelData(found);
    }
  }

  return (
    <>
      {/* label按鈕及彈出選單 */}
      <span
        onClick={() => setLabelListOpen(true)}
        className="ml-[16px] mr-[16px] flex cursor-pointer text-xs text-[#212529] hover:text-[black] small:relative small:items-center"
      >
        Label
        <img
          src={down}
          alt=""
          className="ml-[2px] hidden h-[4px] small:block small:w-[8px]"
        ></img>
      </span>
      <div
        // 透明外面，點擊會關掉彈窗
        onClick={() => setLabelListOpen(false)}
        className={`${
          labelListOpen ? "fixed" : "hidden"
        } top-0 right-0 bottom-0 left-0 z-[99] flex bg-[black] p-[16px] opacity-25 small:opacity-0`}
      ></div>
      <div
        //彈出的清單
        className={`${
          labelListOpen ? "fixed" : "hidden"
        }  top-[1.5%] right-[9px] z-[99] flex h-[max-content] w-[95vw] flex-col rounded-lg border-[0.5px] border-solid border-[#cad1d9] bg-[white] small:absolute  small:top-[18px] small:left-[84px] small:h-[max-content] small:w-[298px] med:top-[20px] big:top-[18px] big:left-[77px] `}
      >
        <div className="right-[5vw] flex h-[54px] w-[100%] items-center justify-between small:h-[33px]">
          <span className="ml-[16px] text-xs font-semibold small:p-0 ">
            Filter by Label
          </span>
          <img
            src={x}
            onClick={() => setLabelListOpen(false)}
            className="mr-[16px] h-[16px] w-[16px] cursor-pointer"
            alt=""
          ></img>
        </div>
        <div className="flex h-[65px] w-[100%] items-center justify-center border-t-[0.5px] border-b-[0.5px] border-solid border-[#d3d9e0] bg-[white] small:h-[49px] ">
          <input
            placeholder="Filter labels"
            onChange={(e) => labelFilter(e.target.value)}
            className="h-[32px] w-[85%] rounded-md border-[1px] border-solid border-[#d3d9e0] p-[5px_12px] small:w-[95%] small:text-xs"
          ></input>
        </div>
        <div className="h-[416px] overflow-y-auto overflow-x-hidden">
          <div className="flex h-[54px] w-[100%] cursor-pointer items-center justify-between border-t-[0.5px] border-b-[0.5px] border-solid border-[#d3d9e0] bg-[white] hover:bg-[#f3f5f7] small:h-[49px] small:w-[298px]">
            <span
              onClick={() => {
                setClickName("");
                setLabelListOpen(false);
              }}
              className=" m-[16px] ml-[52px] text-xs font-semibold"
            >
              Unlabeled
            </span>
          </div>

          {labelData.map((item: any) => (
            <div
              onClick={() => {
                setClickName([...clickName, item.name]);
                setLabelListOpen(false);
              }}
              className="flex h-[54px] w-[100%] cursor-pointer items-center justify-start border-t-[0.5px] border-b-[0.5px] border-solid border-[#d3d9e0] bg-[white] hover:bg-[#f3f5f7] small:h-[49px]"
            >
              <img
                src={check}
                alt=""
                className={`${
                  clickName.includes(item.name) ? "visible" : "invisible"
                } mr-[8px] ml-[16px]  h-[16px] w-[16px]`}
              ></img>
              <div
                style={{ background: `#${item.color}` }}
                className={`mr-[6px] h-[14px] w-[14px] rounded-full bg-[${item.color}]`}
              ></div>
              <div className="flex flex-col">
                <span className=" text-xs font-semibold">{item.name}</span>

                <span className=" mt-[3px] w-[max-content] text-xs text-[#57606a] small:inline-block small:h-[15px] small:w-[220px] small:overflow-hidden small:whitespace-nowrap">
                  {item.description}
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* 最後一行的資訊列 */}
        <div className="flex h-[59.91px] w-[100%] items-center  justify-start border-t-[0.5px] border-b-[0.5px] border-solid border-[#d3d9e0] bg-[white] pl-[5px] ">
          <span className="small:mt[16px] text-xs text-[#57606a] small:h-[49px]">
            Use{" "}
            <span className="h-[fit-content] w-[fit-content] rounded-lg border-[1px] border-solid border-[#e8ebef] bg-[#f6f8fa] p-[3px_5px] text-[#24292f]">
              ⌥
            </span>{" "}
            +
            <span className="h-[fit-content] w-[fit-content] rounded-lg border-[1px] border-solid border-[#e8ebef] bg-[#f6f8fa] p-[3px_5px] text-[#24292f]">
              click/return
            </span>
            to exclude labels or
            <span className="h-[fit-content] w-[fit-content] rounded-lg border-[1px] border-solid border-[#e8ebef] bg-[#f6f8fa] p-[3px_5px] text-[#24292f]">
              ⇧
            </span>
            +{" "}
            <span className="h-[fit-content] w-[fit-content] rounded-lg border-[1px] border-solid border-[#e8ebef] bg-[#f6f8fa] p-[3px_5px] text-[#24292f]">
              click/return
            </span>{" "}
            for logical OR
          </span>
        </div>
      </div>
    </>
  );
}

export default IssueListLabel;
