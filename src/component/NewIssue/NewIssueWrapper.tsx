import { MarkdownIcon } from "@primer/octicons-react";
import { useEffect, useState } from "react";
import { useGetAllIssuesQuery } from "../../state/issueRTK";
import EditSection from "./EditSection";
import PopUpDataProcessor from "./PopUpDataProcessor";
import Submit from "./Submit";
import SubmitBig from "./SubmitBig";

export type PostDataProps = {
  postData: {
    title: string;
    body: string;
    assignees?: string[] | undefined;
    labels?: string[] | undefined;
  };
};

function NewIssueWrapper() {
  const [controller, setController] = useState<any>();
  const [postData, setPostData] = useState<any>();
  const [hoverOnLowerMarkDown, setHoverOnLowerMarkDown] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [showDropDown, setShowDropDown] = useState("");
  const [defaultAssigneesData, setDefaultAssigneesData] = useState<any>();
  const [defaultLabelData, setDefaultLabelData] = useState<any>();
  const [assigneesData, setAssigneesData] = useState<any>();
  const [labelData, setLabelData] = useState<any>();

  useEffect(() => {
    if (controller !== undefined) {
      setPostData({
        ...postData,
        title: "",
        body: "",
      });
      if (controller[0].selected.length !== 0) {
        setPostData({
          ...postData,
          assignees: controller[0].selected,
        });
      }
      if (controller[1].selected.length !== 0) {
        setPostData({
          ...postData,
          labels: controller[1].selected,
        });
      }
    }
  }, [controller]);

  useEffect(() => {
    //Options for reusable component
    setController([
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
          clearText: "clear assignee",
          isOpen: true,
          isGear: true, //can be cancel by"x" button or not
        },
        data: assigneesData,
        defaultData: defaultAssigneesData,
        selected: [] as string[],
        showSelectedData: [],
      },
      {
        title: "Labels",
        default: {
          descriptionWithoutLink: "None yet",
          inputPlaceholder: "Filter labels",
          mainHeader: "Apply labels to this issue",
          isOpen: true,
          isGear: true,
        },
        data: labelData,
        defaultData: defaultLabelData,
        selected: [] as string[],
        showSelectedData: [],
      },
      {
        title: "Projects",
        default: {
          descriptionWithoutLink: "None yet",
          inputPlaceholder: "",
          mainHeader: "",
          isOpen: false,
          isGear: true,
          selected: [] as string[],
        },
      },
      {
        title: "Milestone",
        default: {
          descriptionWithoutLink: "No milestone",
          inputPlaceholder: "",
          mainHeader: "",
          isOpen: false,
          isGear: true,
          selected: [] as string[],
        },
      },
      {
        title: "Development",
        default: {
          descriptionWithoutLink:
            "Shows branches and pull requests linked to this issue.",
          inputPlaceholder: "",
          mainHeader: "",
          isOpen: false,
          isGear: false,
          selected: [] as string[],
        },
      },
      {
        title: "Helpful resources",
        default: {
          descriptionWithLink: "GitHub Community Guidelines",
          inputPlaceholder: "",
          mainHeader: "",
          isOpen: false,
          isGear: false,
          selected: [] as string[],
        },
      },
    ]);
  }, [assigneesData, labelData]);

  const [userInfo, setUserInfo] = useState<any>();
  const [skip, setSkip] = useState(true);
  const [repo, setRepo] = useState("/testing-issues");
  useEffect(() => {
    const items = localStorage.getItem("supabase.auth.token");
    const repo = localStorage.getItem("repo");
    if (
      items !== null &&
      items !== undefined &&
      repo !== undefined &&
      repo !== null
    ) {
      setUserInfo(JSON.parse(items));
      setRepo(JSON.parse(repo));
    }
  }, []);

  useEffect(() => {
    if (userInfo !== undefined && repo !== undefined) {
      setSkip(false);
    }
  }, [userInfo, repo]);

  const fetchedLabelData = useGetAllIssuesQuery(
    {
      baseType: "repos",
      type: "/labels",
      name: `/${
        skip ? "" : userInfo.currentSession.user.user_metadata.user_name
      }`,
      repo: `/${skip ? "" : repo}`,
      query: "",
      token: `${skip ? "" : userInfo.currentSession.provider_token}`,
    },
    { skip: skip }
  );

  useEffect(() => {
    //處理fetch回來的label data
    if (fetchedLabelData.data !== undefined) {
      const processedLabelData = fetchedLabelData.data.map((item: any) => ({
        icon: item.color,
        title: item.name,
        description: item.description,
      }));
      setLabelData(processedLabelData);
      setDefaultLabelData(processedLabelData);
    }
  }, [fetchedLabelData]);

  const fetchedAssigneeData = useGetAllIssuesQuery(
    {
      baseType: "repos",
      type: "/assignees",
      name: `/${
        skip ? "" : userInfo.currentSession.user.user_metadata.user_name
      }`,
      repo: `/${skip ? "" : repo}`,
      query: "",
      token: `${skip ? "" : userInfo.currentSession.provider_token}`,
    },
    { skip: skip }
  );
  useEffect(() => {
    //處理fetch回來的assignee data
    if (fetchedAssigneeData.data !== undefined) {
      const processedAssigneeData = fetchedAssigneeData.data.map(
        (item: any) => ({
          icon: item.avatar_url,
          title: item.login,
        })
      );
      setAssigneesData(processedAssigneeData);
      setDefaultAssigneesData(processedAssigneeData);
    }
  }, [fetchedAssigneeData]);

  if (userInfo === undefined) {
    return <></>;
  }

  return (
    <section className="flex flex-col med:relative med:m-[0_auto] med:w-[95%] med:flex-row med:justify-center">
      <img
        src={userInfo.currentSession.user.user_metadata.avatar_url}
        alt=""
        className="mt-[36px] hidden med:mr-[19px] med:block med:h-[40px] med:w-[40px] med:rounded-full"
      ></img>
      <section className="mr-auto ml-auto flex h-[max-content] w-[95%] flex-col med:m-0 med:flex med:max-w-[862px] med:flex-col">
        <section className="med:border[#cad1d9] mt-[36px] flex h-[max-content] w-[100%] flex-col items-center med:relative med:mr-[12px] med:items-start med:rounded-md med:border-[0.5px] med:border-solid med:p-[3px] med:pt-[8px]">
          <div className="med:leftward-triangle med:border[#cad1d9] hidden med:absolute med:top-[10px] med:left-[-10px] med:block med:h-[18px] med:w-[10px] med:bg-[#c3cbd3] ">
            <div className="med:leftward-triangle med:border[#cad1d9] hidden med:absolute med:top-[1px] med:left-[1px] med:block med:h-[16px] med:w-[8px] med:bg-[white]"></div>
          </div>
          <input
            placeholder="Title"
            className="ml-[5px] w-[95%] rounded-md border-[1px] border-solid  border-[#cad1d9] bg-[#f6f8fa] p-[7px] med:w-[98%]"
            onChange={(e) =>
              setPostData({
                ...postData,
                title: e.target.value,
              })
            }
          ></input>
          <EditSection
            inputValue={inputValue}
            setInputValue={setInputValue}
            postData={postData}
            setPostData={setPostData}
            page={"new"}
          />
        </section>
        <section className="hidden med:flex med:h-[45px] med:w-[100%] med:items-center">
          <div
            className="ml-[4px] mt-[10px] flex w-[217px] cursor-pointer items-center justify-between med:w-[100%]"
            onMouseOver={() => setHoverOnLowerMarkDown(true)}
            onMouseOut={() => setHoverOnLowerMarkDown(false)}
          >
            <div className="flex items-center justify-start">
              <MarkdownIcon
                fill={`${
                  hoverOnLowerMarkDown ? "#0469d6" : "#57606a"
                } ml-[5px]`}
                className="relative"
              />
              <span
                className={`ml-[4px] text-[12px] ${
                  hoverOnLowerMarkDown ? "text-[#0469d6]" : "text-[#57606a]"
                }`}
              >
                Styling with Markdown is supported
              </span>
            </div>
            <SubmitBig postData={postData} />
          </div>
        </section>
      </section>
      <PopUpDataProcessor
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        showDropDown={showDropDown}
        setShowDropDown={setShowDropDown}
        controller={controller}
        setController={setController}
        type={"new"}
      />
      <Submit postData={postData} />
    </section>
  );
}

export default NewIssueWrapper;
