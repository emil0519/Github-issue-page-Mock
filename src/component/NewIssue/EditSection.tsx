import { useEffect, useState } from "react";
import InputOptions from "../Reusable/InputOptions";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  TypographyIcon,
  QuoteIcon,
  CodeIcon,
  LinkIcon,
  MentionIcon,
  ImageIcon,
  ReplyIcon,
  HeadingIcon,
  BoldIcon,
  ItalicIcon,
  ListUnorderedIcon,
  ListOrderedIcon,
  TasklistIcon,
  CrossReferenceIcon,
  MarkdownIcon,
} from "@primer/octicons-react";
import info from "../../img/info.svg";
import { PostDataProps } from "./NewIssueWrapper";

type EditSectionProps = {
  postData: {
    title: string;
    body: string;
    assignees?: string[] | undefined;
    labels?: string[] | undefined;
  };
  setPostData: React.Dispatch<any>;
};

function EditSection({ postData, setPostData }: EditSectionProps) {
  const [clickName, setClickName] = useState("write");
  const [hoverOnA, setHoverOnA] = useState(false);
  const [clickOnA, setClickOnA] = useState(false);
  const [clickOnACount, setClickOnACount] = useState(0);
  const [hoverOnMarkDown, setHoverOnMarkDown] = useState(false);
  const [hoverOnLowerMarkDown, setHoverOnLowerMarkDown] = useState(false);

  useEffect(() => console.log(clickOnA), [clickOnA]);
  useEffect(
    () => (clickOnACount % 2 !== 0 ? setClickOnA(true) : setClickOnA(false)),
    [clickOnACount]
  );

  const inputIconsArray = [
    //[0]=JSX component,[1]=Pop-up message, [2]=item name
    [<HeadingIcon fill="#4d555e" />, "Add heading text", "title"],
    [<BoldIcon fill="#4d555e" />, "Add bold text, <Cmd+b>", "bold"],
    [<ItalicIcon fill="#4d555e" />, "Add italic text, <Cmd+i>", "italic"],
    [
      <ListUnorderedIcon fill="#4d555e" />,
      "Add a bulleted list, <Cmd+Shift+8>",
      "ordered-list",
    ],
    [
      <ListOrderedIcon fill="#4d555e" />,
      "Add a numbered list, <Cmd+Shift+7>",
      "unordered-list",
    ],
    [
      <TasklistIcon fill="#4d555e" />,
      "Add a task list, <Cmd+Shift+l>",
      "task-list",
    ],
  ];

  const rightIconsArray = [
    //[0]=JSX component,[1]=Pop-up message, [2]=item name, [3]=Showing condition,
    //[4]= interchangeable style
    [<HeadingIcon fill="#4d555e" />, "Add heading text", "title", "med"],
    [<BoldIcon fill="#4d555e" />, "Add bold text, <Cmd+b>", "bold", "med"],
    [
      <ItalicIcon fill="#4d555e" />,
      "Add italic text, <Cmd+i>",
      "italic",
      "med",
    ],
    [<QuoteIcon fill="#4d555e" />, "Add a quote, <Cmd+Shift+.>", "quote", ""],
    [<CodeIcon fill="#4d555e" />, "Add code, <Cmd+e>", "code", ""],
    [<LinkIcon fill="#4d555e" />, "Add a link, <Cmd+k>", "link", "pop-des"],
    [
      <ListUnorderedIcon fill="#4d555e" />,
      "Add a bulleted list, <Cmd+Shift+8>",
      "ordered-list",
      "med",
    ],
    [
      <ListOrderedIcon fill="#4d555e" />,
      "Add a numbered list, <Cmd+Shift+7>",
      "unordered-list",
      "med",
    ],
    [
      <TasklistIcon fill="#4d555e" />,
      "Add a task list, <Cmd+Shift+l>",
      "task-list",
      "med",
    ],
    [
      <MentionIcon fill="#4d555e" />,
      "Directly mention a user or team",
      "mention",
      "",
    ],
    [<ImageIcon fill="#4d555e" />, "Attach an image or video", "image", ""],
    [
      <TypographyIcon fill="#4d555e" />,
      "Reference an issue, pull request, or discussion",
      "photo",
      "",
      <CrossReferenceIcon fill="#4d555e" />,
    ],
    [<ReplyIcon fill="#4d555e" />, "Add saved reply", "reply", ""],
  ];

  //  這邊還沒能讓pop up text放到文字的左邊，之後要修

  return (
    <section className="mr-auto ml-auto flex h-[max-content] w-[95%] flex-col med:flex med:flex-col">
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
        {/* <section className="z-20 mb-[-1px] hidden w-[100%] border-b-[1px] border-[#cad1d9] med:block"> */}
        <section className="ml-[34px] w-[100%] med:m-0 big:flex big:w-[100%] big:items-center big:justify-center">
          <section className="mt-[12px] flex w-[95%] med:relative med:z-[2]">
            <div className="z-[1] hidden med:absolute med:top-[100%] med:block med:h-[0.7px] med:w-[100%] med:bg-[#cad1d9] "></div>
            <div
              onClick={() => setClickName("write")}
              className={`${
                clickName === "write" ? "bg-[white]" : "bg-[#f5f7f9]"
              } ${clickName === "write" ? "border-b-0 " : "border-b-[1px] "} ${
                clickName === "write" ? "rounded-t-md " : "rounded-t-none "
              } border-1px flex h-[41px] w-[50%] cursor-pointer items-center justify-center border-x-[1px] border-t-[1px] border-solid border-[#cad1d9] med:ml-[6px] med:h-[40px] med:w-[67px]`}
            >
              <span className="text-sm">Write</span>
            </div>
            <div
              onClick={() => setClickName("preview")}
              className={`${
                clickName === "preview" ? "bg-[white]" : "bg-[#f5f7f9]"
              } ${
                clickName === "preview" ? "border-b-0 " : "border-b-[1px] "
              } ${
                clickName === "preview" ? "rounded-t-md " : "rounded-t-none "
              } ${
                clickName === "preview"
                  ? "med:text-[black] "
                  : "text-[#58616b] "
              } ${
                clickName === "preview"
                  ? "med:border-r-[1px] "
                  : "med:border-none"
              } 
          ${clickName === "preview" ? "med:border-t-[1px]" : "med:border-none"}
          ${
            clickName === "preview"
              ? "med:border-solid med:border-[#cad1d9]"
              : "med:border-none"
          }
          ${
            clickName === "preview" ? "med:border-[#cad1d9]" : "med:border-none"
          }
          flex h-[41px] w-[50%] cursor-pointer items-center justify-center border-r-[1px] border-t-[1px]  border-solid border-[#cad1d9] text-[#58616b] med:h-[40px] med:w-[83px] med:bg-white med:hover:text-[black]`}
            >
              <span className="text-sm">Preview</span>
            </div>
          </section>
          {/* </section> */}
          <section className="mt-[10px] flex h-[max-content] w-[95%] justify-between med:justify-end">
            <details
              onMouseEnter={() => setHoverOnA(true)}
              onMouseOut={() => setHoverOnA(false)}
              onClick={() => setClickOnACount(clickOnACount + 1)}
              className=" ml-[8px] flex cursor-pointer appearance-none items-center outline-0 med:hidden"
            >
              <summary
                onMouseEnter={() => setHoverOnA(true)}
                onMouseOut={() => setHoverOnA(false)}
                className={`${
                  hoverOnA ? "text-[#2d6fd3]" : "text-[#4d555e]"
                } mr-[3px] flex list-none appearance-none items-center font-['Arial'] text-sm outline-0`}
              >
                Aa
                <ChevronUpIcon
                  fill={`${hoverOnA ? "#2d6fd3" : "#4d555e"}`}
                  className={`${clickOnA ? "h-0" : "h-[20.7px]"} ${
                    clickOnA ? "w-0" : "w-[15.8px]"
                  } mt-[3px]  `}
                />
                <ChevronDownIcon
                  fill={`${hoverOnA ? "#2d6fd3" : "#4d555e"}`}
                  className={`${clickOnA ? "h-[20.7px]" : "h-0"} ${
                    clickOnA ? "w-[15.8px]" : "w-0"
                  } mt-[3px]`}
                />
              </summary>

              <InputOptions array={inputIconsArray} />
            </details>
            <InputOptions array={rightIconsArray} />
          </section>
        </section>

        <input
          className="flex h-[200px] w-[95%] rounded-md border-[1px] border-solid border-[#cad1d9] bg-[#f5f7f9] p-[8px] pb-[150px] med:w-[98%] med:border-x-[1px] med:border-t-[1px] med:border-b-0"
          placeholder="Leave a comment"
          onChange={(e) =>
            setPostData({
              ...postData,
              body: e.target.value,
            })
          }
        ></input>
        <div className="hidden med:flex med:h-[44px] med:w-[98%] med:cursor-pointer med:items-center med:justify-between med:border-t-[1px] med:border-dashed med:border-[#cad1d9] med:bg-[#f6f8fa]">
          <span className="ml-[4px] text-[14px] text-[#57606a]">
            Attach files by dragging {"&"} dropping, selecting or pasting them.
          </span>
          <section
            onMouseOver={() => setHoverOnMarkDown(true)}
            onMouseOut={() => setHoverOnMarkDown(false)}
          >
            <MarkdownIcon
              fill={`${hoverOnMarkDown ? "#0469d6" : "#57606a"}`}
              className="relative"
            />
            <div
              className={`
            ${hoverOnMarkDown ? "med:flex" : "hidden"}  
            absolute top-[66%] right-[21px] w-[max-content] cursor-text items-center justify-center rounded-md bg-black p-[5px_9px]`}
            >
              <span className="downward-triangle absolute top-[100%] left-[200px] h-[9px] w-[9px] bg-black"></span>
              <span className="text-xs text-[white]">
                {" "}
                Styling with Markdown is supported
              </span>
            </div>
          </section>
        </div>
        <section className="hidden med:flex med:h-[45px] med:w-[100%] med:items-center">
          <div
            className="ml-[4px] mt-[10px] flex w-[217px] cursor-pointer"
            onMouseOver={() => setHoverOnLowerMarkDown(true)}
            onMouseOut={() => setHoverOnLowerMarkDown(false)}
          >
            <MarkdownIcon
              fill={`${hoverOnLowerMarkDown ? "#0469d6" : "#57606a"} ml-[5px]`}
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
        </section>
      </section>
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
      </div>
    </section>
  );
}

export default EditSection;
