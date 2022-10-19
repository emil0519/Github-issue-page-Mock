import { useEffect, useState } from "react";
import { useGetRepoQuery } from "../../state/issueRTK";
import Footer from "../Footer";
import Header from "../Header";
import Option from "../Option";
import Repo from "../Repo";

function RepoWrapper() {
  const [userInfo, setUserInfo] = useState<any>();
  const [skip, setSkip] = useState(true);

  useEffect(() => {
    const items = localStorage.getItem("supabase.auth.token");
    if (items !== null && items !== undefined) {
      setUserInfo(JSON.parse(items));
      // setSkip(false);
      //   console.log(JSON.parse(items));
    }
  }, []);

  useEffect(() => {
    if (userInfo !== undefined) {
      console.log(userInfo);
      setSkip(false);
    }
  }, [userInfo]);

  const { data } = useGetRepoQuery(
    {
      baseType: "users",
      name: "/emil0519",
      query: "/repos",
      token: `${skip ? "" : userInfo.currentSession.provider_token}`,
    },
    { skip: skip }
  );

  //   useEffect(() => {
  //     console.log(data);
  //   }, [data]);

  return (
    <>
      <Header />
      <Repo />
      <Option />
      {/* <IssueWrapper /> */}
      <Footer />
    </>
  );
}

export default RepoWrapper;
