import { useEffect } from "react";
import tag from "../img/tag.svg";
import pencil from "../img/pencil.svg";
import person from "../img/person.svg";
import {
  CircleSlashIcon,
  IssueClosedIcon,
  SyncIcon,
} from "@primer/octicons-react";
import AvatarIcon from "../component/Reusable/AvatarIcon";
import UserName from "../component/Reusable/UserName";
import PreviewLabel from "../component/Reusable/PreviewLabel";
import { hourAdder, timeAgo } from "../utils/horus";

type DataProps = {
  data: any;
  origin: any;
  avatarData: any;
};

function AssigneeLabelTimeline({ data, origin, avatarData }: DataProps) {
  // useEffect(() => console.log(data), [data]);
  if (data === undefined) {
    return <></>;
  }
  return (
    <section className="med: mr-auto ml-auto flex w-[95%] flex-col">
      <main className="ml-[9px] flex w-[100%] items-center med:ml-[79px]">
        {/* Detect the type of action */}
        {data[0].action === "closed" || data[0].action === "reopened" ? (
          data[0].action === "reopened" ? (
            <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#29994a]">
              <SyncIcon fill="white" className="h-[16px] w-[16px]" />
            </div>
          ) : data[0].stateReason === "not_planned" ? (
            <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e7ebf0]">
              <CircleSlashIcon fill="#565e67" className="h-[16px] w-[16px]" />
            </div>
          ) : (
            <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#7849d5]">
              <IssueClosedIcon fill="white" className="h-[16px] w-[16px]" />
            </div>
          )
        ) : (
          <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e7ebf0]">
            <img
              className="h-[16px] w-[16px]"
              src={
                data[0].action === "labeled" || data[0].action === "unlabeled"
                  ? `${tag}`
                  : data[0].action === "renamed"
                  ? `${pencil}`
                  : `${person}`
              }
              alt=""
            ></img>
          </div>
        )}
        <div className="ml-[8px] flex">
          <AvatarIcon data={origin} render={avatarData} />
          <UserName data={origin} render={data[0].actor} />
          <span className="mt-[2px] ml-[3px] text-[14px] text-[#4d555e]">
            {(() => {
              // 改進：這邊需要更細緻顯示狀態
              switch (data[0].action) {
                case "assigned": {
                  return "assigned";
                }
                case "unassigned": {
                  return "removed";
                }
                case "labeled": {
                  return "added";
                }
                case "unlabeled": {
                  return "removed";
                }
                case "reopened": {
                  return "reopened";
                }
                case "closed": {
                  if (data[0].stateReason === null) {
                    return "closed this as completed";
                  } else {
                    return "closed this as not planned";
                  }
                }
                case "renamed": {
                  return "changed the title";
                }
                default:
                  return;
              }
            })()}
          </span>
          <span className="mt-[2px] ml-[3px] text-[14px] text-[#4d555e]">
            {(() => {
              switch (data[0].action) {
                case "assigned":
                case "unassigned": {
                  return <UserName data={origin} render={data[0].content} />;
                }
                case "labeled":
                case "unlabeled": {
                  return <PreviewLabel labels={[data[0].content]} />;
                }
                case "renamed": {
                  return (
                    <span className="font-semibold text-[#4d555e]">
                      <s>{data[0].content.from}</s> {data[0].content.to}
                    </span>
                  );
                }

                default:
                  return;
              }
            })()}
          </span>
          <span className="mt-[2px] ml-[3px] cursor-pointer text-[14px] text-[#4d555e] hover:text-[#4982da] hover:underline">
            {(() => {
              // console.log(data[0].date);
              // return "hi";
              let hours = data[0].date.slice(0, -1);
              let obj = hourAdder(8, new Date(hours));
              let timeStamp = obj.toString().substring(4, 24);
              let differences = Date.now() - Date.parse(timeStamp);
              return timeAgo(new Date(Date.now() - differences));
            })()}{" "}
          </span>
        </div>
      </main>
      <aside className="ml-[24px] h-[20px] w-[1px] bg-[#d3d9e0] med:ml-[94px]"></aside>
    </section>
  );
}

export default AssigneeLabelTimeline;
