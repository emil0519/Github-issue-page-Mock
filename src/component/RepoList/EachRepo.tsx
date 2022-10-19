import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RepoProps } from "./RepoLayout";

function EachRepo({ data }: RepoProps) {
  useEffect(() => console.log(data), [data]);
  const [items, setItems] = useState();
  const navigate = useNavigate();

  function handleRepo(repo: string) {
    localStorage.setItem("repo", JSON.stringify(repo));
    navigate("/App");
  }

  if (data === undefined) {
    return <></>;
  }
  return (
    <>
      {data.map((item: any) => (
        <section className="mr-auto ml-auto flex w-[95%] flex-col">
          <div onClick={() => handleRepo(item.name)} className="flex">
            <span className="cursor-pointer text-[20px] font-semibold text-[#1760cf] hover:underline">
              {item.name}
            </span>
          </div>
        </section>
      ))}
    </>
  );
}

export default EachRepo;
