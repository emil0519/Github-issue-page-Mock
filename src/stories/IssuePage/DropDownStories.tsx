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
  // 改進：這邊如果comment是一樣的就會出錯

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
