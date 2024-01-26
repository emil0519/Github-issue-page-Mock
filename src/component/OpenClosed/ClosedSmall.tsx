import check from "../../img/check.svg";

import { useContext, useEffect, useState } from "react";
import { useGetAllIssuesQuery } from "../../state/issueRTK";
import { UserContext } from "../../utils/useContext";

function Closed() {
  const { value, setValue } = useContext(UserContext);

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
      baseType: "repos",
      type: "/issues",
      name: `/${
        skip ? "" : userInfo.currentSession.user.user_metadata.user_name
      }`,
      repo: `/${skip ? "" : repo}`,
      query: `?state=closed`,
      token: `${skip ? "" : userInfo.currentSession.provider_token}`,
    },
    { skip: skip }
  );
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
        {value.closed === "state=closed" ? (
          <>
            <b>{data.length}</b> <b>Closed</b>
          </>
        ) : (
          <>{data.length} Closed</>
        )}
      </span>
    </div>
  );
}

export default Closed;
