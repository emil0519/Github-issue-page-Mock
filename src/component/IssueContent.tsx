import IssueBoxHeader from "./IssueBoxHeader";
import IssueColumn from "./IssueColumn";
import ProTips from "./Protips";

function IssueContent() {
  return (
    <section className="mr-auto flex w-[100%] flex-col flex-nowrap small:ml-auto small:w-[95%]">
      <IssueBoxHeader />
      <IssueColumn />
      <ProTips />
    </section>
  );
}
export default IssueContent;
