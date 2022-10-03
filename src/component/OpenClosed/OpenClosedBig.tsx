import open from "../../img/issue-opened.svg";
import ClosedBig from "./ClosedBig";
import { UserContext } from "../../utils/useContext";

import { useGetAllIssuesQuery } from "../../state/issueRTK";
import { useContext, useEffect, useState } from "react";

function OpenClosedInHeader() {
  const { value, setValue } = useContext<any>(UserContext);
  const [baseType, setBaseType] = useState("/repos");
  const [type, setType] = useState("/issues");
  const [name, setName] = useState("/emil0519");
  const [repo, setRepo] = useState("/testing-issues");
  const [queryString, setQueryString] = useState("");

  // const [data, setData] = useState<any>(undefined);
  // useEffect(() => {
  //   setData(value.dataLength);
  //   console.log(value.dataLength);
  // }, [value]);

  useEffect(() => {
    // 將useContext的資料轉為query string
    let preQuery = [];
    if (value.search.length === 0) {
      if (value.filter.length !== 0) {
        preQuery.push(value.filter);
      }
      if (value.label.length !== 0) {
        preQuery.push(value.label.toString());
      }
      if (value.assignees.length !== 0) {
        preQuery.push(value.assignees);
      }
      if (value.sort.length !== 0) {
        preQuery.push(value.sort);
      }
      if (value.closed.length !== 0) {
        preQuery.push(value.closed);
      }
      if (value.paging.length !== 0) {
        preQuery.push(value.paging);
      }
      for (var i = 1; i < preQuery.length; i++) {
        preQuery[i] = "&" + preQuery[i];
      }
      setQueryString(`?${preQuery.join("")}`);
    } else {
      return;
    }
  }, [value]);

  const { data } = useGetAllIssuesQuery({
    baseType: baseType,
    type: type,
    name: name,
    repo: repo,
    query: `${queryString}`,
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
