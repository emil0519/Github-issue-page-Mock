import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@primer/octicons-react";
function IssueListPaging() {
  const [previous, setPrevious] = useState<boolean>(false);

  return (
    <section
      className={`mt-[30px] flex h-[32px] w-[100%] items-center justify-center`}
    >
      <div
        onClick={() => setPrevious(false)}
        className={`${
          previous ? "pointer-events-all" : "pointer-events-none"
        } ${
          previous ? "cursor-pointer" : "cursor-default"
        }  mr-[16px] flex h-[32px] w-[96px] items-center justify-center hover:rounded-sm hover:border-[1px] hover:border-solid hover:border-[#d0d7de]`}
      >
        <ChevronLeftIcon
          fill={`${previous ? "#0469d6" : "#8c959f"}`}
          className="mr-[4px] h-[16px] w-[16px]"
        />
        <span
          className={`${
            previous ? "text-[#0469d6]" : "text-[#8c959f]"
          } text-s `}
        >
          Previous
        </span>
      </div>
      <div
        onClick={() => setPrevious(true)}
        className={`${
          previous ? "pointer-events-none" : "pointer-events-all"
        } ${
          previous ? "cursor-default" : "cursor-pointer"
        }  mt-[1px] flex h-[32px] w-[96px] cursor-pointer items-center justify-center hover:rounded-sm hover:border-[1px] hover:border-solid hover:border-[#d0d7de]`}
      >
        <span
          className={`${
            previous ? "text-[#8c959f]" : "text-[#0469d6]"
          } text-s hover:`}
        >
          Next
        </span>
        <ChevronRightIcon
          fill={`${previous ? "#8c959f" : "#0469d6"}`}
          className="mr-[4px] h-[16px] w-[16px]"
        />
      </div>
    </section>
  );
}

export default IssueListPaging;
