import { IssueClosedIcon, CheckCircleIcon } from "@primer/octicons-react";
import { useEffect, useState } from "react";
import down from "../img/triangle-down.svg";
import { useGetAllIssuesQuery } from "../state/issueRTK";
import { useSearchParams } from "react-router-dom";
import { useUpdateMutation } from "../state/issueRTK";

type CheckDropProps = {
  checkControl: {
    title: string;
    data: {
      message: string;
      description: string;
    }[];
  }[];
};

function CheckDrop({ checkControl }: CheckDropProps) {
  const [showCheckDrop, setShowCheckDrop] = useState<boolean>(false);

  const [update] = useUpdateMutation();
  const [state, setState] = useState<any>();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const { data, isError, isSuccess, isLoading } = useGetAllIssuesQuery({
    baseType: "repos",
    type: "/issues",
    name: "/emil0519",
    repo: "/testing-issues",
    query: `/${query}`,
  });

  const handleState = async (param: string) => {
    console.log("call handlestate");

    let body: any;
    switch (param) {
      case "completed": {
        body = {
          state: "closed",
          state_reason: "completed",
        };
        break;
      }
      case "not planned": {
        body = {
          state: "closed",
          state_reason: "not_planned",
        };
        break;
      }
      case "reopen": {
        console.log("get into reopen");

        body = {
          state: "open",
          state_reason: "reopened",
        };
        break;
      }
      default:
        return;
    }
    await update({
      baseType: "repos",
      type: "/issues",
      name: "/emil0519",
      repo: "/testing-issues",
      query: `/${query}`,
      content: JSON.stringify(body),
    });
  };

  useEffect(() => {
    if (data !== undefined)
      setState({
        state: data.state,
        stateReason: data.state_reason,
      });
  }, [data]);

  if (state === undefined) {
    return <></>;
  }
  return (
    <div className="relative flex rounded-md  hover:bg-[#f1f2f4]">
      <div
        onClick={() => {
          if (state.state === "open") {
            handleState("completed");
          } else {
            handleState("reopen");
          }
        }}
        className="flex h-[32px] w-[132px] cursor-pointer items-center justify-center rounded-l-md border-[0.5px] border-solid border-[#e2e5ea] bg-[#f5f7f9] p-[5px_16px] hover:bg-[#f3f4f6]"
      >
        {/* here */}
        {state.state === "open" ? (
          <IssueClosedIcon
            fill="#7849d5"
            className="mr-[4px] h-[16px] w-[16px]"
          />
        ) : (
          <IssueClosedIcon
            fill="#1a7335"
            className="mr-[4px] h-[16px] w-[16px]"
          />
        )}
        <span className="text-[14px] text-[#212529] ">
          {state.state === "open" ? "Close issue" : "Reopen"}
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
              console.log(state.state);
              if (state.state === "open") {
                handleState("completed");
              } else {
                handleState("reopen");
              }
            }}
            className="ml-[15px] mt-[10px] flex "
          >
            <CheckCircleIcon fill="#8054d7" className="mt-[4px]" />
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
          onClick={() => handleState("not planned")}
          className="flex h-[max-content] w-[100%] cursor-pointer flex-col hover:bg-[#0469d6] hover:text-white"
        >
          <div className="ml-[15px] mt-[10px] mb-[7px] flex cursor-pointer">
            <CheckCircleIcon fill="#57606a" className="mt-[4px]" />
            <span className="ml-[5px] text-[14px] font-semibold">
              Closed as not planned
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
