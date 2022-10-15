import { useDeleteMutation, useGetAllIssuesQuery } from "../../state/issueRTK";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

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
  const comments = useGetAllIssuesQuery({
    baseType: "repos",
    type: "/issues",
    name: "/emil0519",
    repo: "/testing-issues",
    query: `/${query}/comments`,
  });
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
        name: "/emil0519",
        repo: "/testing-issues",
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
