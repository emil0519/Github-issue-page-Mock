import LabelButtonsIssue from "./LabelButtonIssue";
import Clear from "./Clear";
import OpenClosed from "./OpenClosed";

function IssueHeader() {
  return (
    <section className="mr-[auto] ml-[auto] flex w-[95%] flex-col flex-nowrap">
      <LabelButtonsIssue />
      <Clear />
      <OpenClosed />
    </section>
  );
}
export default IssueHeader;
