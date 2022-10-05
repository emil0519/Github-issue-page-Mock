import { GearIcon } from "@primer/octicons-react";
import { useState } from "react";
import avatar from "../../img/avatar.png";
import x from "../../img/x.svg";
function Assignee() {
  const [mouseOver, setMouseOver] = useState(false);
  const [showAssignee, setShowAssignee] = useState(false);

  return (
    <section
      onMouseOver={() => setMouseOver(true)}
      onMouseOut={() => setMouseOver(false)}
      className="mt-[10px] flex w-[100%] cursor-pointer flex-col items-center justify-center med:h-[max-content] med:w-[240px] med:flex-col med:flex-wrap"
    >
      <section
        onClick={() => setShowAssignee(true)}
        className="flex w-[95%] items-center justify-between"
      >
        <span
          className={`text-[12px] font-semibold ${
            mouseOver ? "text-[#1e65d0] " : "text-[#6c737a]"
          }`}
        >
          Assignee
        </span>
        <GearIcon
          fill={`${mouseOver ? "#1e65d0" : "#4d555e"}`}
          className="h-[16px] w-[16px]"
        />
      </section>
      <div className="mt-[8px] w-[95%] text-[12px] text-[#6c737a]">
        No one - assign yourself
      </div>
      <div className="mt-[16px] h-[0.4px] w-[92%] bg-[#cdd4db]"></div>
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
        } top-[9%] right-[9px] z-[99] flex h-[80vh] w-[95vw] flex-col rounded-lg border-[0.5px] border-solid border-[#cad1d9] bg-[white] small:absolute  small:top-[18px] small:left-[84px] small:h-[max-content] small:w-[298px] med:top-[20px] big:top-[18px] big:left-[77px] `}
      >
        <div className="right-[5vw] flex h-[54px] w-[100%] items-center justify-between small:h-[33px]">
          <span className="ml-[16px] text-xs font-semibold small:p-0 ">
            Assign up to 10 people to this issue
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
            // onChange={(e) => labelFilter(e.target.value)}
            className="h-[32px] w-[85%] rounded-md border-[1px] border-solid border-[#d3d9e0] p-[5px_12px] small:w-[95%] small:text-xs"
          ></input>
        </div>
        <div className="flex items-center bg-[#f5f7f9]">
          <span className="ml-[8px] pt-[8px] pb-[8px] text-sm font-semibold">
            Suggestions
          </span>
        </div>
        <div className="h-[202px] overflow-y-auto overflow-x-hidden small:h-[416px]">
          <div className="flex h-[54px] w-[100%] cursor-pointer items-center  border-t-[0.5px] border-b-[0.5px] border-solid border-[#d3d9e0] bg-[white] hover:bg-[#f3f5f7] small:h-[49px] small:w-[298px]">
            <img
              src={avatar}
              className="ml-[40px] mr-[5px] h-[20px] w-[20px] rounded-full"
              alt=""
            ></img>
            <span className=" mr-[6px] text-[14px] font-semibold">
              emil0519
            </span>
            <span className=" mr-[6px] text-[12px] text-[#737a81]">
              emil0519
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Assignee;
