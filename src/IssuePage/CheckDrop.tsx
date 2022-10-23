import {
  CheckCircleIcon,
  IssueClosedIcon,
  SkipIcon,
} from "@primer/octicons-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import down from "../img/triangle-down.svg";
import { useGetAllIssuesQuery, useUpdateMutation } from "../state/issueRTK";

type CheckDropProps = {
  checkControl: {
    title: string;
    data: {
      message: string;
      description: string;
    }[];
  }[];
  postData:
    | {
        title: string;
        body: string;
        assignees?: string[] | undefined;
        labels?: string[] | undefined;
      }
    | undefined;
  setInputValue: React.Dispatch<React.SetStateAction<string>> | undefined;
  setPostData: React.Dispatch<any>;
};

function CheckDrop({
  checkControl,
  postData,
  setInputValue,
  setPostData,
}: CheckDropProps) {
  const [showCheckDrop, setShowCheckDrop] = useState<boolean>(false);

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

  const [update] = useUpdateMutation();
  const [state, setState] = useState<any>();
  const [localState, setLocalState] = useState<string>("close");
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [userInfo, setUserInfo] = useState<any>();
  const [skip, setSkip] = useState(true);
  const [repo, setRepo] = useState("");
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

  const { data } = useGetAllIssuesQuery(
    {
      baseType: "repos",
      type: "/issues",
      name: `/${
        skip ? "" : userInfo.currentSession.user.user_metadata.user_name
      }`,
      repo: `/${skip ? "" : repo}`,
      query: `/${query}`,
      token: `${skip ? "" : userInfo.currentSession.provider_token}`,
    },
    { skip: skip }
  );

  const handleState = async (param: string) => {
    let body: any;
    switch (param) {
      case "completed":
      case "not planned": {
        body = {
          state: "closed",
          state_reason: param === "completed" ? "completed" : "not_planned",
        };
        if (
          state.state === "open" &&
          postData !== undefined &&
          postData.body.length !== 0
        ) {
          await update({
            baseType: "repos",
            type: "/issues",
            name: `/${userInfo.currentSession.user.user_metadata.user_name}`,
            repo: `/${repo}`,
            query: `/${query}/comments`,
            content: JSON.stringify(postData),
          });
          setInputValue!("");
        }
        setLocalState("reopen");
        break;
      }
      // case "not planned": {
      //   body = {
      //     state: "closed",
      //     state_reason: "not_planned",
      //   };
      //   setLocalState("reopen");
      //   break;
      // }
      case "reopen": {
        body = {
          state: "open",
          state_reason: "reopened",
        };
        setLocalState("close");

        break;
      }
      default:
        return;
    }
    await update({
      baseType: "repos",
      type: "/issues",
      name: `/${userInfo.currentSession.user.user_metadata.user_name}`,
      repo: `/${repo}`,
      query: `/${query}`,
      content: JSON.stringify(body),
    });
  };

  useEffect(() => {
    if (data !== undefined) {
      setState({
        state: data.state,
        stateReason: data.state_reason,
      });
      if (data.state === "closed") {
        setLocalState("reopen");
      }
    }
  }, [data]);

  if (state === undefined) {
    return <></>;
  }
  return (
    <div className="relative flex rounded-md  hover:bg-[#f1f2f4]">
      <div
        onClick={() => {
          if (state.state === "open") {
            localState === "close"
              ? handleState("completed")
              : handleState("not planned");
          } else {
            switch (localState) {
              case "reopen": {
                handleState("reopen");
                break;
              }
              case "complete": {
                handleState("completed");
                break;
              }
              case "not planned": {
                handleState("not planned");
                break;
              }
              default: {
                return;
              }
            }
          }
        }}
        className="flex h-[32px] w-[max-content] cursor-pointer items-center justify-center rounded-l-md border-[0.5px] border-solid border-[#e2e5ea] bg-[#f5f7f9] p-[5px_16px] hover:bg-[#f3f4f6]"
      >
        {state.state === "open" ? (
          localState === "close" ? (
            <IssueClosedIcon
              fill="#7849d5"
              className="mr-[4px] h-[16px] w-[16px]"
            />
          ) : (
            <SkipIcon fill="#585f68" className="mr-[4px] h-[16px] w-[16px]" />
          )
        ) : localState === "reopen" ? (
          <IssueClosedIcon
            fill="#1a7335"
            className="mr-[4px] h-[16px] w-[16px]"
          />
        ) : localState === "complete" ? (
          <CheckCircleIcon
            fill="#7e59d0"
            className={`mt-[4px] mb-[3px] mr-[3px]`}
          />
        ) : (
          <SkipIcon fill="#57606a" className="mt-[4px] mb-[3px] mr-[3px]" />
        )}
        <span className="text-[14px] text-[#212529] ">
          {state.state === "open"
            ? postData === undefined
              ? "Close issue"
              : postData.body.length === 0
              ? "Close issue"
              : "Close with comment"
            : localState === "not planned"
            ? "Closed as not planned"
            : localState === "complete"
            ? "Closed as complete"
            : "Reopen"}
        </span>
      </div>
      <div
        onClick={() => setShowCheckDrop(true)}
        className="flex h-[32px] w-[42px] cursor-pointer items-center justify-center rounded-r-md border-[0.5px] border-l-0 border-solid border-[#e2e5ea] bg-[#f5f7f9]"
      >
        <img src={down} alt="" className="h-[8px] w-[8px]"></img>
      </div>
      <div
        // 透明外面，點擊會關掉彈窗
        onClick={() => setShowCheckDrop(false)}
        className={`${
          showCheckDrop ? "fixed" : "hidden"
        } top-0 right-0 bottom-0 left-0 z-[2] flex bg-[black] p-[16px] opacity-25 small:opacity-0`}
      ></div>
      <section
        className={`${
          showCheckDrop ? "flex" : "hidden"
        } absolute top-[31px] z-[2] h-[max-content] w-[298px] cursor-pointer flex-col rounded-md border-[0.5px] border-solid border-[#d4dae0] bg-white`}
      >
        <div className="flex h-[fit-content] w-[100%] cursor-pointer flex-col hover:bg-[#0469d6] hover:text-white">
          <div
            onClick={() => {
              if (state.state === "open") {
                setLocalState("close");
                setShowCheckDrop(false);
              } else {
                setLocalState("reopen");
                setShowCheckDrop(false);
              }
            }}
            className="ml-[15px] mt-[10px] flex "
          >
            <CheckCircleIcon
              fill={`${state.state === "open" ? "#7e59d0" : "#1a7335"}
`}
              className={`mt-[4px]`}
            />
            <span className="ml-[5px] text-[14px] font-semibold">
              {state.state === "open" ? "Closed as completed" : "Reopen issue"}
            </span>
          </div>
          {state.state === "open" && (
            <div className="ml-[37px] flex">
              <span className="text-[12px]">Done, closed, fixed, resolved</span>
            </div>
          )}
        </div>
        <div
          onClick={() => {
            if (state.stateReason === "not_planned") {
              setLocalState("complete");
            } else {
              setLocalState("not planned");
            }
            setShowCheckDrop(false);
          }}
          className="flex h-[max-content] w-[100%] cursor-pointer flex-col hover:bg-[#0469d6] hover:text-white"
        >
          <div className="ml-[15px] mt-[10px] mb-[7px] flex cursor-pointer">
            {state.state === "open" || state.stateReason === "completed" ? (
              <SkipIcon fill="#57606a" className="mt-[4px]" />
            ) : (
              <CheckCircleIcon fill="#7e59d0" className={`mt-[4px]`} />
            )}

            <span className="ml-[5px] text-[14px] font-semibold">
              {state.state === "open" || state.stateReason === "completed"
                ? "Closed as not planned"
                : "Closed as completed"}
            </span>
          </div>
          {state.state === "open" && (
            <div className="ml-[37px] flex cursor-pointer">
              <span className="mb-[7px] text-[12px]">
                Won't fix, can't repo, duplicate, stale
              </span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default CheckDrop;
