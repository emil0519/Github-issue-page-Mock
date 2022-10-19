import { XIcon } from "@primer/octicons-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/useContext";

function Clear() {
  const navigate = useNavigate();
  const [showClear, setShowClear] = useState(false);
  const [hover, setHover] = useState(false);
  const { value, setValue } = useContext(UserContext);

  function handleClear() {
    setValue({
      filter: "",
      label: [],
      assignees: "",
      sort: "",
      closed: "",
      paging: "",
      search: "",
      dataLength: 0,
    });
    setShowClear(false);
  }

  useEffect(() => {
    if (
      value.filter.length > 0 ||
      value.label.length > 0 ||
      value.assignees.length > 0 ||
      value.sort.length > 0 ||
      value.closed.length > 0 ||
      value.paging.length > 0
    ) {
      setShowClear(true);
    }
  }, [value]);

  return (
    <div
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseOut={() => {
        setHover(false);
      }}
      onClick={() => handleClear()}
      className={`ml-[0] ${
        showClear ? "flex" : "hidden"
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
