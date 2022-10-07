import { PostDataProps } from "./NewIssueWrapper";
import { useCreateIssueMutation } from "../../state/issueRTK";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Submit({ postData }: PostDataProps) {
  const [createIssue] = useCreateIssueMutation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (postData.title.length === 0) {
      return;
    }
    await createIssue({
      baseType: "repos",
      type: "/issues",
      name: "/emil0519",
      repo: "/testing-issues",
      query: "",
      newIssue: JSON.stringify(postData),
    });
    navigate("/App");
  };

  return (
    <section
      onClick={() => handleSubmit()}
      className="mt-[32px] flex w-[100%] justify-center med:absolute med:top-[74%] med:right-[250px] med:h-[32px] med:w-[147px] med:cursor-default"
    >
      <section
        className={`flex h-[32px] w-[95%] items-center justify-center rounded-md border-[0.3px] border-solid border-[#79b288] ${
          postData !== undefined && postData.title.length === 0
            ? "bg-[#8acd9a]"
            : "bg-[#2da454]"
        } ${
          postData !== undefined && postData.title.length === 0
            ? ""
            : "hover:bg-[#2c9750]"
        } ${
          postData !== undefined && postData.title.length === 0
            ? ""
            : "cursor-pointer"
        }`}
      >
        <span className="text-[16px] font-semibold text-[#e8f5eb]">
          Submit new issue
        </span>
      </section>
    </section>
  );
}
export default Submit;
