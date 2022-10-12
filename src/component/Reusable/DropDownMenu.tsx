type ControllerProps = {
  controller: { content: string; hoverColor?: string }[];
  setEditOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setClickOnDots?: React.Dispatch<React.SetStateAction<boolean>>;
};

function DropDownMenu({
  controller,
  setEditOpen,
  setClickOnDots,
}: ControllerProps) {
  return (
    <section>
      {controller.map((item) =>
        item.content === "|" ? (
          <div className="mt-[5px] mb-[5px] h-[1px] w-[100%] bg-[#d5dae1]"></div>
        ) : item.content === "Edit" ? (
          <div
            onClick={() => {
              setEditOpen!(true);
              setClickOnDots!(false);
            }}
            className={`p-[5px] text-[14px] text-[#212529] hover:bg-[#1760cf] hover:text-white`}
          >
            {item.content}
          </div>
        ) : (
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
