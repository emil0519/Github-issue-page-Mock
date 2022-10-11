import { useState } from "react";
import issueOpen from "../../img/issue-opened.svg";
import repo from "../../img/repo.png";

function AvatarIcon() {
  const [hover, setHover] = useState<boolean>(false);
  return (
    <section className="relative mr-[8px]">
      <img
        src="https://avatars.githubusercontent.com/u/97882056?v=4"
        className="h-[20px] w-[20px] cursor-pointer rounded-[9999px]"
        alt=""
        onMouseEnter={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      ></img>
      <div
        className={`${
          hover ? "flex" : "hidden"
        } absolute top-[24px] left-[1px] h-[max-content] w-[71vw] flex-col border-[1px] border-solid border-[#d2d8de] bg-white p-[12px]`}
      >
        <img
          src="https://avatars.githubusercontent.com/u/97882056?v=4"
          className="mt-[9px] ml-[14px] h-[40px] w-[40px] cursor-pointer rounded-[9999px]"
          alt=""
        ></img>
        <span className="mt-[8px] ml-[14px] text-xs font-semibold">
          emil0519
        </span>
        <div className="ml-[14px] mt-[5px] flex items-center">
          <img
            src={issueOpen}
            className="mr-[5px] h-[20px] w-[20px]"
            alt=""
          ></img>
          <span className="text-xs text-[#525960] ">Opened this issue</span>
        </div>
        <div className="ml-[14px] mt-[5px] flex items-center">
          <img src={repo} className="mr-[5px] h-[20px] w-[20px]" alt=""></img>
          <span className="text-xs text-[#525960] ">Owns this repository</span>
        </div>
      </div>
    </section>
  );
}

export default AvatarIcon;
