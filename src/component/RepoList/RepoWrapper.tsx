import { useEffect, useState } from "react";
import { useGetRepoQuery } from "../../state/issueRTK";
import Footer from "../Footer";
import Header from "../Header";
import RepoLayout from "./RepoLayout";

function RepoWrapper() {
  const [userInfo, setUserInfo] = useState<any>();
  const [skip, setSkip] = useState(true);

  useEffect(() => {
    const items = localStorage.getItem("supabase.auth.token");
    if (items !== null && items !== undefined) {
      setUserInfo(JSON.parse(items));
    }
  }, []);

  useEffect(() => {
    if (userInfo !== undefined) {
      console.log(userInfo.currentSession.provider_token);
      setSkip(false);
    }
  }, [userInfo]);

  const { data } = useGetRepoQuery(
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
