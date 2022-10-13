import { useEffect } from "react";
import tag from "../img/tag.svg";
import person from "../img/person.svg";
import {
  CircleSlashIcon,
  IssueClosedIcon,
  SyncIcon,
} from "@primer/octicons-react";
import AvatarIcon from "../component/Reusable/AvatarIcon";

type DataProps = {
  data: any;
  origin: any;
  avatarData: any;
};

function AssigneeLabelTimeline({ data, origin, avatarData }: DataProps) {
  if (data === undefined) {
    return <></>;
  }
  return (
    <section className="mr-auto ml-auto flex w-[95%] flex-col">
      <main className="ml-[9px] flex items-center">
        {/* Detect the type of action */}
        {data[0].action === "closed" || data[0].action === "reopened" ? (
          data[0].action === "reopened" ? (
            <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#29994a]">
              <SyncIcon fill="white" className="h-[16px] w-[16px]" />
            </div>
          ) : data[0].stateReason === "not_planned" ? (
            <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#7849d5]">
              <CircleSlashIcon fill="white" className="h-[16px] w-[16px]" />
            </div>
          ) : (
            <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e7ebf0]">
              <IssueClosedIcon fill="#565e67" className="h-[16px] w-[16px]" />
            </div>
          )
        ) : (
          <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e7ebf0]">
            <img
              className="h-[16px] w-[16px]"
              src={
                data[0].action === "labeled" || data[0].action === "unlabeled"
                  ? `${tag}`
                  : `${person}`
              }
              alt=""
            ></img>
            {data.action}
          </div>
        )}
        <div className="ml-[8px] flex">
          <AvatarIcon data={origin} render={avatarData} />
        </div>
      </main>
      <aside className="ml-[26px] h-[20px] w-[1px] bg-[#d3d9e0]"></aside>
    </section>
  );
}

export default AssigneeLabelTimeline;
