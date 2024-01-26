import open from "../../img/issue-opened.svg";
import { UserContext } from "../../utils/useContext";
import ClosedBig from "./ClosedBig";

import { useContext, useEffect, useState } from "react";
import { useGetAllIssuesQuery } from "../../state/issueRTK";

function OpenClosedInHeader() {
  const { value, setValue } = useContext<any>(UserContext);
  const [baseType, setBaseType] = useState("/repos");
  const [type, setType] = useState("/issues");
  const [name, setName] = useState("/emil0519");
  const [queryString, setQueryString] = useState("");

  // const [data, setData] = useState<any>(undefined);
  // useEffect(() => {
  //   setData(value.dataLength);

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

  const [userInfo, setUserInfo] = useState<any>();
  const [skip, setSkip] = useState(true);
  const [repo, setRepo] = useState("/testing-issues");
  useEffect(() => {
    const items = localStorage.getItem("supabase.auth.token");
    const repo = localStorage.getItem("repo");
    if (
      items !== null &&
      items !== undefined &&
      repo !== undefined &&
      repo !== null
    ) {
      setUserInfo(JSON.parse(items));
      setRepo(JSON.parse(repo));
    }
  }, []);

  useEffect(() => {
    if (userInfo !== undefined && repo !== undefined) {
      setSkip(false);
    }
  }, [userInfo, repo]);

  const { data } = useGetAllIssuesQuery(
    {
      baseType: baseType,
      type: type,
      name: `/${
        skip ? "" : userInfo.currentSession.user.user_metadata.user_name
      }`,
      repo: `/${skip ? "" : repo}`,
      query: `${queryString}`,
      token: `${skip ? "" : userInfo.currentSession.provider_token}`,
    },
    { skip: skip }
  );

  if (data === undefined) {
    return <></>;
  }
  return (
    <section className="m-0 hidden big:flex">
      <div className="mr-[4px] flex cursor-pointer big:h-[21px] big:w-[71px]">
        <img src={open} alt="" className="mr-[4px] h-[16px] w-[16px]"></img>
        <span
          onClick={() =>
            setValue({
              ...value,
              closed: `state=open`,
            })
          }
          className="text-xs font-semibold"
        >
          {value.closed === "state=open" || value.closed.length === 0 ? (
            <>
              <p className="font-semibold">{data.length} Open</p>
            </>
          ) : (
            <p className="font-normal">{data.length} Open</p>
          )}
        </span>
      </div>
      <ClosedBig />
    </section>
  );
}
export default OpenClosedInHeader;
