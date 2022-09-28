import x from "../img/x.svg";
import { XIcon } from "@primer/octicons-react";
import { useState } from "react";
function Clear() {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseOut={() => {
        setHover(false);
      }}
      className=" ml-[0] mt-[22px] flex items-center big:mb-[22px]"
    >
      <XIcon
        fill="white"
        className={` mr-[16px] h-[16px] w-[16px] cursor-pointer rounded-md ${
          hover ? " bg-[#1861cf]" : "bg-[grey]"
        }`}
      />
      <span
        className={`cursor-pointer pt-[3px] text-xs font-semibold text-[#4d555e] ${
          hover ? " text-[#1861cf]" : "text-[grey]"
        }`}
      >
        Clear current search query, filters, and sorts
      </span>
    </div>
  );
}

export default Clear;
