import { useEffect, useState } from "react";
// const _ = require("lodash");

type EmojiProps = {
  data: any;
};

function Reaction({ data }: EmojiProps) {
  const [hover, setHover] = useState<string>("");
  // useEffect(() => console.log(data), [data]);
  if (data === undefined) {
    return <></>;
  }
  if (data === undefined && data.length === 0) {
    return <></>;
  }
  return (
    <>
      {data.map((item: any, index: number) => {
        return (
          <section
            onMouseOver={() => setHover(item[0])}
            onMouseOut={() => setHover("")}
            className={`${
              index === 0 ? "mr-0" : "mr-[8px]"
            } z-[2] ml-[8px] flex h-[26px] w-[42px] cursor-pointer items-center justify-between rounded-[15px] border-[1px] border-solid border-[#1760cf] bg-[#d9f2fe] hover:bg-[#aedffd]`}
          >
            <span className="ml-[3px] mb-[7px] h-[16px] w-[16px]">
              {(() => {
                switch (item[0]) {
                  case "+1": {
                    return "👍";
                  }
                  case "-1": {
                    return "👎";
                  }
                  case "laugh": {
                    return "😁";
                  }
                  case "hooray": {
                    return "🎉";
                  }
                  case "confused": {
                    return "😕";
                  }
                  case "heart": {
                    return "❤️";
                  }
                  case "rocket": {
                    return "🚀";
                  }
                  case "eyes": {
                    return "👀";
                  }
                  default: {
                    return;
                  }
                }
              })()}
            </span>
            <span className="mr-[6px] text-[12px] text-[#1b61cd]">
              {item[1]}
            </span>
            <div
              className={`${hover === item[0] ? "block" : "hidden"}
       absolute top-[41%] w-[max-content] cursor-text items-center justify-center rounded-md bg-black p-[5px_9px] `}
            >
              <span className="downward-triangle absolute top-[97%] left-[3px] h-[9px] w-[9px] bg-black"></span>
              <span className="text-xs text-[white]">
                emil0519 reacted with{" "}
                {(() => {
                  switch (item[0]) {
                    case "+1": {
                      return "thumbs up";
                    }
                    case "-1": {
                      return "thumbs down";
                    }
                    default: {
                      return item[0];
                    }
                  }
                })()}{" "}
                emoji
              </span>
            </div>
          </section>
        );
      })}
    </>
  );
}

export default Reaction;
