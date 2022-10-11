import AvatarIcon from "../component/Reusable/AvatarIcon";
import PreviewLabel from "../component/Reusable/PreviewLabel";

function AssigneeLabel() {
  return (
    <section className="mt-[24px] mr-auto ml-auto flex w-[95%] flex-col ">
      <div className="flex">
        <span className="mr-[55px] text-xs text-[#6b7279]">Assignees</span>
        <AvatarIcon />
        <AvatarIcon />
      </div>
      <div className="mt-[15px] flex h-[fit-content] items-center">
        <span className="mr-[72px] text-xs text-[#6b7279]">Labels</span>
        <PreviewLabel />
      </div>
    </section>
  );
}

export default AssigneeLabel;
