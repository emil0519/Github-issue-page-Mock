import { useEffect, useState } from "react";
import EditSection from "../component/NewIssue/EditSection";
import EditNote from "../component/Reusable/EditNote";
import AssigneeLabel from "./AssigneeLabel";
import IssuePageProcessor from "./IssuePageProcessor";
import Title from "./Title";
import { useGetAllIssuesQuery } from "../state/issueRTK";
import { useSearchParams } from "react-router-dom";

function IssuePageWrap() {
  const [postData, setPostData] = useState<any>();
  const [searchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState<string>("");

  const query = searchParams.get("query");
  const { data, isError, isSuccess, isLoading } = useGetAllIssuesQuery({
    baseType: "repos",
    type: "/issues",
    name: "/emil0519",
    repo: "/testing-issues",
    query: `/${query}`,
  });

  const comments = useGetAllIssuesQuery({
    baseType: "repos",
    type: "/issues",
    name: "/emil0519",
    repo: "/testing-issues",
    query: `/${query}/comments`,
  });

  const timeline = useGetAllIssuesQuery({
    baseType: "repos",
    type: "/issues",
    name: "/emil0519",
    repo: "/testing-issues",
    query: `/${query}/timeline`,
  });

  return (
    <section className="flex w-[100%] flex-col">
      <Title data={data} comments={comments} />
      <AssigneeLabel data={data} />
      <IssuePageProcessor data={data} timeline={timeline} />
      <EditSection
        inputValue={inputValue}
        setInputValue={setInputValue}
        postData={postData}
        setPostData={setPostData}
        page={"issue"}
      />
      <EditNote setInputValue={setInputValue} postData={postData} />
    </section>
  );
}

export default IssuePageWrap;
