import { useState } from "react";
import check from "../../img/check.svg";
import external from "../../img/external.svg";
import search from "../../img/search.svg";
import solidDown from "../../img/solid-down.svg";
import x from "../../img/x.svg";

function IssueListFilter() {
  const [showFilter, setShowFilter] = useState(false);
  const [clickName, setClickName] = useState("");
  const [defaultInput, setDefaultInput] = useState("");
  const [inputValue, setInputValue] = useState("");

  const filterName = [
    { name: "Open issues and pull request", query: "" },
    { name: "Your issues", query: `creator=emil0519` },
    { name: "Your pull requests", query: "" },
    { name: "Everything assigned to you", query: "assignee=emil0519" },
    { name: "Everything mentioning you", query: "mentioned=emil0519" },
  ];

  return (
    <section className="mt-[23px] ml-[0] flex w-[95%] med:m-[0]  med:w-[60%]">
      <div className="flex h-[32px] small:relative small:w-[110px]">
        <div
          // Filter按鈕
          onClick={() => setShowFilter(true)}
          className="flex h-[32px] w-[90.56px] cursor-pointer items-center justify-center rounded border-[0.5px] border-solid border-[#d4d6d9] hover:bg-[#f1f2f4] "
        >
          <span className="mr-[3px] text-xs font-semibold">Filters</span>
          <img src={solidDown} className="h-[8px] w-[12px]" alt=""></img>
        </div>
        <div
          // 透明外面，點擊會關掉彈窗
          onClick={() => setShowFilter(false)}
          className={`${
            showFilter ? "fixed" : "hidden"
          }  top-0 right-0 bottom-0 left-0 z-[99] flex bg-[black] p-[16px] opacity-25 small:opacity-0`}
        ></div>
        <div
          //彈出的清單
          className={`${
            showFilter ? "fixed" : "hidden"
          }  animation-[SelectMenu-modal-animation_.12s_cubic-bezier(0, 0.1, 0.1, 1)_backwards] top-[11vh] right-[5vw] z-[99] flex h-[377px] w-[90vw] flex-col rounded-lg border-[0.5px] border-solid border-[#cad1d9] bg-[white] small:absolute small:top-[111%] small:left-[-1px] small:h-[256px] small:w-[299px]`}
        >
          <div className="right-[5vw] flex h-[54px] w-[100%] items-center justify-between small:h-[33px]">
            <span className="ml-[16px] pb-[16px] text-xs font-semibold small:pt-[16px]">
              Filter Issue
            </span>
            <img
              src={x}
              onClick={() => setShowFilter(false)}
              className="mr-[16px] h-[16px] w-[16px] cursor-pointer"
              alt=""
            ></img>
          </div>
          {filterName.map((item, index: number) => {
            return (
              <div
                key={item.name}
                onClick={() => {
                  setClickName(item.name);

                  setShowFilter(false);
                }}
                className={`flex h-[54px] w-[100%] ${
                  item.name === "Open issues and pull request" ||
                  item.name === "Your pull requests"
                    ? "cursor-default"
                    : "cursor-pointer"
                } items-center justify-start border-t-[0.5px] border-b-[0.5px] border-solid border-[#d3d9e0] bg-[white] hover:bg-[#f3f5f7] small:h-[33px]`}
              >
                {item.name === "Open issues and pull request" ||
                item.name === "Your pull requests" ? (
                  <img
                    src={check}
                    alt=""
                    className={`invisible mr-[8px] ml-[16px]  h-[16px] w-[16px]`}
                  ></img>
                ) : (
                  <img
                    src={check}
                    alt=""
                    className={`${
                      item.name === clickName ? "visible" : "invisible"
                    } mr-[8px] ml-[16px]  h-[16px] w-[16px]`}
                  ></img>
                )}

                <span className="text-xs">{item.name}</span>
              </div>
            );
          })}
          <div className="flex h-[54px] w-[100%] cursor-pointer items-center justify-start border-t-[0.5px] border-b-[0.5px] border-solid border-[#d3d9e0] bg-[white] hover:bg-[#f3f5f7]">
            <img
              src={external}
              className="m-r-[8px] m-[16px] h-[16px] w-[16px]"
              alt=""
            ></img>
            <span className="small:mt[16px] text-xs font-semibold small:h-[33px]">
              View advanced search syntax
            </span>
          </div>
        </div>
      </div>

      <div className="flex h-[32px]  w-[100%] bg-[#f5f7f9] ">
        <img
          src={search}
          className="relative mr-[16px] mt-[8px] mb-[8px] ml-[8px] h-[16px] w-[16px]"
          alt=""
        ></img>
        <input
          defaultValue={defaultInput}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-[100%] bg-[#f5f7f9] p-[8px] text-[14px] text-[#636c75] small:w-[100%] med:w-[100%]"
        ></input>
      </div>
    </section>
  );
}

export default IssueListFilter;
