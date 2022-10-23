import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import EditSection from "../component/NewIssue/EditSection";
import Preview from "../component/NewIssue/Preview";
import BigAvatar from "../component/Reusable/BigAvatar";
import DropDownMenu from "../component/Reusable/DropDownMenu";
import Reaction from "../component/Reusable/Reaction";
import { useGetAllIssuesQuery, useUpdateMutation } from "../state/issueRTK";
import { hourAdder, timeAgo } from "../utils/horus";

const _ = require("lodash");

type InitalCommentProps = {
  data: any;
  type: string;
  count: number;
};

function InitialContent({ data, type, count }: InitalCommentProps) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [repo, setRepo] = useState("");
  const [userInfo, setUserInfo] = useState<any>();
  useEffect(() => {
    const items = localStorage.getItem("supabase.auth.token");
    const repo = localStorage.getItem("repo");
    if (
      items !== null &&
      items !== undefined &&
      repo !== undefined &&
      repo !== null
    ) {
      setUserInfo(JSON.parse(items));
      setRepo(JSON.parse(repo));
    }
  }, []);

  const [skip, setSkip] = useState(true);

  useEffect(() => {
    const items = localStorage.getItem("supabase.auth.token");
    const repo = localStorage.getItem("repo");
    if (
      items !== null &&
      items !== undefined &&
      repo !== undefined &&
      repo !== null
    ) {
      setUserInfo(JSON.parse(items));
      setRepo(JSON.parse(repo));
    }
  }, []);

  useEffect(() => {
    if (userInfo !== undefined && repo !== undefined) {
      setSkip(false);
    }
  }, [userInfo, repo]);

  const comments = useGetAllIssuesQuery(
    {
      baseType: "repos",
      type: "/issues",
      name: `/${
        skip ? "" : userInfo.currentSession.user.user_metadata.user_name
      }`,
      repo: `/${skip ? "" : repo}`,
      query: `/${query}/comments`,
      token: `${skip ? "" : userInfo.currentSession.provider_token}`,
    },
    { skip: skip }
  );

  const [update] = useUpdateMutation();
  const [hoverOnDots, setHoverOnDots] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [clickOnDots, setClickOnDots] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [hoverOnCancel, setHoverOnCancel] = useState<boolean>(false);

  const updateComment = async (value: string) => {
    let body: any;
    let combinedQuery = "";
    if (type === "body") {
      combinedQuery = `/${query}`;
    } else {
      if (count !== undefined && comments.data !== undefined) {
        const searchComment = comments.data.filter(
          (item: any) => item.body === value
        );

        combinedQuery = `/comments/${searchComment[0].id}`;
        // 改進：同樣這邊如果內容一樣的話會有錯
      }
    }
    body = {
      body: inputValue,
    };

    await update({
      baseType: "repos",
      type: "/issues",
      name: `/${userInfo.currentSession.user.user_metadata.user_name}`,
      repo: `/${repo}`,
      query: combinedQuery,
      content: JSON.stringify(body),
      token: userInfo.currentSession.provider_token,
    });
    setEditOpen(false);
    setInputValue("");
  };

  const initController = [
    { content: "Copy link" },
    { content: "Quote reply" },
    { content: "|" },
    { content: "Edit" },
    { content: "|" },
    { content: "Report content" },
  ];

  const commentController = [
    { content: "Copy link" },
    { content: "Quote reply" },
    { content: "Reference in new issue" },
    { content: "|" },
    { content: "Edit" },
    { content: "Hide" },
    { content: "Delete", hoverColor: "red" },
    { content: "|" },
    { content: "Report content" },
  ];

  const [postData, setPostData] = useState<any>();
  const [reactions, setReactions] = useState();
  const [render, setRender] = useState<any>();
  //下面在處理reaction的data
  useEffect(() => {
    if (data !== undefined) {
      setReactions(data.reactions);
    }
  }, [data]);

  useEffect(() => {
    if (reactions !== undefined) {
      const newReaction: any = JSON.parse(JSON.stringify(reactions));
      //deep copy，找出不是0的emoji
      delete newReaction.total_count;
      delete newReaction.url;
      const renderReaction = _.flow([
        Object.entries,
        (arr: any[]) => arr.filter(([key, value]) => value >= 1),
        Object.fromEntries,
      ])(newReaction);
      let entries = Object.entries(renderReaction);

      setRender(entries);
    }
  }, [reactions]);

  if (data === undefined) {
    return <></>;
  }
  return (
    <>
      {" "}
      <section className="flex w-[100%] med:max-w-[1022px]">
        <BigAvatar />
        <section className="flex w-[100%] max-w-[836px] flex-col">
          <section className="mr-auto ml-auto flex h-[max-content] w-[95%] max-w-[838px] flex-col rounded-md border-[1px] border-solid border-[#d4d6d9]">
            <div className="flex h-[37px] w-[100%] items-center justify-between bg-[#d9f2fe]">
              <div className="ml-[16px] flex">
                <span className="mr-[3px] cursor-pointer text-[14px] font-semibold text-[#495258] hover:text-[#407fd9] hover:underline">
                  {data.user.login}
                </span>
                <span className="mr-[3px] text-[14px] text-[#4d555e]">
                  commented
                </span>

                <span className="mr-[3px] cursor-pointer text-[14px] text-[#4d555e] hover:text-[#407fd9] hover:underline">
                  {(() => {
                    let hours = data.created_at.slice(0, -1);
                    let obj = hourAdder(8, new Date(hours));
                    let timeStamp = obj.toString().substring(4, 24);
                    let differences = Date.now() - Date.parse(timeStamp);
                    return timeAgo(new Date(Date.now() - differences));
                  })()}{" "}
                </span>
              </div>
              <div
                //給emoji的透明外層
                className={`${
                  open ? "fixed" : "hidden"
                } top-0 right-0 bottom-0 left-0 flex bg-[black] p-[16px] opacity-[0.25] small:opacity-0`}
              ></div>
              <div
                onClick={() => setClickOnDots(true)}
                onMouseEnter={() => setHoverOnDots(true)}
                onMouseOut={() => setHoverOnDots(false)}
                className="relative mr-[16px] flex w-[25px] cursor-pointer items-center"
              >
                <span
                  className={`${
                    hoverOnDots ? "bg-[#407fd9]" : "bg-[#4d555e]"
                  } cursor pointer  mr-[3px] h-[3px] w-[3px] rounded-full `}
                ></span>
                <span
                  className={`${
                    hoverOnDots ? "bg-[#407fd9]" : "bg-[#4d555e]"
                  } cursor pointer  mr-[3px] h-[3px] w-[3px] rounded-full `}
                ></span>
                <span
                  className={`${
                    hoverOnDots ? "bg-[#407fd9]" : "bg-[#4d555e]"
                  } cursor pointer  mr-[3px] h-[3px] w-[3px] rounded-full `}
                ></span>

                <section
                  className={`${
                    clickOnDots ? "flex" : "hidden"
                  } absolute top-[16px] right-[0] z-[3] h-[max-content] w-[183px] flex-col rounded-md border-[0.5px] border-solid border-[#d5dbe1] bg-white pt-[8px] pb-[8px]`}
                >
                  <DropDownMenu
                    controller={
                      type === "body" ? initController : commentController
                    }
                    content={data.body}
                    setEditOpen={setEditOpen}
                    setClickOnDots={setClickOnDots}
                    count={count}
                  />
                  <span className="upward-triangle absolute top-[-11px] left-[158px] h-[9px] w-[9px] bg-white"></span>
                  <span className="upward-triangle absolute top-[7px] left-[3px] hidden h-[9px] w-[9px] bg-white"></span>
                </section>
              </div>
              <div
                onClick={() => {
                  setClickOnDots(false);
                }}
                //給dropdown menu的透明外層
                className={`${
                  clickOnDots ? "fixed" : "hidden"
                } top-0 left-0 z-[2] flex h-[100vh] w-[100vw] bg-black p-[16px] small:opacity-0`}
              ></div>
            </div>
            <>
              {data.body === null ? (
                <i className="ml-[16px] mt-[16px] mb-[24px] text-[14px] text-[#4d555e]">
                  No description provided.
                </i>
              ) : (
                <div className="ml-[16px] mt-[16px] mb-[24px] h-[max-content]">
                  <Preview clickName="content" inputValue={data.body} />
                </div>
              )}
            </>

            <div className="flex items-center">
              {/* <div
                onClick={() => setOpen(true)}
                className={`relative m-[16px_0_16px_16px] flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-full border-[0.5px] border-solid border-[#d3d9e0] bg-[#f5f7f9] hover:bg-[#f1f2f4]`}
              >
                <img src={smile} alt="" className="h-[16px] w-[16px]"></img>
              </div>
              <PopUpSection open={open} setOpen={setOpen} /> */}
              <Reaction data={render} />
            </div>
            <section className={`${editOpen ? "block" : "hidden"}`}>
              <EditSection
                inputValue={inputValue}
                setInputValue={setInputValue}
                postData={postData}
                setPostData={setPostData}
                page={"issue"}
              />
              <div className="flex h-[49px] items-center justify-end">
                <div
                  onClick={() => setEditOpen(false)}
                  onMouseOver={() => setHoverOnCancel(true)}
                  onMouseOut={() => setHoverOnCancel(false)}
                  className="flex h-[32px] w-[79px] cursor-pointer items-center justify-center rounded-md border-[1px] border-solid border-[#d5d8da] bg-[#f5f7f9]  hover:bg-[#991026] hover:text-white"
                >
                  <span
                    className={`${
                      hoverOnCancel ? "text-white" : "text-[#991026]"
                    }`}
                  >
                    Cancel
                  </span>
                </div>
                <div
                  onClick={() => updateComment(data.body)}
                  className="mr-[12px] ml-[12px] flex h-[32px] w-[148px] cursor-pointer items-center justify-center rounded-md border-[0.5px] border-solid border-[#278644] bg-[#29994a]  hover:bg-[#288c46]"
                >
                  <span className="text-white">Update comment</span>
                </div>
              </div>
            </section>
          </section>
          <aside className="ml-[40px] h-[20px] w-[1px] bg-[#d3d9e0]"></aside>
          {/* <aside className="ml-auto mr-auto h-[1.5px] w-[95%] bg-[#d3d9e0]"></aside> */}
        </section>
      </section>
    </>
  );
}

export default InitialContent;
