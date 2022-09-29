import { IssueOpenedIcon } from "@primer/octicons-react";
// import doggy from "../img/doggy.png";
// import avatar from "../img/avatar.png";
import comment from "../img/comment.svg";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

// import api from "../utils/api";
// import { iteratorSymbol } from "immer/dist/internal";

import { hourAdder, timeAgo } from "../utils/horus";
// import { useGetPokemonByNameQuery } from "../state/issueRTK";
import { useGetAllIssuesQuery } from "../state/issueRTK";
function IssueColumn() {
  // const [hoverUser, setHoverUser] = useState(false);
  // const [issues, setIssues]: any = useState();
  // const [queryValue, setQueryValue] = useState("");
  const [queryString, setQueryString] = useState("");
  const { data, isError, isSuccess, isLoading } = useGetAllIssuesQuery({
    type: "issues",
    name: "emil0519",
    repo: "testing-issues",
    query: `${queryString}`,
  });
  const [searchParams] = useSearchParams();
  const category = searchParams.get("query");
  useEffect(() => {
    if (category !== null) {
      setQueryString(category);
    } else {
      setQueryString("");
    }
  }, [category]);

  // const { data, error, isLoading } = useGetPokemonByNameQuery("pikachu");
  // useEffect(() => console.log(data), [data]);
  // useEffect(() => {
  //   api.getIssues("emil0519", "testing-issues").then((data) => setIssues(data));
  // }, []);

  // function getIssueList() {
  //   let margin: string = "margin-[5px 0]";

  //   if (issues.labels.length === 0) {
  //     return;
  //   } else {
  //     // 如果有一個label以上，
  //     if (issues.labels.length === 1) {
  //       margin = "3px 0";
  //     } else {
  //       margin = "3px 3px 0";
  //     }
  //     return issues.labels.map((item: any, index: number) => {
  //       let styling = {
  //         background: `#${item.color}`,
  //         margin: margin,
  //       };
  //       return (
  //         <div
  //           style={styling}
  //           className={`flex h-[19px] w-[max-content] cursor-pointer items-center justify-center rounded-[15px] pl-[6px] pr-[6px] text-[6px] font-semibold text-[white]`}
  //         >
  //           {item.name}
  //         </div>
  //       );
  //     });
  //   }
  // }

  if (isSuccess === false) {
    return <></>;
  }
  return (
    <>
      {data.map((item: any, index: number) => {
        return (
          <section className="flex w-[100%]">
            {/* <button onClick={() => setQueryValue("?creator=emil0519")}>
              Change
            </button> */}
            {/* <h3>{data.species.name}</h3>
            <img src={data.sprites.front_shiny} alt={data.species.name} /> */}

            <section className="flex h-[fit-content] w-[100%] cursor-pointer items-center justify-start border-t-[0.5px] border-b-[0.5px] border-solid border-[#cad1d9] bg-[white] pl-[16px] pr-[16px] hover:bg-[#f5f7f9] small:justify-evenly  small:border-[0.5px] big:justify-between">
              <section className="flex h-[fit-content] w-[100%] cursor-pointer items-center justify-start">
                <IssueOpenedIcon
                  fill="#1a7335"
                  className="mb-[14px] h-[16px] w-[16px]"
                />
                <div className="ml-[14px] flex flex-col">
                  <span className="text-md mt-[10px] font-semibold">
                    {item.title}
                  </span>
                  <div className="flex flex-nowrap">
                    <>
                      {(() => {
                        let margin: string = "margin-[5px 0]";

                        if (item.labels.length === 0) {
                          return;
                        } else {
                          // 如果有一個label以上，margin會不一樣
                          if (item.labels.length === 1) {
                            margin = "3px 0";
                          } else {
                            margin = "3px 3px 0";
                          }
                          return item.labels.map((item: any, index: number) => {
                            return (
                              <div
                                //目前尚未有辦法將template literal 動態地渲染到tailwind
                                style={{
                                  background: `#${item.color}`,
                                  margin: margin,
                                }}
                                className={`flex h-[19px] w-[max-content] cursor-pointer items-center justify-center rounded-[15px] pl-[6px] pr-[6px] text-[6px] font-semibold text-[white]`}
                              >
                                {item.name}
                              </div>
                            );
                          });
                        }
                      })()}
                    </>
                  </div>
                  <span className="mb-[10px] text-sm text-[#4d555e]">
                    #{item.number} opened {""}
                    {/* {item.created_at.slice(0, -1)} */}
                    {(() => {
                      let hours = item.created_at.slice(0, -1);
                      let obj = hourAdder(8, new Date(hours));
                      let timeStamp = obj.toString().substring(4, 24);
                      let differences = Date.now() - Date.parse(timeStamp);
                      return timeAgo(new Date(Date.now() - differences));
                    })()}
                    by {item.user.login}
                  </span>
                </div>
              </section>
              <section className="mb-[30px]  hidden min-h-[30px] items-center small:flex">
                <div className="mr-[65px] flex">
                  <>
                    {(() => {
                      //Assignee的資訊
                      if (item.assignees.length === 0) {
                        return;
                      } else if (item.assignees.length === 1) {
                        return item.assignees.map(
                          (item: any, index: number) => {
                            return (
                              <>
                                <img
                                  src={item.avatar_url}
                                  alt=""
                                  className="z-[2] h-[20px] w-[25px]  rounded-[9999px]"
                                ></img>
                              </>
                            );
                          }
                        );
                      } else if (item.assignees.length === 2) {
                        //當有兩個或以上的assignee時，hover會有動畫
                        //但因為要設定不同的參數，只能以index選擇
                        return item.assignees.map(
                          (item: any, index: number) => {
                            if (index === 1) {
                              return (
                                <img
                                  src={item.avatar_url}
                                  alt=""
                                  className="z-[2]  float-left mr-[-4px] h-[20px] w-[20px] -translate-x-[3px] rounded-[9999px]  duration-300 ease-in-out hover:ml-[11px]"
                                ></img>
                              );
                            } else if (index === 0) {
                              return (
                                <img
                                  src={item.avatar_url}
                                  alt=""
                                  className="z-[2]  float-left mr-[-8px] h-[20px] w-[20px] -translate-x-[6px] rounded-[9999px]  duration-300 ease-in-out "
                                ></img>
                              );
                            }
                          }
                        );
                      }
                    })()}
                  </>
                </div>
                <div className="items-inherit mr-[20px] flex">
                  <img
                    src={comment}
                    alt=""
                    className="w-[10px]rounded-[full] mr-[3px] h-[10px]"
                  ></img>
                  <span className="text-[10px]">{item.comments}</span>
                </div>
              </section>
            </section>
          </section>
        );
      })}
    </>
  );
}
export default IssueColumn;
