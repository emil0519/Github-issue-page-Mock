import x from "../img/x.svg";
import { XIcon } from "@primer/octicons-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Clear() {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  return (
    <div
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseOut={() => {
        setHover(false);
      }}
      onClick={() => navigate("/")}
      className={`ml-[0] ${
        query !== null ? "flex" : "hidden"
      } mt-[16px] items-center`}
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
