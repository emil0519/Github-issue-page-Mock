import { useEffect, useState } from "react";

import { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";

import { superbase } from "../utils/client";

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
