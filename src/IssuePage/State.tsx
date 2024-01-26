import { IssueClosedIcon } from "@primer/octicons-react";

function State() {
  return (
    <section className="mt-[10px] mr-auto ml-auto flex w-[95%]">
      <div className="mr-[8px] flex h-[32px] w-[max-content] items-center justify-center rounded-[2em] bg-[#7849d5] ">
        <div className="p-[5px_12px]">
          <IssueClosedIcon fill="white" />
          <span className="text=[14px] ml-[3px] text-white">Closed</span>
        </div>
      </div>
      <div className="flex h-[32px] items-center">
        <span className="mr-[3px] cursor-pointer text-[14px] font-semibold text-[#a8acb0] hover:text-[#558bdc] hover:underline">
          emil0519
        </span>
        <span>opened this issue 10 days ago · 3 comments</span>
      </div>
    </section>
  );
}

export default State;
