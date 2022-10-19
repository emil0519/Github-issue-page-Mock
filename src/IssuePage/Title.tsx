import {
  CircleSlashIcon,
  IssueClosedIcon,
  IssueOpenedIcon,
} from "@primer/octicons-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetAllIssuesQuery, useUpdateMutation } from "../state/issueRTK";
import { hourAdder, timeAgo } from "../utils/horus";

export type DataProps = {
  data: any;
  comments?: any;
};

function Title({ data, comments }: DataProps) {
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
  const [edit, setEdit] = useState<boolean>(false);
  const [update] = useUpdateMutation();
  const [searchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState<string>();
  const query = searchParams.get("query");

  const updateTitle = async () => {
    if (data !== undefined && data.title === inputValue) {
      setEdit(false);

      return;
    } else {
      const changedTitle = {
        title: inputValue,
      };

      await update({
        baseType: "repos",
        type: "/issues",
        name: `/${userInfo.currentSession.user.user_metadata.user_name}`,
        repo: `/${repo}`,
        query: `/${query}`,
        content: JSON.stringify(changedTitle),
      });
      setEdit(false);
    }
  };

  const { issueData } = useGetAllIssuesQuery({
    baseType: "repos",
    type: "/issues",
    name: "/emil0519",
    repo: "/testing-issues",
    query: `/${query}`,
  });

  if (data === undefined || comments.data === undefined) {
    return <></>;
  }
  return (
    <section className="mt-[24px] mr-auto ml-auto flex h-[max-content] w-[95%] max-w-[1198px] flex-col items-start justify-between med:m-0">
      <div className="mt-[12px] flex w-[100%] items-center justify-between">
        {edit ? (
          <div className="flex w-[100%] items-center">
            <input
              defaultValue={data.title}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="h-[32px] w-[95%] rounded-md border-[0.5px] border-solid border-[#d0d7de] bg-[#f6f8fa] pl-[5px]"
            ></input>
          </div>
        ) : (
          <div className="flex w-[70%] flex-wrap items-center">
            <span className="mt-[16px] text-[26px]">{data.title}</span>
            <span className="ml-[3px] mt-[19px] text-[26px] text-[#4d555e]">
              #{data.number}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          {edit ? (
            <div className="flex">
              <div
                onClick={() => updateTitle()}
                className="mr-[9px] flex h-[32px] w-[65px] cursor-pointer items-center justify-center rounded-md border-[1px] border-solid border-[#d4d6d9] bg-[#f5f7f9] hover:bg-[#f1f2f4]"
              >
                <span className="mr-[3px] text-xs font-semibold">Save</span>
              </div>
              <div
                onClick={() => setEdit(false)}
                className="flex h-[28px] w-[85px] cursor-pointer items-center justify-center"
              >
                <span className="text-xs font-semibold text-[#2267d1] hover:underline">
                  Cancel
                </span>
              </div>
            </div>
          ) : (
            <div className="flex">
              <div
                onClick={() => setEdit(true)}
                className="mr-[9px] flex h-[28px] w-[48px] cursor-pointer items-center justify-center rounded-md border-[1px] border-solid border-[#d4d6d9] bg-[#f5f7f9] hover:bg-[#f1f2f4]"
              >
                <span className="mr-[3px] text-xs font-semibold">Edit</span>
              </div>
              <div className="flex h-[28px] w-[fit-content] cursor-pointer items-center justify-center rounded-md border-[1px] border-solid border-[#278443] bg-[#29994a] hover:bg-[#288c46]">
                <span className="w-[max-content] p-[5px] text-xs font-semibold text-white">
                  New issue
                </span>
              </div>
            </div>
          )}

          {/* <div className="cursor-pointer text-[14px] text-[#5c8fdd] hover:underline">
          Jump to bottom
        </div> */}
        </div>
      </div>
      <section className="mt-[8px] flex w-[100%] flex-wrap">
        <div className="flex max-w-[40%]">
          {data.state === "open" ? (
            <>
              <div className="mr-[8px] flex h-[32px] w-[max-content] items-center justify-center rounded-[2em] bg-[#1a7335] ">
                <div className="p-[5px_12px]">
                  <IssueOpenedIcon fill="white" />
                  <span className="text=[14px] ml-[3px] text-white">Open</span>
                </div>
              </div>
            </>
          ) : data.state_reason === "completed" ? (
            <div className="mr-[8px] flex h-[32px] w-[max-content] items-center justify-center rounded-[2em] bg-[#8251db] ">
              <div className="p-[5px_12px]">
                <IssueClosedIcon fill="white" />
                <span className="text=[14px] ml-[3px] text-white">Closed</span>
              </div>
            </div>
          ) : (
            <div className="mr-[8px] flex h-[32px] w-[max-content] items-center justify-center rounded-[2em] bg-[#57606a] ">
              <div className="p-[5px_12px]">
                <CircleSlashIcon fill="white" />
                <span className="text=[14px] ml-[3px] text-white">Closed</span>
              </div>
            </div>
          )}
        </div>
        <div className="flex h-[32px] items-center">
          <span className="mr-[3px] cursor-pointer text-[14px] font-bold text-[#4d555e] hover:text-[#558bdc] hover:underline">
            {data.user.login}
          </span>
          <span className="text-[14px] text-[#5c646c]">
            opened this issue{" "}
            {(() => {
              let hours = data.created_at.slice(0, -1);
              let obj = hourAdder(8, new Date(hours));
              let timeStamp = obj.toString().substring(4, 24);
              let differences = Date.now() - Date.parse(timeStamp);
              return timeAgo(new Date(Date.now() - differences));
            })()}{" "}
            · {comments.data.length} comment
            {comments.data.length === 0 || comments.data.length === 1
              ? ""
              : "s"}
          </span>
        </div>
      </section>
      <div className="mt-[16px] h-[0.5px] w-[95%] bg-[#d2d8de]"></div>
    </section>
  );
}

export default Title;
