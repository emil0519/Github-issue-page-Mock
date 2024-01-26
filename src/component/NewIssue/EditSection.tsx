import {
  BoldIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CodeIcon,
  CrossReferenceIcon,
  HeadingIcon,
  ImageIcon,
  ItalicIcon,
  LinkIcon,
  ListOrderedIcon,
  ListUnorderedIcon,
  MentionIcon,
  QuoteIcon,
  ReplyIcon,
  TasklistIcon,
  TypographyIcon,
} from "@primer/octicons-react";
import { useEffect, useRef, useState } from "react";
import TextareaMarkdown, {
  TextareaMarkdownRef,
} from "textarea-markdown-editor";
import InputOptions from "../Reusable/InputOptions";

import { ImageListType } from "react-images-uploading";
import Preview from "./Preview";

export type EditSectionProps = {
  postData: {
    title: string;
    body: string;
    assignees?: string[] | undefined;
    labels?: string[] | undefined;
  };
  setPostData: React.Dispatch<any>;
  page?: string;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
};

function EditSection({
  postData,
  setPostData,
  page,
  inputValue,
  setInputValue,
}: EditSectionProps) {
  const [text, setText] = useState("");
  const ref = useRef<TextareaMarkdownRef>(null);
  const [clickName, setClickName] = useState("write");
  const [hoverOnA, setHoverOnA] = useState(false);
  const [clickOnA, setClickOnA] = useState(false);
  const [clickOnACount, setClickOnACount] = useState(0);
  const [hoverOnMarkDown, setHoverOnMarkDown] = useState(false);
  const [hoverOnLowerMarkDown, setHoverOnLowerMarkDown] = useState(false);
  const [images, setImages] = useState<any[]>([]);
  const [localImage, setLocalImage] = useState<string[][]>([]);

  const [defaultAttach, setDefaultAttach] = useState<string>(
    "Attach files by dragging & dropping, selecting or pasting them."
  );

  // Drop and preview image
  const maxNumber = 69;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    setDefaultAttach(
      "Attach files by dragging & dropping, selecting or pasting them."
    );
    setImages(imageList);
    setLocalImage(
      imageList.map((item) => [
        `<img width="1000" alt="${
          item.file!.name
        }" src="${item.dataURL!.substring(0, 50)}...">
        `,
      ])
    );
    setImages(imageList as never[]);
  };

  useEffect(() => {
    //add image name & src into input
    const inputToSet = localImage.join();
    const newInput = inputValue.concat(inputToSet);
    setInputValue(newInput);
  }, [localImage]);

  useEffect(
    () => (clickOnACount % 2 !== 0 ? setClickOnA(true) : setClickOnA(false)),
    [clickOnACount]
  );

  const inputIconsArray = [
    //[0]=JSX component,[1]=Pop-up message, [2]=item name , [3]=Showing condition (Non-applicable),
    //[4]=onClick event parameter
    [<HeadingIcon fill="#4d555e" />, "Add heading text", "title", "", ""],
    [<BoldIcon fill="#4d555e" />, "Add bold text, <Cmd+b>", "bold", "", "**"],
    [
      <ItalicIcon fill="#4d555e" />,
      "Add italic text, <Cmd+i>",
      "italic",
      "",
      "_",
    ],
    [
      <ListUnorderedIcon fill="#4d555e" />,
      "Add a bulleted list, <Cmd+Shift+8>",
      "ordered-list",
      "",
      "-",
    ],
    [
      <ListOrderedIcon fill="#4d555e" />,
      "Add a numbered list, <Cmd+Shift+7>",
      "unordered-list",
      "",
      "1.",
    ],
    [
      <TasklistIcon fill="#4d555e" />,
      "Add a task list, <Cmd+Shift+l>",
      "task-list",
      "",
      "",
    ],
  ];

  const rightIconsArray = [
    //[0]=JSX component,[1]=Pop-up message, [2]=item name, [3]=Showing condition,
    //[4]= interchangeable style, [5]=onClick event parameter
    [<HeadingIcon fill="#4d555e" />, "Add heading text", "title", "med", ""],
    [
      <BoldIcon fill="#4d555e" />,
      "Add bold text, <Cmd+b>",
      "bold",
      "med",
      "**",
    ],
    [
      <ItalicIcon fill="#4d555e" />,
      "Add italic text, <Cmd+i>",
      "italic",
      "med",
      "_",
    ],
    [
      <QuoteIcon fill="#4d555e" />,
      "Add a quote, <Cmd+Shift+.>",
      "quote",
      "",
      ">",
    ],
    [<CodeIcon fill="#4d555e" />, "Add code, <Cmd+e>", "code", "", "`"],
    [
      <LinkIcon fill="#4d555e" />,
      "Add a link, <Cmd+k>",
      "link",
      "pop-des",
      "[](url)",
    ],
    [
      <ListUnorderedIcon fill="#4d555e" />,
      "Add a bulleted list, <Cmd+Shift+8>",
      "ordered-list",
      "med",
      "-",
    ],
    [
      <ListOrderedIcon fill="#4d555e" />,
      "Add a numbered list, <Cmd+Shift+7>",
      "unordered-list",
      "med",
      "1.",
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

  return (
    <>
      <section className="ml-[19px] w-[100%] max-w-[1216px] flex-col med:m-0 med:flex-row big:flex big:w-[100%] big:items-center big:justify-center">
        <section className="w-[100%]">
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

          <Preview
            clickName={clickName}
            inputValue={inputValue}
            setInputValue={setInputValue}
            images={images}
          />
          <section
            className={`${
              clickName === "preview" ? "hidden" : "block"
            } w-[100%]`}
          >
            {/* hidden here */}
            <section className="mt-[10px] h-[max-content] w-[95%] justify-between med:justify-end">
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

                <InputOptions
                  array={inputIconsArray}
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                />
              </details>
              <InputOptions
                array={rightIconsArray}
                inputValue={inputValue}
                setInputValue={setInputValue}
              />
            </section>
            <TextareaMarkdown
              className={`flex h-[200px] w-[95%] rounded-md border-[1px] border-solid  bg-[#f5f7f9] p-[8px] pb-[150px] med:w-[98%] med:border-x-[1px] med:border-t-[1px] med:border-b-0`}
              placeholder="Leave a comment"
              value={inputValue ?? ""}
              onChange={(e) => {
                setPostData({
                  ...postData,
                  body: e.target.value,
                });
                setInputValue(e.target.value);
              }}
              ref={ref}
            ></TextareaMarkdown>
          </section>
        </section>
      </section>
    </>
  );
}

export default EditSection;
