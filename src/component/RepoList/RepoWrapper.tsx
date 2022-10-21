import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGetRepoQuery } from "../../state/issueRTK";
import Footer from "../Footer";
import Header from "../Header";
import RepoLayout from "./RepoLayout";

function RepoWrapper() {
  const [userInfo, setUserInfo] = useState<any>();
  const [skip, setSkip] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const items = localStorage.getItem("supabase.auth.token");
    if (items !== null && items !== undefined) {
      setUserInfo(JSON.parse(items));
    }
  }, []);

  useEffect(() => {
    if (userInfo !== undefined) {
      console.log(userInfo);
      setSkip(false);
    }
  }, [userInfo]);

  const { data, error } = useGetRepoQuery(
    {
      baseType: "users",
      name: `/${
        skip ? "" : userInfo.currentSession.user.user_metadata.user_name
      }`,
      query: "/repos",
      token: `${skip ? "" : userInfo.currentSession.provider_token}`,
    },
    { skip: skip }
  );

  useEffect(() => {
    if (error !== undefined && error.status === 401) {
      navigate("/");
    }
    console.log(error);
  }, [error]);
  if (userInfo === undefined) {
    return <></>;
  }

  return (
    <>
      <Header />
      {/* <Repo />
      <Option /> */}
      <RepoLayout
        data={data}
        user={userInfo.currentSession.user.user_metadata}
      />
      {/* <IssueWrapper /> */}
      <Footer />
    </>
  );
}

export default RepoWrapper;
