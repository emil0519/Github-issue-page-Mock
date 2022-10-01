import {
  IssueOpenedIcon,
  CircleSlashIcon,
  IssueClosedIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@primer/octicons-react";

import comment from "../img/comment.svg";
import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { UserContext } from "../utils/useContext";

import { hourAdder, timeAgo } from "../utils/horus";

import { useGetAllIssuesQuery } from "../state/issueRTK";
function IssueColumn() {
  const { value, setValue } = useContext(UserContext);
  const [queryString, setQueryString] = useState("");
  const [paging, setPaging] = useState<boolean>(true);

  const { data } = useGetAllIssuesQuery({
    type: "issues",
    name: "emil0519",
    repo: "testing-issues",
    query: `${queryString}`,
  });

  const closedData = useGetAllIssuesQuery<any>({
    type: "issues",
    name: "emil0519",
    repo: "testing-issues",
    query: `?state=closed`,
  });

  const nextPage = useGetAllIssuesQuery<any>({
    type: "issues",
    name: "emil0519",
    repo: "testing-issues",
    query: `?page=2`,
  });

  useEffect(() => {
    if (nextPage.data !== undefined) {
      nextPage.data.length === 0 ? setPaging(false) : setPaging(true);
    }
  }, [nextPage]);

  useEffect(() => {
    console.log(paging);
  }, [paging]);

  useEffect(() => {
    let preQuery = [];
    if (value.filter.length !== 0) {
      preQuery.push(value.filter);
    }
    if (value.label.length !== 0) {
      preQuery.push(value.label.toString());
    }
    if (value.assignees.length !== 0) {
      preQuery.push(value.assignees);
    }
    if (value.sort.length !== 0) {
      preQuery.push(value.sort);
    }
    if (value.closed.length !== 0) {
      preQuery.push(value.closed);
    }
    for (var i = 1; i < preQuery.length; i++) {
      preQuery[i] = "&" + preQuery[i];
    }
    setQueryString(`?${preQuery.join("")}`);
  }, [value]);

  const [searchParams] = useSearchParams();
  const category = searchParams.get("query");
  useEffect(() => {
    if (category !== null) {
      setQueryString(category);
    } else {
      console.log("setting null");
      setQueryString("");
    }
  }, [category]);

  if (data === undefined || closedData === undefined) {
    return <></>;
  }
  return (
    <>
      {data!.map((item: any, index: number) => {
        return (
          <section className="flex w-[100%]">
            <section className="flex h-[fit-content] w-[100%] cursor-pointer items-center justify-start border-t-[0.5px] border-b-[0.5px] border-solid border-[#cad1d9] bg-[white] pl-[16px] pr-[16px] hover:bg-[#f5f7f9] small:justify-evenly  small:border-[0.5px] big:justify-between">
              <section className="flex h-[fit-content] w-[100%] cursor-pointer items-center justify-start">
                {(() => {
                  if (value.closed.length === 0) {
                    return (
                      <IssueOpenedIcon
                        fill="#1a7335"
                        className="mb-[14px] h-[16px] w-[16px]"
                      />
                    );
                  } else if (item.state_reason === "completed") {
                    return (
                      <IssueClosedIcon
                        fill="#8251db"
                        className="mb-[14px] h-[16px] w-[16px]"
                      />
                    );
                  } else {
                    return (
                      <CircleSlashIcon
                        fill="#57606a"
                        className="mb-[14px] h-[16px] w-[16px]"
                      />
                    );
                  }
                })()}

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
                    #{item.number}{" "}
                    {value.closed.length === 0 ? "opened" : "closed"} {""}
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
      <section className="mt-[30px] flex h-[32px] w-[100%] items-center justify-center">
        <div className="mr-[16px] flex cursor-default items-center">
          <ChevronLeftIcon
            fill="#8c959f"
            className="mr-[4px] h-[16px] w-[16px]"
          />
          <span className="text-s text-[#8c959f]">Previous</span>
        </div>
        <div
          // onClick={setValue({
          //   ...value,
          //   paging: `?page=2`,
          // })}
          className="mt-[1px] flex cursor-pointer items-center"
        >
          <span className="text-s text-[#0469d6]">Next</span>
          <ChevronRightIcon
            fill="#0469d6"
            className="mr-[4px] h-[16px] w-[16px]"
          />
        </div>
      </section>
    </>
  );
}
export default IssueColumn;
