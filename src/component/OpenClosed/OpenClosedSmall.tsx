import Closed from "./ClosedSmall";
import open from "../../img/issue-opened.svg";
import { useGetAllIssuesQuery } from "../../state/issueRTK";
import { UserContext } from "../../utils/useContext";
import { useContext, useEffect } from "react";

function OpenClosed() {
  const { value, setValue } = useContext(UserContext);
  const { data, isError, isSuccess, isLoading } = useGetAllIssuesQuery({
    type: "issues",
    name: "emil0519",
    repo: "testing-issues",
    query: ``,
  });

  if (data === undefined) {
    return <></>;
  }
  return (
    <section className="mt-[20px] mb-[15px] flex big:hidden">
      <div className="mr-[4px] flex cursor-pointer">
        <img
          onClick={() => console.log("clicked")}
          src={open}
          alt=""
          className="mr-[4px] h-[16px] w-[16px]"
        ></img>
        <span className="text-xs  font-semibold big:h-[21px] big:w-[72.45px]">
          {data.length} Open
        </span>
        <Closed />
      </div>
    </section>
  );
}
export default OpenClosed;
