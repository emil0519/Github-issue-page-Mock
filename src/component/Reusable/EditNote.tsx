import { useEffect, useState } from "react";
import info from "../../img/info.svg";
import { useUpdateMutation } from "../../state/issueRTK";
import { useSearchParams } from "react-router-dom";
import CheckDrop from "../../IssuePage/CheckDrop";

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
  const checkControl = [
    {
      title: "Close issue",
      data: [
        {
          message: "Closed as planned",
          description: "Done, closed, fixed, resolved",
        },
        {
          message: "Closed as not planned",
          description: "Won't fix, can't repro, duplicate, stale",
        },
      ],
    },
    {
      title: "Reopen",
      data: [
        { message: "Reopen issue", description: "" },
        { message: "Closed as not planned", description: "" },
      ],
    },
  ];
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
    <div className="mt-[16px] flex h-[fit-content] w-[95%] flex-col">
      <div className={`flex h-[49px] items-center justify-end`}>
        <CheckDrop checkControl={checkControl} />

        <div
          onClick={() => toCreate()}
          className={`${
            postData !== undefined && postData.body.length === 0
              ? "bg-[#8acd9a]"
              : "bg-[#29994a]"
          } ${
            postData !== undefined && postData.body.length === 0
              ? "pointer-events-none	"
              : ""
          } relative mr-[12px] ml-[12px] flex h-[32px] w-[98px] cursor-pointer items-center justify-center rounded-md border-[0.5px] border-solid border-[#278644]  hover:bg-[#288c46]`}
        >
          <span className="text-white">Comment</span>
        </div>
      </div>
      <div className="ml-[16px] mt-[10px] flex w-[100%]">
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
      </div>
    </div>
  );
}

export default EditNote;
