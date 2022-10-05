import { useEffect, useState } from "react";
import NewAssignee from "../Reusable/NewAssignee";
import { useGetAllIssuesQuery } from "../../state/issueRTK";

function PopUpDataProcessor() {
  const [assigneesData, setAssigneesData] = useState<any>();
  const [labelData, setLabelData] = useState<any>();

  const controller = [
    {
      title: "Assignee",
      default: {
        descriptionWithoutLink: "No one- ",
        descriptionWithLink: "assign yourself",
        desLink: "https://github.com/emil0519?tab=repositories",
        isLinkDecoration: false,
        inputPlaceholder: "Type or choose a user",
        mainHeader: "Assign up to 10 people to this issue",
        subHeader: "Suggestion",
      },
      data: assigneesData,
      function: hello,
    },
    {
      title: "Labels",
      default: {
        descriptionWithoutLink: "None yet",
        inputPlaceholder: "Filter labels",
        mainHeader: "Apply labels to this issue",
      },
      data: labelData,
      function: hello,
    },
  ];
  function hello() {
    console.log("hello");
  }
  const fetchedAssigneeData = useGetAllIssuesQuery({
    baseType: "repos",
    type: "/assignees",
    name: "/emil0519",
    repo: "/testing-issues",
    query: "",
  });

  const fetchedLabelData = useGetAllIssuesQuery({
    baseType: "repos",
    type: "/labels",
    name: "/emil0519",
    repo: "/testing-issues",
    query: "",
  });

  useEffect(() => {
    if (fetchedLabelData.data !== undefined) {
      const processedLabelData = fetchedLabelData.data.map((item: any) => ({
        icon: item.color,
        title: item.name,
        description: item.description,
      }));
      setLabelData(processedLabelData);
    }
  }, [fetchedLabelData]);

  useEffect(() => {
    if (fetchedAssigneeData.data !== undefined) {
      const processedAssigneeData = fetchedAssigneeData.data.map(
        (item: any) => ({
          icon: item.avatar_url,
          title: item.login,
        })
      );
      setAssigneesData(processedAssigneeData);
    }
  }, [fetchedAssigneeData]);

  // useEffect(() => console.log(controller), [controller]);
  if (controller === undefined) {
    return <></>;
  }
  return (
    <section className="mt-[48px] flex flex-col">
      <NewAssignee controller={controller} />

      {/* <NewAssignee controller={controller} />
      <NewAssignee controller={controller} />
      <NewAssignee controller={controller} />
      <NewAssignee controller={controller} />
      <NewAssignee controller={controller} />
      <NewAssignee controller={controller} /> */}
    </section>
  );
}

export default PopUpDataProcessor;
