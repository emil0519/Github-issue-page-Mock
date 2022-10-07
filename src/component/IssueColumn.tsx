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
  const [showPage, setShowPage] = useState<boolean>(true);
  const [previous, setPrevious] = useState<boolean>(false);
  const [nextPageQuery, setNextPageQuery] = useState<any>("");
  const [baseType, setBaseType] = useState("/repos");
  const [type, setType] = useState("/issues");
  const [name, setName] = useState("/emil0519");
  const [repo, setRepo] = useState("/testing-issues");

  const { data } = useGetAllIssuesQuery({
    baseType: baseType,
    type: type,
    name: name,
    repo: repo,
    query: `${queryString}`,
  });

  useEffect(() => {
    if (value.search.length !== 0) {
      setType("");
      setName("");
      setRepo("");
      setQueryString("");
      if (value.sort.length === 0) {
        setBaseType(value.search);
      } else {
        setBaseType(value.search.concat("&", value.sort));
      }
    }
  }, [value]);

  const closedData = useGetAllIssuesQuery({
    baseType: "repos",
    type: "/issues",
    name: "/emil0519",
    repo: "/testing-issues",
    query: `?state=closed`,
  });

  const nextPage = useGetAllIssuesQuery({
    baseType: "repos",
    type: "/issues",
    name: "/emil0519",
    repo: "/testing-issues",
    query: nextPageQuery,
  });

  useEffect(() => {
    if (data !== undefined) {
      setValue({
        ...value,
        dataLength: data.length,
      });
    }
  }, [queryString]);

  useEffect(() => console.log(value), [value]);

  useEffect(() => {
    if (value.paging.length !== 0 && data !== undefined && data.length === 0) {
      //當回傳的結果是0的時候，移除page2，目的是用戶有可能在page2，然後點選沒有page2的內容
      //屆時會因為query string已經有page2而無法render出正確的資料
      console.log(nextPage.data);

      // setValue({
      //   ...value,
      //   paging: `page=1`,
      // });
    }
  }, [data]);

  useEffect(() => {
    //在render之前，提前知道page2的內容，以決定是否顯示paging按鈕
    if (queryString.length === 0) {
      setNextPageQuery("?page=2");
    } else if (queryString.length !== 0 && !queryString.includes("page")) {
      setNextPageQuery(`${queryString}&page=2`);
    } else if (queryString.includes("page")) {
      let pageNow = value.paging.charAt(value.paging.length - 1);
      pageNow = parseInt(pageNow);
      setNextPageQuery(`?page=${pageNow + 1}`);
    }
  }, [queryString]);

  useEffect(() => {
    //1.當已經設定為第二頁的時候，顯示page按鈕
    //2.如果沒有下一頁，隱藏按鈕
    if (nextPage.data === undefined) {
      return;
    } else {
      if (value.paging.length !== 0) {
        setShowPage(true);
      } else if (nextPage.data.length === 0) {
        setShowPage(false);
      } else {
        setShowPage(true);
      }
    }
  }, [nextPage]);

  useEffect(() => {
    //1.若不在第一頁，換按鈕顏色及限制按鈕功能
    if (nextPage.data === undefined) {
      return;
    } else {
      if (value.paging.length !== 0 && nextPage.data.length === 0) {
        setPrevious(true);
      } else {
        setPrevious(false);
      }
    }
  }, [nextPage]);

  // useEffect(() => {
  //   console.log(value.filter === "creator=emil0519" || value.filter === "");
  //   if (
  //     (value.filter === "creator=emil0519" || value.filter === "") &&
  //     value.label.length === 0 &&
  //     value.assignees.length === 0 &&
  //     value.sort.length === 0 &&
  //     value.closed.length === 0 &&
  //     value.paging === "page=2"
  //   ) {
  //     console.log("set false");
  //   } else {
  //     console.log("set true");
  //   }
  //   // if (nextPage.data === undefined) {
  //   //   return;
  //   // } else if (data !== undefined) {
  //   //   console.log(nextPage.data.length);
  //   // }
  // }, [nextPageQuery, queryString]);

  // else if (nextPage.data.length !== 0) {
  //   console.log(nextPage.data);
  //   console.log("set true");
  // } else {
  //   console.log(nextPage.data);
  //   console.log("set false");
  // }

  // useEffect(() => {
  //   if (nextPage.data !== undefined) {
  //     console.log(nextPageQuery);
  //   }
  //   if (nextPage.data !== undefined && nextPage.data.length === 0) {
  //     console.log("set false");

  //     setPaging(false);
  //   } else {
  //     console.log("set true");
  //     setPaging(true);
  //   }
  // }, [nextPageQuery]);

  useEffect(() => {
    // 將useContext的資料轉為query string
    let preQuery = [];
    if (value.search.length === 0) {
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
      if (value.paging.length !== 0) {
        preQuery.push(value.paging);
      }
      for (var i = 1; i < preQuery.length; i++) {
        preQuery[i] = "&" + preQuery[i];
      }
      setQueryString(`?${preQuery.join("")}`);
    } else {
      return;
    }
  }, [value]);

  const [searchParams] = useSearchParams();
  const category = searchParams.get("query");
  useEffect(() => {
    if (category !== null) {
      setQueryString(category);
    } else {
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
                                className={`flex h-[19px] w-[max-content] cursor-pointer items-center justify-center rounded-lg pl-[6px] pr-[6px] text-[6px] font-semibold text-[white]`}
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
                    })()}{" "}
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
                                  className="z-[2] h-[20px] w-[29px]  rounded-[9999px]"
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
                                  className="z-[2]  h-[20px] w-[20px] rounded-[9999px] big:float-left big:mr-[-4px] big:-translate-x-[3px]  big:duration-300 big:ease-in-out big:hover:ml-[11px]"
                                ></img>
                              );
                            } else if (index === 0) {
                              return (
                                <img
                                  src={item.avatar_url}
                                  alt=""
                                  className="z-[2] h-[20px] w-[20px] rounded-[9999px] big:float-left big:mr-[-8px] big:-translate-x-[6px] big:rounded-[9999px]  big:duration-300 big:ease-in-out "
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
      <section
        className={`${
          showPage ? "flex" : "hidden"
        } mt-[30px] h-[32px] w-[100%] items-center justify-center`}
      >
        <div
          onClick={() =>
            setValue({
              ...value,
              paging: `page=1`,
            })
          }
          className={`${
            previous ? "pointer-events-all" : "pointer-events-none"
          } ${
            previous ? "cursor-pointer" : "cursor-default"
          }  mr-[16px] flex h-[32px] w-[96px] items-center justify-center hover:rounded-sm hover:border-[1px] hover:border-solid hover:border-[#d0d7de]`}
        >
          <ChevronLeftIcon
            fill="#8c959f"
            className="mr-[4px] h-[16px] w-[16px]"
          />
          <span
            className={`${
              previous ? "text-[#0469d6]" : "text-[#8c959f]"
            } text-s `}
          >
            Previous
          </span>
        </div>
        <div
          onClick={() =>
            setValue({
              ...value,
              paging: `page=2`,
            })
          }
          className={`${
            previous ? "pointer-events-none" : "pointer-events-all"
          } ${
            previous ? "cursor-default" : "cursor-pointer"
          }  mt-[1px] flex h-[32px] w-[96px] cursor-pointer items-center justify-center hover:rounded-sm hover:border-[1px] hover:border-solid hover:border-[#d0d7de]`}
        >
          <span
            className={`${
              previous ? "text-[#8c959f]" : "text-[#0469d6]"
            } text-s hover:`}
          >
            Next
          </span>
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
