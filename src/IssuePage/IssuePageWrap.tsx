import AssigneeLabel from "./AssigneeLabel";
import Title from "./Title";

function IssuePageWrap() {
  return (
    <section className="flex w-[100%] flex-col">
      <Title />
      <AssigneeLabel />
    </section>
  );
}

export default IssuePageWrap;
