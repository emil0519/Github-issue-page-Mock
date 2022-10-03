import check from "../../img/check.svg";
import open from "../img/issue-opened.svg";
import { useGetAllIssuesQuery } from "../../state/issueRTK";
import { UserContext } from "../../utils/useContext";
import { useContext, useEffect } from "react";

function Closed() {
  const { value, setValue } = useContext(UserContext);
  const { data, isError, isSuccess, isLoading } = useGetAllIssuesQuery({
    baseType: "repos",
    type: "/issues",
    name: "/emil0519",
    repo: "/testing-issues",
    query: `?state=closed`,
  });
  if (data === undefined) {
    return <></>;
  }
  return (
    <div className="ml-[10px] flex cursor-pointer">
      <img src={check} alt="" className="h-[16px] w-[16px]"></img>
      <span
        className="ml-[4px] text-xs big:h-[21px] big:w-[72.45px]"
        onClick={() =>
          setValue({
            ...value,
            closed: `state=closed`,
          })
        }
      >
        {data.length} Closed
      </span>
    </div>
  );
}

export default Closed;
