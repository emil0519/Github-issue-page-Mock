import LabelButtonsIssue from "../LabelList/LabelButtonIssue";
import OpenClosed from "../OpenClosed/OpenClosedSmall";
import Clear from "./Clear";

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
