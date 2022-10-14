import { useEffect, useState } from "react";
import info from "../../img/info.svg";
import { useUpdateMutation } from "../../state/issueRTK";
import { useSearchParams } from "react-router-dom";

type EditNoteProps = {
  postData?: {
    title: string;
    body: string;
    assignees?: string[] | undefined;
    labels?: string[] | undefined;
  };

  setInputValue?: React.Dispatch<React.SetStateAction<string>>;
};

function EditNote({ postData, setInputValue }: EditNoteProps) {
  const [update] = useUpdateMutation();
  useEffect(() => console.log(postData), [postData]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const toCreate = async () => {
    if (postData !== undefined && postData.body.length === 0) {
      return;
    }
    await update({
      baseType: "repos",
      type: "/issues",
      name: "/emil0519",
      repo: "/testing-issues",
      query: `/${query}/comments`,
      content: JSON.stringify(postData),
    });
    setInputValue!("");
  };
  return (
    <div className="mt-[16px] flex h-[fit-content] w-[95%]">
      <img src={info} alt="" className="mr-[4px] h-[16px] w-[16px]"></img>
      <span className="mb-[16px] text-[12px] text-[#575f67]">
        Remember, contributions to this repository should follow our{" "}
        <a
          href="https://docs.github.com/en/site-policy/github-terms/github-community-guidelines"
          className="text-[#1760cf] hover:underline hover:decoration-[#1760cf]"
        >
          GitHub Community Guidelines.
        </a>
      </span>
      <div className="flex h-[49px] items-center justify-end">
        <div className="h-[32px] w-[79px] cursor-pointer rounded-md border-[0.5px] border-solid border-[#e2e5ea] bg-[#f5f7f9] p-[5px_16px] text-[#991026] hover:bg-[#991026] hover:text-white">
          Close Issue
        </div>
        <div
          onClick={() => toCreate()}
          className="mr-[12px] ml-[12px] flex h-[32px] w-[148px] cursor-pointer items-center justify-center rounded-md border-[0.5px] border-solid border-[#278644] bg-[#29994a]  hover:bg-[#288c46]"
        >
          <span className="text-white">Comment</span>
        </div>
      </div>
    </div>
  );
}

export default EditNote;
