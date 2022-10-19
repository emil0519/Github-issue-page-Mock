import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDeleteMutation, useGetAllIssuesQuery } from "../../state/issueRTK";

type ControllerProps = {
  controller: { content: string; hoverColor?: string }[];
  setEditOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setClickOnDots: React.Dispatch<React.SetStateAction<boolean>>;
  count: number;
  content?: any;
};

function DropDownMenu({
  controller,
  setEditOpen,
  setClickOnDots,
  content,
}: ControllerProps) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [userInfo, setUserInfo] = useState<any>();
  const [skip, setSkip] = useState(true);
  const [repo, setRepo] = useState("");
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

  const comments = useGetAllIssuesQuery(
    {
      baseType: "repos",
      type: "/issues",
      name: `/${
        skip ? "" : userInfo.currentSession.user.user_metadata.user_name
      }`,
      repo: `/${skip ? "" : repo}`,
      query: `/${query}/comments`,
    },
    { skip: skip }
  );
  const [del] = useDeleteMutation();
  const handleDelete = async () => {
    const searchData = comments.data.filter(
      (item: any) => item.body === content
    );

    // 改進：這邊如果comment是一樣的就會出錯

    const confirm = window.confirm("Are you sure you want to delete this?");

    if (confirm) {
      await del({
        baseType: "repos",
        type: "/issues",
        name: `/${userInfo.currentSession.user.user_metadata.user_name}`,
        repo: `/${repo}`,
        query: `/comments/${searchData[0].id}`,
      });
      setEditOpen!(false);
    }
  };

  return (
    <section>
      {controller.map((item) =>
        item.content === "|" ? (
          <div className="mt-[5px] mb-[5px] h-[1px] w-[100%] bg-[#d5dae1]"></div>
        ) : item.content === "Edit" ? (
          <div
            onClick={() => {
              console.log("edit");
              setEditOpen!(true);
              setClickOnDots(false);
            }}
            className={`p-[5px] text-[14px] text-[#212529] hover:bg-[#1760cf] hover:text-white`}
          >
            {item.content}
          </div>
        ) : item.content === "Delete" ? (
          <div
            onClick={() => handleDelete()}
            className={`p-[5px] text-[14px] text-[red] hover:bg-[red] hover:text-white`}
          >
            {item.content}
          </div>
        ) : (
          // 改進：目前寫死了，之後想更好的方法
          <div
            className={`p-[5px] text-[14px] text-[#212529] hover:bg-[#1760cf] hover:text-white`}
          >
            {item.content}
          </div>
        )
      )}
    </section>
  );
}

export default DropDownMenu;
