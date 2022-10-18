import { useEffect, useState } from "react";
import xBell from "../img/bell-slash.svg";
import { useGetAllIssuesQuery } from "../state/issueRTK";
import { useSearchParams } from "react-router-dom";
import AvatarIcon from "../component/Reusable/AvatarIcon";
import {
  LockIcon,
  PinIcon,
  ArrowRightIcon,
  TrashIcon,
} from "@primer/octicons-react";

function IssueSpecialPart() {
  const [hoverOnNoti, setHoverOnNoti] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [avatarData, setAvatarData] = useState();
  const [hoverLock, setHoverLock] = useState<boolean>(false);
  const [hoverPin, setHoverPin] = useState<boolean>(false);
  const [hoverArrow, setHoverArrow] = useState<boolean>(false);
  const [hoverTrash, setHoverTrash] = useState<boolean>(false);

  const { data, isError, isSuccess, isLoading } = useGetAllIssuesQuery({
    baseType: "repos",
    type: "/issues",
    name: "/emil0519",
    repo: "/testing-issues",
    query: `/${query}`,
  });

  // useEffect(() => {
  //   console.log(avatarData);
  // }, [avatarData]);

  useEffect(() => {
    if (data !== undefined) {
      setAvatarData(data.assignees);
    }
  }, [data]);
  if (data === undefined || avatarData === undefined) {
    return <></>;
  }
  return (
    <>
      <section className="ml-auto mr-auto w-[90%] flex-col med:m-0 med:max-w-[230px]">
        <section
          onMouseOver={() => setHoverOnNoti(true)}
          onMouseOut={() => setHoverOnNoti(false)}
          className={`mt-[10px] flex w-[100%] cursor-pointer flex-col items-start justify-center  med:relative med:h-[max-content] med:w-[240px] med:flex-col med:flex-wrap`}
        >
          <section className="mb-[5px] flex w-[95%] items-center justify-between ">
            <span
              className={`${
                hoverOnNoti ? "text-[#1c65cd]" : "text-[#6c737a]"
              } text-[12px] font-semibold `}
            >
              Notifications
            </span>
            <span
              className={`${
                hoverOnNoti ? "text-[#1c65cd]" : "text-[#6c737a]"
              } text-[12px] font-semibold`}
            >
              Customize
            </span>
          </section>
        </section>
        <div className="mt-[5px] flex h-[28px] w-[100%] max-w-[230px] cursor-pointer items-center justify-center rounded-md border-[1px] border-solid border-[#d5d8da] bg-[#f6f8fa] hover:bg-[#f3f4f6]">
          <img src={xBell} alt="" className="mr-[8px] h-[16px] w-[16px]"></img>
          <span className="text-xs">Unsubscribe</span>
        </div>
        <div className="mt-[5px] text-xs text-[#57606a]">
          You're receiving notifications because you're watching this
          repository.
        </div>
        <div className="mt-[16px] h-[0.4px] w-[92%] bg-[#cdd4db]"></div>
      </section>
      <section className="mt-[18px]  flex w-[100%] flex-col">
        <div className="mr-auto ml-auto w-[90%] text-xs font-semibold text-[#57606a]">
          {data.assignees.length} participant
          {data.assignees.length > 1 ? "s" : ""}
        </div>
        <div className="mt-[8px] mr-auto ml-auto w-[90%]">
          <AvatarIcon data={data} render={avatarData} />
        </div>
        <div className="mt-[16px] h-[0.4px] w-[92%] bg-[#cdd4db]"></div>
      </section>
      <section
        onMouseOver={() => setHoverLock(true)}
        onMouseOut={() => setHoverLock(false)}
        className="mt-[18px]  mr-auto ml-auto flex w-[90%] cursor-pointer"
      >
        <LockIcon fill={`${hoverLock ? "#448fe0" : "#24292f"}`} />
        <span
          className={`${
            hoverLock ? "text-[#448fe0]" : "text-[#24292f]"
          } ml-[4px] text-xs font-semibold`}
        >
          Lock conversations
        </span>
      </section>
      <section
        onMouseOver={() => setHoverPin(true)}
        onMouseOut={() => setHoverPin(false)}
        className="mt-[18px]  mr-auto ml-auto flex w-[90%] cursor-pointer"
      >
        <PinIcon fill={`${hoverPin ? "#448fe0" : "#24292f"}`} />
        <span
          className={`${
            hoverPin ? "text-[#448fe0]" : "text-[#24292f]"
          } ml-[4px] text-xs font-semibold`}
        >
          Pin Issue
        </span>
      </section>
      <section
        onMouseOver={() => setHoverArrow(true)}
        onMouseOut={() => setHoverArrow(false)}
        className="mt-[18px]  mr-auto ml-auto flex w-[90%] cursor-pointer"
      >
        <ArrowRightIcon fill={`${hoverArrow ? "#448fe0" : "#24292f"}`} />
        <span
          className={`${
            hoverArrow ? "text-[#448fe0]" : "text-[#24292f]"
          } ml-[4px] text-xs font-semibold`}
        >
          Transfer Issue
        </span>
      </section>
      <section
        onMouseOver={() => setHoverTrash(true)}
        onMouseOut={() => setHoverTrash(false)}
        className="mt-[18px]  mr-auto ml-auto flex w-[90%] cursor-pointer"
      >
        <TrashIcon fill={`${hoverTrash ? "#448fe0" : "#24292f"}`} />
        <span
          className={`${
            hoverTrash ? "text-[#448fe0]" : "text-[#24292f]"
          } ml-[4px] text-xs font-semibold`}
        >
          Delete issue
        </span>
      </section>
    </>
  );
}

export default IssueSpecialPart;
