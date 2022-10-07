import EditSection from "./EditSection";

import Submit from "./Submit";
import PopUpDataProcessor from "./PopUpDataProcessor";
import avatar from "../../img/github-avatar.png";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (controller !== undefined) {
      setPostData({
        title: "this is title",
        body: "this is body",
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

  useEffect(() => console.log(postData), [postData]);

  return (
    <section className="flex flex-col med:relative med:m-[0_auto] med:w-[95%] med:flex-row med:justify-center">
      <img
        src={avatar}
        alt=""
        className="mt-[36px] hidden med:mr-[19px] med:block med:h-[40px] med:w-[40px] med:rounded-full"
      ></img>
      <EditSection />
      <PopUpDataProcessor
        controller={controller}
        setController={setController}
      />
      <Submit postData={postData} />
    </section>
  );
}

export default NewIssueWrapper;
