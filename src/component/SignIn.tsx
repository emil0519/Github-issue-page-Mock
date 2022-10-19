import { useEffect, useState } from "react";
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

  useEffect(() => console.log(user), [user]);

  //Will render signOut function later

  if (user) {
    navigate("/Repo");
  }

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
      <div className="mt-[16px] flex h-[220px] w-[308px] flex-col items-center border-[1px] border-solid border-[#e4e8ea] bg-white">
        <span className="mt-[16px] w-[85%] text-center text-[16px] font-semibold">
          Welcome to Github Issue Remote Control
        </span>
        <span className="mt-[32px] w-[85%] text-center text-[14px] text-[grey]">
          Sign in to choose your repository and have fun.
        </span>
        <div
          onClick={signInWithGitHub}
          className="mt-[28px] flex h-[32px] w-[240px] cursor-pointer items-center justify-center rounded-md bg-[#2fa455]"
        >
          <span className="text-[14px] text-white">Sign in</span>
        </div>
      </div>
    </section>
  );
};

export default App;
