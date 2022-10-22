import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Footer from "../component/Footer";
import Header from "../component/Header";
import Option from "../component/Option";
import Repo from "../component/Repo";
import { useGetAllIssuesQuery } from "../state/issueRTK";
import { UserContext } from "../utils/useContext";
import IssuePageWrap from "./IssuePageWrap";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }`;

function IssuePage() {
  const [value, setValue] = useState({
    filter: "",
    label: [],
    assignees: "",
    sort: "",
    closed: "",
    paging: "",
    search: "",
    dataLength: 0,
  });

  const [userInfo, setUserInfo] = useState<any>();
  const [skip, setSkip] = useState(true);
  const [repo, setRepo] = useState("");
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

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
      query: `/${query}`,
    },
    { skip: skip }
  );

  if (data === undefined) {
    return <></>;
  }
  return (
    <>
      <GlobalStyle />
      <UserContext.Provider value={{ value, setValue }}>
        <Header />
        <Repo />
        <Option />
        <IssuePageWrap />
        <Footer />
        <Helmet>
          <meta charSet="utf-8" />
          <title>{data.title}</title>
          <link rel="canonical" href="/App" />
          <meta name="keywords" content="github,github issue" />
          <meta name="author" content="Emil Lau" />
        </Helmet>
      </UserContext.Provider>
    </>
  );
}

export default IssuePage;
