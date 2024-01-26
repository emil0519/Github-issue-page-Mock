import { useEffect, useState } from "react";
import issueOpen from "../../img/issue-opened.svg";
import repo from "../../img/repo.png";

function BigAvatar() {
  const [userInfo, setUserInfo] = useState<any>();
  const [hover, setHover] = useState<boolean>(false);
  useEffect(() => {
    const items = localStorage.getItem("supabase.auth.token");
    if (
      items !== null &&
      items !== undefined &&
      repo !== undefined &&
      repo !== null
    ) {
      setUserInfo(JSON.parse(items));
    }
  }, []);

  if (userInfo === undefined) {
    return <></>;
  }
  return (
    <section className="relative mr-[23px] mt-[18px] ml-[21px] hidden med:block">
      <img
        src={userInfo.currentSession.user.user_metadata.avatar_url}
        className="h-[40px] w-[40px] cursor-pointer rounded-[9999px]"
        alt=""
        onMouseEnter={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      ></img>
      <div
        className={`${
          hover ? "flex" : "hidden"
        } absolute top-[24px] left-[1px] z-[3] h-[max-content] w-[71vw] flex-col border-[1px] border-solid border-[#d2d8de] bg-white p-[12px]`}
      >
        <img
          src={userInfo.currentSession.user.user_metadata.avatar_url}
          className="mt-[9px] ml-[14px] h-[40px] w-[40px] cursor-pointer rounded-[9999px]"
          alt=""
        ></img>
        <span className="mt-[8px] ml-[14px] text-xs font-semibold">
          {userInfo.currentSession.user.user_metadata.user_name}
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

export default BigAvatar;
