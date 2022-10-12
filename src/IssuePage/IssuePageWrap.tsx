import { useState } from "react";
import EditSection from "../component/NewIssue/EditSection";
import EditNote from "../component/Reusable/EditNote";
import AssigneeLabel from "./AssigneeLabel";
import IssuePageProcessor from "./IssuePageProcessor";
import Title from "./Title";

function IssuePageWrap() {
  const [postData, setPostData] = useState<any>();

  return (
    <section className="flex w-[100%] flex-col">
      <Title />
      <AssigneeLabel />
      <IssuePageProcessor />
      <EditSection
        postData={postData}
        setPostData={setPostData}
        page={"issue"}
      />
      <EditNote />
    </section>
  );
}

export default IssuePageWrap;
