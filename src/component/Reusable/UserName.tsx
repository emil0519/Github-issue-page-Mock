import { useEffect, useState } from "react";
import issueOpen from "../../img/issue-opened.svg";
import repo from "../../img/repo.png";
type UserNameProps = {
  data: any;
  render: any;
};

function UserName({ data, render }: UserNameProps) {
  const [hover, setHover] = useState<string>("");

  return (
    <section className="relative">
      <span
        onMouseEnter={() => setHover(render.login)}
        onMouseOut={() => setHover("")}
        className="cursor-pointer text-[14px] font-semibold hover:text-[#1a61ce] hover:underline"
      >
        {render.login}
      </span>
      <div
        className={`${
          hover === render.login ? "flex" : "hidden"
        } absolute top-[24px] left-[1px] z-[4] h-[max-content] w-[71vw] flex-col border-[1px] border-solid border-[#d2d8de] bg-white p-[12px]`}
      >
        <img
          src={render.avatar_url}
          className="mt-[9px] ml-[14px] h-[40px] w-[40px] cursor-pointer rounded-[9999px]"
          alt=""
        ></img>
        <span className="mt-[8px] ml-[14px] text-xs font-semibold">
          {render.login}
        </span>
        {render.login === data.user.login ? (
          <>
            <div className="ml-[14px] mt-[5px] flex items-center">
              <img
                src={issueOpen}
                className="mr-[5px] h-[20px] w-[20px]"
                alt=""
              ></img>
              <span className="text-xs text-[#525960] ">Opened this issue</span>
            </div>
            <div className="ml-[14px] mt-[5px] flex items-center">
              <img
                src={repo}
                className="mr-[5px] h-[20px] w-[20px]"
                alt=""
              ></img>
              <span className="text-xs text-[#525960] ">
                Owns this repository
                {/* 之後能夠選repo的時候再修正 */}
              </span>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}

export default UserName;
