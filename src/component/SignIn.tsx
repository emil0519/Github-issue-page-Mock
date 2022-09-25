import { useEffect, useReducer, useState } from "react";
// import { Outlet } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";

// import { Octokit } from '@octokit/rest';
import { superbase } from "../utils/client";
// import { userInfo } from "os";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Noto Sans TC', sans-serif;
  }

  #root {
    min-height: 100vh;
    padding: 140px 0 115px;
    position: relative;

    @media screen and (max-width: 1279px) {
      padding: 102px 0 208px;
    }
  }
`;

const App = () => {
  useEffect(() => {
    checkUser();
    window.addEventListener("hashchange", function () {
      checkUser();
    });
  }, []);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  async function checkUser() {
    const user: any | never = superbase.auth.user();
    const session: any = superbase.auth.session();
    setUser(user);
    console.log(user);
    console.log(session.provider_token);
    // get access token from this user
  }

  async function signInWithGitHub() {
    await superbase.auth.signIn(
      {
        provider: "github",
      },
      {
        scopes: "repo gist notifications",
      }
    );
  }

  async function signOut() {
    await superbase.auth.signOut();
    setUser(null);
  }

  console.log(user);

  //   const [cartItems, dispatch] = useReducer(
  //     reducer,
  //     JSON.parse((window.localStorage.getItem("cartItems") as string )) ||  [] as null
  //   );

  // const octokit = new Octokit({
  //   auth: "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",
  // });

  // const result = octokit.request("GET /repos/{owner}/{repo}/issues", {
  //   owner: "emil0519",
  //   repo: "testing-issues",
  // });

  // console.log(result)

  //   useEffect(()=>{window.localStorage.setItem(
  //     "cartItems",
  //     JSON.stringify(cartItems)
  //   );},[cartItems])
  if (user) {
    navigate("/App");
    // return (
    //   <>
    //     <h1>Hello {user}</h1>
    //     <button onClick={signOut}>Sign out</button>
    //   </>
    // );
  }

  return (
    <>
      <h1>Hello, please sign in.</h1>
      <button onClick={signInWithGitHub}>Sign In</button>
    </>
  );

  // return (
  //   <>
  //     <Reset />
  //     <GlobalStyle />
  //     <Header cartItems={[cartItems]} />
  //     <Outlet context={[cartItems, dispatch]} />
  //     <Footer />
  //   </>
  // );
};

export default App;
