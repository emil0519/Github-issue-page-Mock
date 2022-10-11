import AvatarIcon from "../component/Reusable/AvatarIcon";

function AssigneeLabel() {
  return (
    <section className="mt-[24px] mr-auto ml-auto flex w-[95%] flex-col items-start">
      <div className="flex">
        <span className="mr-[12px] text-xs text-[#6b7279]">Assignees</span>
        <AvatarIcon />
      </div>
    </section>
  );
}

export default AssigneeLabel;
