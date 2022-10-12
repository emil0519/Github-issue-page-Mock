import { useState } from "react";
// import SmallPopUp from "./SmallPopUp";

type EmojiProps = {
  emoji: { emoji: string; name: string; user: string; count: number }[];
};

function Reaction({ emoji }: EmojiProps) {
  const [hover, setHover] = useState<string>("");
  const message: string[] = [];
  return (
    <>
      {emoji.map((item, index) => {
        message.push(`${item.user} reacted with ${item.name} emoji`);
        return (
          <section
            onMouseOver={() => setHover(item.name)}
            onMouseOut={() => setHover("")}
            className={`${
              index === 0 ? "mr-0" : "mr-[8px]"
            } z-[2] ml-[8px] flex h-[26px] w-[42px] cursor-pointer items-center justify-between rounded-[15px] border-[1px] border-solid border-[#1760cf] bg-[#d9f2fe] hover:bg-[#aedffd]`}
          >
            <span className="ml-[3px] mb-[7px] h-[16px] w-[16px]">
              {item.emoji}
            </span>
            <span className="mr-[6px] text-[12px] text-[#1b61cd]">
              {item.count}
            </span>
            {/* <SmallPopUp hover={hover} message={message}  /> */}
            <div
              className={`${hover === item.name ? "block" : "hidden"}
         absolute top-[41%] w-[max-content] cursor-text items-center justify-center rounded-md bg-black p-[5px_9px] `}
            >
              <span className="downward-triangle absolute top-[97%] left-[3px] h-[9px] w-[9px] bg-black"></span>
              <span className="text-xs text-[white]">
                {item.user} reacted with {item.name} emoji
              </span>
            </div>
          </section>
        );
      })}
    </>
  );
}

export default Reaction;
