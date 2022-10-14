import {
  CircleSlashIcon,
  IssueClosedIcon,
  SyncIcon,
  CheckCircleIcon,
} from "@primer/octicons-react";
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
  const [searchParams] = useSearchParams();
  const [update] = useUpdateMutation();
  const [state, setState] = useState<any>();
  const query = searchParams.get("query");
  const { data, isError, isSuccess, isLoading } = useGetAllIssuesQuery({
    baseType: "repos",
    type: "/issues",
    name: "/emil0519",
    repo: "/testing-issues",
    query: `/${query}`,
  });

  const handleState = async (param: string) => {
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

  useEffect(() => {
    console.log(state);
  }, [state]);

  useEffect(() => {
    console.log(checkControl);
  }, [checkControl]);
  if (state === undefined) {
    return <></>;
  }
  return (
    <div className="relative flex rounded-md  hover:bg-[#f1f2f4]">
      <div className="flex h-[32px] w-[132px] cursor-pointer items-center justify-center rounded-l-md border-[0.5px] border-solid border-[#e2e5ea] bg-[#f5f7f9] p-[5px_16px]">
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
      <div className="flex h-[32px] w-[42px] cursor-pointer items-center justify-center rounded-r-md border-[0.5px] border-l-0 border-solid border-[#e2e5ea] bg-[#f5f7f9]">
        <img src={down} alt="" className="h-[8px] w-[8px]"></img>
      </div>
      <section className="absolute top-[31px] flex h-[max-content] w-[298px] cursor-pointer flex-col rounded-md border-[0.5px] border-solid border-[#d4dae0] bg-white">
        <div className="flex h-[56px] w-[100%] flex-col">
          <div
            onClick={() => {
              if (state.state === "open") {
                handleState("completed");
              } else {
                handleState("reopen");
              }
            }}
            className="ml-[15px] mt-[10px] flex"
          >
            <CheckCircleIcon fill="#080809" />
            <span className="ml-[2px] text-[14px] font-semibold">
              {state.state === "open" ? "Closed as completed" : "Reopen issue"}
            </span>
          </div>
          {state.state === "open" && (
            <div className="ml-[30px] flex">
              <span className="text-[12px] text-[#535a63]">
                Done, closed, fixed, resolved
              </span>
            </div>
          )}
        </div>
        <div
          onClick={() => handleState("not planned")}
          className="flex h-[56px] w-[100%] flex-col"
        >
          <div className="ml-[15px] mt-[10px] flex">
            <CheckCircleIcon fill="#8054d7" />
            <span className="ml-[2px] text-[14px] font-semibold">
              Closed as not planned
            </span>
          </div>
          {state.state === "open" && (
            <div className="ml-[30px] flex">
              <span className="text-[12px] text-[#535a63]">Whatever</span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default CheckDrop;
