import EditSection from "./EditSection";
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
import Submit from "./Submit";
import SubmitBig from "./SubmitBig";
import PopUpDataProcessor from "./PopUpDataProcessor";
import avatar from "../../img/github-avatar.png";
import { useEffect, useState } from "react";
import info from "../../img/info.svg";
import EditNote from "../Reusable/EditNote";

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

  return (
    <section className="flex flex-col med:relative med:m-[0_auto] med:w-[95%] med:flex-row med:justify-center">
      <img
        src={avatar}
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
        <EditNote />
      </section>
      <PopUpDataProcessor
        controller={controller}
        setController={setController}
      />
      <Submit postData={postData} />
    </section>
  );
}

export default NewIssueWrapper;
