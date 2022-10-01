import open from "../../img/issue-opened.svg";
import ClosedBig from "./ClosedBig";

import { useGetAllIssuesQuery } from "../../state/issueRTK";

function OpenClosedInHeader() {
  const { data, isError, isSuccess, isLoading } = useGetAllIssuesQuery({
    baseType: "repos",
    type: "issues",
    name: "emil0519",
    repo: "testing-issues",
    query: ``,
  });
  if (data === undefined) {
    return <></>;
  }
  return (
    <section className="m-0 hidden big:flex">
      <div className="mr-[4px] flex cursor-pointer big:h-[21px] big:w-[71px]">
        <img src={open} alt="" className="mr-[4px] h-[16px] w-[16px]"></img>
        <span className="text-xs font-semibold">{data.length} Open</span>
      </div>
      <ClosedBig />
    </section>
  );
}
export default OpenClosedInHeader;
