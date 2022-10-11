import { IssueClosedIcon } from "@primer/octicons-react";

function Title() {
  return (
    <section className="mt-[24px] mr-auto ml-auto flex h-[max-content] w-[95%] flex-col items-start justify-between">
      <div className="flex w-[100%] items-center justify-between">
        <div className="flex">
          <div className="mr-[9px] flex h-[28px] w-[48px] cursor-pointer items-center justify-center rounded-md border-[1px] border-solid border-[#d4d6d9] bg-[#f5f7f9] hover:bg-[#f1f2f4]">
            <span className="mr-[3px] text-xs font-semibold">Edit</span>
          </div>
          <div className="flex h-[28px] w-[85px] cursor-pointer items-center justify-center rounded-md border-[1px] border-solid border-[#278443] bg-[#29994a] hover:bg-[#288c46]">
            <span className="text-xs font-semibold text-white">New issue</span>
          </div>
        </div>
        <div className="cursor-pointer text-[14px] text-[#5c8fdd] hover:underline">
          Jump to bottom
        </div>
      </div>
      <div className="flex items-center">
        <span className="mt-[16px] text-[26px]">One more to Closed</span>
        <span className="ml-[3px] mt-[19px] text-[26px] text-[#4d555e]">
          #9
        </span>
      </div>
      <div className="mr-[8px] flex h-[32px] w-[max-content] items-center justify-center rounded-[2em] bg-[#7849d5] ">
        <div className="p-[5px_12px]">
          <IssueClosedIcon fill="white" />
          <span className="text=[14px] ml-[3px] text-white">Closed</span>
        </div>
      </div>
      <div className="flex h-[32px] items-center">
        <span className="mr-[3px] cursor-pointer text-[14px] font-bold text-[#4d555e] hover:text-[#558bdc] hover:underline">
          emil0519
        </span>
        <span className="text-[14px] text-[#5c646c]">
          opened this issue 10 days ago · 3 comments
        </span>
      </div>
      <div className="mt-[16px] h-[0.5px] w-[95%] bg-[#d2d8de]"></div>
    </section>
  );
}

export default Title;
