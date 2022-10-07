import { PostDataProps } from "./NewIssueWrapper";
import { useCreateIssueMutation } from "../../state/issueRTK";

function Submit({ postData }: PostDataProps) {
  const [createIssue] = useCreateIssueMutation();
  const handleSubmit = async () => {
    console.log("submit");
    await createIssue({
      baseType: "repos",
      type: "/issues",
      name: "/emil0519",
      repo: "/testing-issues",
      query: "",
      newIssue: JSON.stringify(postData),
    });
  };

  return (
    <section
      onClick={() => handleSubmit()}
      className="mt-[32px] flex w-[100%] justify-center med:absolute med:top-[74%] med:right-[250px] med:h-[32px] med:w-[147px] med:cursor-default"
    >
      <section className="flex h-[32px] w-[95%] items-center justify-center rounded-md border-[0.3px] border-solid border-[#79b288] bg-[#8acd9a]">
        <span className="text-[16px] font-semibold text-[#e8f5eb]">
          Submit new issue
        </span>
      </section>
    </section>
  );
}
export default Submit;
