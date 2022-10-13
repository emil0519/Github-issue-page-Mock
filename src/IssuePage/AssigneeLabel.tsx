import AvatarIcon from "../component/Reusable/AvatarIcon";
import PreviewLabel from "../component/Reusable/PreviewLabel";
import { DataProps } from "./Title";
import { useEffect, useState } from "react";

function AssigneeLabel({ data }: DataProps) {
  const [avatarData, setAvatarData] = useState();
  useEffect(() => {
    if (data !== undefined) {
      setAvatarData(data.assignees);
    }
  }, [data]);

  if (data === undefined) {
    return <></>;
  }
  return (
    <>
      {data.assignees.length === 0 && data.labels.length === 0 ? (
        ""
      ) : (
        <section className="mt-[24px] mr-auto ml-auto mb-[20px] flex w-[95%] flex-col">
          {data.assignees.length === 0 ? (
            ""
          ) : (
            <div className="flex">
              <span className="mr-[55px] text-xs text-[#6b7279]">
                Assignees
              </span>
              <AvatarIcon data={data} render={avatarData} />
            </div>
          )}
          {data.labels.length === 0 ? (
            ""
          ) : (
            <div className="mt-[15px] flex h-[fit-content] items-center">
              <span className="mr-[72px] text-xs text-[#6b7279]">Labels</span>
              <PreviewLabel labels={data.labels} />
            </div>
          )}

          <div className="mt-[16px] h-[0.5px] w-[95%] bg-[#d2d8de]"></div>
        </section>
      )}
    </>
  );
}

export default AssigneeLabel;
