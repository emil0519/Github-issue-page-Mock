import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { hourAdder, timeAgo } from "../../utils/horus";

import { RepoProps } from "./RepoLayout";

function EachRepo({ data }: RepoProps) {
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
        <section className="mr-auto ml-auto flex min-h-[108px] w-[95%] flex-col">
          <div
            onClick={() => handleRepo(item.name)}
            className="mt-[24px] mb-[8px] flex"
          >
            <span className="cursor-pointer text-[20px] font-semibold text-[#1760cf] hover:underline">
              {item.name}
            </span>
            <div className="ml-[8px] rounded-[25px] border-[0.5px] border-solid border-[#cad1d9] p-[5px] text-[14px] text-[#4d555e]">
              Public
            </div>
          </div>
          <div className="flex items-center">
            {item.language && (
              <aside className="mr-[16px] flex items-center">
                <span
                  className={`h-[12px] w-[12px] rounded-full ${
                    item.language === "TypeScript" && "bg-[#3078c3]"
                  } ${item.language === "JavaScript" && "bg-[#f1e066]"} ${
                    item.language === "HTML" && "bg-[#e34d2c]"
                  } ${item.language === "CSS" && "bg-[#563d7a]"}`}
                ></span>
                <span className="ml-[6px] text-[12px] text-[#57606a]">
                  {item.language}
                </span>
              </aside>
            )}
            <div className="text-[12px] text-[#57606a]">
              Updated on{" "}
              {(() => {
                let hours = item.updated_at.slice(0, -1);
                let obj = hourAdder(8, new Date(hours));
                let timeStamp = obj.toString().substring(4, 24);
                let differences = Date.now() - Date.parse(timeStamp);
                return timeAgo(new Date(Date.now() - differences));
              })()}
            </div>
          </div>
          <div className="mt-[10px] h-[1px] w-[100%] bg-[#dbe0e5]"></div>
        </section>
      ))}
    </>
  );
}

export default EachRepo;
