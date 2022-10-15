import { useEffect, useState } from "react";
import AssigneeLabelTimeline from "./AssigneeLabelTimeline";
import InitialContent from "./InitialContent";

export type DataCommentProps = {
  data: any;
  timeline?: any;
};

function IssuePageProcessor({ data, timeline }: DataCommentProps) {
  const [avatarData, setAvatarData] = useState();

  const optionData = [];

  if (data === undefined || timeline.data === undefined) {
    return <></>;
  } else if (timeline.data !== undefined && timeline.data.length === 0) {
    return <InitialContent data={data} type={"body"} />;
  } else {
    return (
      <>
        <InitialContent data={data} type={"body"} />
        {timeline.data.map((item: any, index: number) => {
          if (item.event === "commented") {
            return (
              <>
                <InitialContent data={item} type={"comment"} count={index} />
              </>
            );
          } else {
            const dataForTimeline = [
              {
                actor: item.actor,
                action: item.event,
                date: item.created_at,
                content:
                  item.assignee === undefined
                    ? item.label === undefined
                      ? item.rename
                      : item.label
                    : item.assignee,
                stateReason: item.event === "closed" ? item.state_reason : null,
              },
            ];

            return (
              <>
                <AssigneeLabelTimeline
                  data={dataForTimeline}
                  origin={data}
                  avatarData={[item.actor]}
                />
              </>
            );
          }
        })}
        <aside className="ml-auto mr-auto h-[1.5px] w-[95%] bg-[#d3d9e0]"></aside>
      </>
    );
  }
}

export default IssuePageProcessor;
