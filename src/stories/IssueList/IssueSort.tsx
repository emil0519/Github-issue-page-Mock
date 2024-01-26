import { useState } from "react";
import check from "../../img/check.svg";
import down from "../../img/triangle-down.svg";
import x from "../../img/x.svg";

function IssueSort({ TITLE = "Sort", ...props }) {
  const sortText = [
    { name: "Newest", query: "sort=created&direction=desc" },
    { name: "Oldest", query: "sort=created&direction=asc" },
    { name: "Most commented", query: "sort=comments&direction=desc" },
    { name: "Least commented", query: "sort=comments&direction=asc" },
    {
      name: "Recently updated",
      query: "?query=?sort=updated&direction=desc",
    },
    {
      name: "Least recently updated",
      query: "?query=?sort=updated&direction=asc",
    },
  ];

  const [sortListOpen, setSortListOpen] = useState(false);
  const [sortClickName, setSortClickName] = useState("");

  return (
    <>
      <span
        onClick={() => setSortListOpen(true)}
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
        onClick={() => setSortListOpen(false)}
        className={`${sortListOpen ? "fixed" : "hidden"} 
     top-0 right-0 bottom-0 left-0 z-[99]  flex bg-[black] p-[16px] opacity-25 small:opacity-0`}
      ></div>
      <div
        //彈出的清單
        className={`${
          sortListOpen ? "fixed" : "hidden"
        } top-[1.5%] right-[9px] z-[99] flex h-[646px] w-[95vw] flex-col rounded-lg border-[0.5px] border-solid border-[#cad1d9] bg-[white] small:absolute  small:top-[33px] small:left-[32px] small:h-[max-content] small:w-[298px] med:top-[34px] med:left-[26px] big:top-[37px] big:left-[11px] `}
      >
        <div className="right-[5vw] flex  h-[54px] w-[100%] items-center justify-between small:h-[49px]">
          <span className="ml-[16px] text-xs font-semibold small:p-0 ">
            Sort by
          </span>
          <img
            src={x}
            onClick={() => setSortListOpen(false)}
            className="mr-[16px] h-[16px] w-[16px] cursor-pointer"
            alt=""
          ></img>
        </div>
        <div className="h-[324px]">
          {sortText.map((item) => {
            return (
              <div
                onClick={() => {
                  setSortListOpen(false);
                  setSortClickName(item.name);
                }}
                className="flex h-[54px] w-[100%] cursor-pointer items-center justify-start border-t-[0.5px] border-b-[0.5px] border-solid border-[#d3d9e0] bg-[white] hover:bg-[#f3f5f7] small:h-[49px]"
              >
                <img
                  src={check}
                  alt=""
                  className={`${
                    item.name === sortClickName ? "visible" : "invisible"
                  } ml-[16px] mr-[8px] h-[16px] w-[16px]`}
                ></img>
                <div className="flex flex-col">
                  <span className=" z-50 text-xs font-semibold">
                    {item.name}
                  </span>
                </div>
              </div>
            );
          })}
          <div className="flex h-[27px] w-[100%] items-center justify-start bg-[#f5f7f9]">
            <span className="ml-[16px] text-xs ">Most reactions</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default IssueSort;
