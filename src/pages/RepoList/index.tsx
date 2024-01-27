import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useGetRepoQuery } from "../../state/issueRTK";
import Footer from "../../component/Footer";
import RepoLayout from "./RepoLayout";

const RepoList = () => {
  const [userInfo, setUserInfo] = useState<any>();
  const [skip, setSkip] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const items = localStorage.getItem("supabase.auth.token");
    if (items !== null && items !== undefined) {
      setUserInfo(JSON.parse(items));
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (userInfo !== undefined) {
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
  }, [error]);
  if (userInfo === undefined) {
    return <></>;
  }

  return (
    <>
      <RepoLayout
        data={data}
        user={userInfo.currentSession.user.user_metadata}
      />
      <Helmet>
        <meta charSet="utf-8" />
        <title>Your repositories</title>
        <link rel="canonical" href="/App" />
        <meta name="keywords" content="github, github repositories" />
        <meta name="author" content="Emil Lau" />
      </Helmet>
      <Footer />
    </>
  );
}

export default RepoList;
