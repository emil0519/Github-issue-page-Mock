import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import github from "../img/github.svg";
import { superbase } from "../utils/client";

const App = () => {
  useEffect(() => {
    checkUser();
    window.addEventListener("hashchange", function () {
      checkUser();
    });
  }, []);
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);

  async function checkUser() {
    const user: any | never = superbase.auth.user();
    const session: any = superbase.auth.session();
    setUser(user);
    setSession(session);

    // get access token from this user
  }

  async function signInWithGitHub() {
    const { user } = await superbase.auth.signIn(
      {
        provider: "github",
      },
      {
        scopes: "repo gist notifications",
      }
    );
  }
  useEffect(() => {
    if (session === undefined || session === null) {
      return;
    } else if (session.provider_token !== undefined) {
      navigate("/Repo");
    }
  }, [session]);

  return (
    <section className="flex h-[100vh] w-[100vw] flex-col items-center justify-center bg-[#f9f9f9]">
      <img
        src={github}
        className="mb-[24px] h-[48px] w-[48px] cursor-pointer"
        alt=""
      ></img>
      <span className="text-[24px] font-bold text-black">
        Sign in to GitHub
      </span>
      <div className="mt-[16px] flex h-[220px] w-[308px] flex-col items-center rounded-md border-[1px] border-solid border-[#e4e8ea] bg-white">
        <span className="mt-[16px] w-[85%] text-center text-[16px] font-semibold">
          Welcome to Github Issue Remote Control
        </span>
        <span className="mt-[32px] w-[85%] text-center text-[14px] text-[grey]">
          Sign in to choose your repository.
        </span>
        <div
          onClick={signInWithGitHub}
          className="mt-[28px] flex h-[32px] w-[240px] cursor-pointer items-center justify-center rounded-md bg-[#2fa455]"
        >
          <span className="text-[14px] text-white">Sign in</span>
        </div>
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sign in</title>
        <link rel="canonical" href="/App" />
        <meta name="keywords" content="github" />
        <meta name="author" content="Emil Lau" />
      </Helmet>
    </section>
  );
};

export default App;
