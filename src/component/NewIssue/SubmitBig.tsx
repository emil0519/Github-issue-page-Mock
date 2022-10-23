import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateIssueMutation,
  useGetAllIssuesQuery,
} from "../../state/issueRTK";
import { PostDataProps } from "./NewIssueWrapper";

function SubmitTest({ postData }: PostDataProps) {
  const [createIssue] = useCreateIssueMutation();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<any>();
  const [repo, setRepo] = useState("");
  const [skip, setSkip] = useState(true);

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

  const { data } = useGetAllIssuesQuery(
    {
      baseType: "repos",
      type: "/issues",
      name: `/${
        skip ? "" : userInfo.currentSession.user.user_metadata.user_name
      }`,
      repo: `/${skip ? "" : repo}`,
      query: ``,
      token: `${skip ? "" : userInfo.currentSession.provider_token}`,
    },
    { skip: skip }
  );

  const handleSubmit = async () => {
    if (postData.title.length === 0) {
      return;
    }

    await createIssue({
      baseType: "repos",
      type: "/issues",
      name: `/${userInfo.currentSession.user.user_metadata.user_name}`,
      repo: `/${repo}`,
      query: "",
      newIssue: JSON.stringify(postData),
      token: userInfo.currentSession.provider_token,
    });
    window.location.assign(`/App`);
  };

  return (
    <section
      onClick={() => handleSubmit()}
      className="hidden med:mr-[8px] med:flex med:h-[32px] med:w-[147px] med:cursor-default med:justify-center"
    >
      <section
        className={`${
          postData !== undefined && postData.title.length === 0
            ? "bg-[#8acd9a]"
            : "bg-[#2da454]"
        } ${
          postData !== undefined && postData.title.length === 0
            ? ""
            : "hover:bg-[#2c9750]"
        } ${
          postData !== undefined && postData.title.length === 0
            ? "cursor-default"
            : "cursor-pointer"
        } flex h-[32px] w-[95%] items-center justify-center rounded-md border-[0.3px] border-solid border-[#79b288] `}
      >
        <span className="text-[16px] font-semibold text-[#e8f5eb]">
          Submit new issue
        </span>
      </section>
    </section>
  );
}
export default SubmitTest;
