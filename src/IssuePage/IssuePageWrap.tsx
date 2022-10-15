import { useEffect, useState } from "react";
import EditSection from "../component/NewIssue/EditSection";
import EditNote from "../component/Reusable/EditNote";
import AssigneeLabel from "./AssigneeLabel";
import IssuePageProcessor from "./IssuePageProcessor";
import Title from "./Title";
import { useGetAllIssuesQuery, useUpdateMutation } from "../state/issueRTK";
import { useSearchParams } from "react-router-dom";
import PopUpDataProcessor from "../component/NewIssue/PopUpDataProcessor";

function IssuePageWrap() {
  const [postData, setPostData] = useState<any>();
  const [searchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState<string>("");
  const [controller, setController] = useState<any>();
  const [showDropDown, setShowDropDown] = useState("");
  const [update] = useUpdateMutation();
  const [selectedValue, setSelectedValue] = useState<string>("");
  useEffect(() => {
    const updateSideBar = async () => {
      let body: any;
      switch (showDropDown) {
        case "Assignee post": {
          console.log(controller, "in assignee");
          let selected = controller.filter(
            (item: any) => item.title === "Assignee"
          );
          console.log(selected);

          let newSelected = selected[0].selected;
          body = { assignees: newSelected };
          // 改進: what is the best practice to avoid declaring new variable?
          break;
        }
        case "Labels post": {
          let selected = controller.filter(
            (item: any) => item.title === "Labels"
          );
          let newSelected = selected[0].selected;
          body = { labels: newSelected };
          break;
        }
        default:
          return;
      }
      console.log(body);

      await update({
        baseType: "repos",
        type: "/issues",
        name: "/emil0519",
        repo: "/testing-issues",
        query: `/${query}`,
        content: JSON.stringify(body),
      });
    };
    updateSideBar();
  }, [showDropDown]);

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
      <PopUpDataProcessor
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        showDropDown={showDropDown}
        setShowDropDown={setShowDropDown}
        controller={controller}
        setController={setController}
      />
    </section>
  );
}

export default IssuePageWrap;
