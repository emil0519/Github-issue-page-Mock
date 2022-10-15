import { useEffect, useState } from "react";
import issueOpen from "../../img/issue-opened.svg";
import repo from "../../img/repo.png";

type AvatarProps = {
  data: any;
  render: any;
};

function AvatarIcon({ data, render }: AvatarProps) {
  //data - to compare owner of this repo and issue
  //render- for actual render in this component

  const [hover, setHover] = useState<string>("");
  if (render === undefined) {
    return <></>;
  }
  return (
    <>
      {render.map((item: any) => (
        <section key={item.login} className="relative mr-[8px]">
          <img
            src={item.avatar_url}
            className="h-[20px] w-[20px] cursor-pointer rounded-[9999px]"
            alt=""
            onMouseEnter={() => setHover(item.login)}
            onMouseOut={() => setHover("")}
          ></img>
          <div
            className={`${
              hover === item.login ? "flex" : "hidden"
            } absolute top-[24px] left-[1px] z-[4] h-[max-content] w-[71vw] flex-col border-[1px] border-solid border-[#d2d8de] bg-white p-[12px]`}
          >
            <img
              src={item.avatar_url}
              className="mt-[9px] ml-[14px] h-[40px] w-[40px] cursor-pointer rounded-[9999px]"
              alt=""
            ></img>
            <span className="mt-[8px] ml-[14px] text-xs font-semibold">
              {item.login}
            </span>
            {item.login === data.user.login ? (
              // 若這個component要render的用戶同時擁有這個創立issue跟擁有這個repo，會在hover的pop up message中顯示
              <>
                <div className="ml-[14px] mt-[5px] flex items-center">
                  <img
                    src={issueOpen}
                    className="mr-[5px] h-[20px] w-[20px]"
                    alt=""
                  ></img>
                  <span className="text-xs text-[#525960] ">
                    Opened this issue
                  </span>
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
      ))}
    </>
  );
}

export default AvatarIcon;
