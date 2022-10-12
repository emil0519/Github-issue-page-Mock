// type ArrayProps = {
//   array: string[];
// };

type CloseProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function PopUpSection({ open, setOpen }: CloseProps) {
  //   const array = ["👍", "👎", "😄", "🎉", "😕", "❤️", "🚀", "👀"];
  // 這邊尚未能用array將emoji map出來

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`${
          open ? "fixed" : "hidden"
        } top-0 right-0 bottom-0 left-0 flex bg-[black] p-[16px] opacity-25 small:opacity-0`}
      ></div>
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[40%] left-[38px] h-[58px] w-[294px] items-center justify-center rounded-md border-[0.5px] border-solid border-[#d4d6d9] bg-white`}
      >
        {/* {array.map((item: any, index: number) => ( */}
        {/* ))} */}
        <div className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center bg-[white] hover:bg-[#f1f2f4]">
          <span className="h-[16px] w-[16px]">👍</span>
        </div>
        <div className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center bg-[white] hover:bg-[#f1f2f4]">
          <span className="h-[16px] w-[16px]">👎</span>
        </div>
        <div className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center bg-[white] hover:bg-[#f1f2f4]">
          <span className="h-[16px] w-[16px]">😄</span>
        </div>{" "}
        <div className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center bg-[white] hover:bg-[#f1f2f4]">
          <span className="h-[16px] w-[16px]">🎉</span>
        </div>{" "}
        <div className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center bg-[white] hover:bg-[#f1f2f4]">
          <span className="h-[16px] w-[16px]">😕</span>
        </div>{" "}
        <div className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center bg-[white] hover:bg-[#f1f2f4]">
          <span className="h-[16px] w-[16px]">❤️</span>
        </div>{" "}
        <div className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center bg-[white] hover:bg-[#f1f2f4]">
          <span className="h-[16px] w-[16px]">🚀</span>
        </div>{" "}
        <div className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center bg-[white] hover:bg-[#f1f2f4]">
          <span className="h-[16px] w-[16px]">👀</span>
        </div>
      </div>
    </>
  );
}

export default PopUpSection;
