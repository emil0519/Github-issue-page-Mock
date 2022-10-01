import { UserContext } from "../../utils/useContext";
import { useContext } from "react";
import { useGetAllIssuesQuery } from "../../state/issueRTK";
import check from "../../img/check.svg";

function ClosedBig() {
  const { value, setValue } = useContext(UserContext);
  const { data, isError, isSuccess, isLoading } = useGetAllIssuesQuery({
    type: "issues",
    name: "emil0519",
    repo: "testing-issues",
    query: `?state=closed`,
  });
  if (data === undefined) {
    return <></>;
  }
  return (
    <div className="ml-[10px] flex cursor-pointer">
      <img src={check} alt="" className="h-[16px] w-[16px]"></img>
      <span
        className="ml-[4px] text-xs"
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

export default ClosedBig;
