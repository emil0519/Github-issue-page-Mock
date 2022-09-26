import { useEffect, useState } from "react";

import { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";

import { superbase } from "../utils/client";

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

  //Will render signOut function later

  if (user) {
    navigate("/App");
  }

  return (
    <>
      <h1>Hello, please sign in.</h1>
      <button onClick={signInWithGitHub}>Sign In</button>
    </>
  );
};

export default App;
