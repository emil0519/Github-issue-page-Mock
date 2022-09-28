import { IssueOpenedIcon } from "@primer/octicons-react";
import doggy from "../img/doggy.png";
import avatar from "../img/avatar.png";
import comment from "../img/comment.svg";
import { useState, useEffect } from "react";
import api from "../utils/api";
import { iteratorSymbol } from "immer/dist/internal";

function IssueColumn() {
  // const [hoverUser, setHoverUser] = useState(false);
  const [issues, setIssues]: any = useState();
  const labels = [
    { name: "hihi", background: "navy" },
    { name: "a longer one", background: "black" },
    { name: "中文也可", background: "#d5cdb4" },
  ];

  useEffect(() => {
    api.getIssues("emil0519", "testing-issues").then((data) => setIssues(data));
  }, []);

  useEffect(() => {
    console.log(issues);
  }, [issues]);

  function getIssueList() {
    let margin: string = "margin-[5px 0]";

    if (issues.labels.length === 0) {
      return;
    } else {
      // 如果有一個label以上，
      if (issues.labels.length === 1) {
        margin = "3px 0";
      } else {
        margin = "3px 3px 0";
      }
      return issues.labels.map((item: any, index: number) => {
        return (
          <div
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
  }

  if (issues === undefined) {
    return <></>;
  }
  return (
    <>
      {issues.map((item: any, index: number) => {
        return (
          <section className="flex w-[100%]">
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
                          // 如果有一個label以上，
                          if (item.labels.length === 1) {
                            margin = "3px 0";
                          } else {
                            margin = "3px 3px 0";
                          }
                          return item.labels.map((item: any, index: number) => {
                            return (
                              <div
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
                    {/* {labels.map((item, index) => {
                      let margin: string = "margin-[5px 0]";
                      index === 0
                        ? (margin = "m-[3px_0]")
                        : (margin = "m-[3px_3px_0]");
                      return (
                        <div
                          className={`${margin}  flex h-[19px] w-[max-content] cursor-pointer items-center justify-center rounded-[15px] bg-[${item.background}] pl-[6px] pr-[6px] text-[6px] font-semibold text-[white]`}
                        >
                          {item.name}
                        </div>
                      );
                    })} */}
                  </div>
                  <span className="mb-[10px] text-sm text-[#4d555e]">
                    #{item.number} opened 10 days ago by {item.user.login}
                  </span>
                </div>
              </section>
              <section className="mb-[30px]  hidden min-h-[30px] items-center small:flex">
                <div className="mr-[65px] flex">
                  <>
                    {(() => {
                      if (item.assignees.length === 0) {
                        console.log("=0");
                        return;
                      } else {
                        console.log("=1");
                        item.assignees.map(() => {
                          return (
                            <>
                              <img
                                src={avatar}
                                alt=""
                                className="z-[2]  float-left mr-[-12px] h-[20px] w-[20px] -translate-x-[3px] rounded-[9999px]  duration-300 ease-in-out hover:ml-[11px]"
                              ></img>
                            </>
                          );
                        });
                      }
                    })()}
                  </>

                  {/* <img
                    src={doggy}
                    alt=""
                    className={`relative  z-[1] float-left mr-[-12px] h-[20px] w-[20px] -translate-x-[12px] rounded-full duration-300 ease-in-out`}
                  ></img>
                  <img
                    src={avatar}
                    alt=""
                    className="z-[2]  float-left mr-[-12px] h-[20px] w-[20px] -translate-x-[6px] rounded-[9999px]  duration-300 ease-in-out "
                  ></img>
                  <img
                    src={avatar}
                    alt=""
                    className="z-[2]  float-left mr-[-12px] h-[20px] w-[20px] -translate-x-[3px] rounded-[9999px]  duration-300 ease-in-out hover:ml-[11px]"
                  ></img> */}
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
    // <section className="flex w-[100%]">
    //   <section className="flex h-[fit-content] w-[100%] cursor-pointer items-center justify-start border-t-[0.5px] border-b-[0.5px] border-solid border-[#cad1d9] bg-[white] pl-[16px] pr-[16px] hover:bg-[#f5f7f9] small:justify-evenly  small:border-[0.5px] big:justify-between">
    //     <section className="flex h-[fit-content] w-[100%] cursor-pointer items-center justify-start">
    //       <IssueOpenedIcon
    //         fill="#1a7335"
    //         className="mb-[14px] h-[16px] w-[16px]"
    //       />
    //       <div className="ml-[14px] flex flex-col">
    //         <span className="text-md mt-[10px] font-semibold">
    //           Quite a few bugs are here
    //         </span>
    //         <div className="flex flex-nowrap">
    //           {labels.map((item, index) => {
    //             let margin: string = "margin-[5px 0]";
    //             index === 0
    //               ? (margin = "m-[3px_0]")
    //               : (margin = "m-[3px_3px_0]");
    //             return (
    //               <div
    //                 className={`${margin}  flex h-[19px] w-[max-content] cursor-pointer items-center justify-center rounded-[15px] bg-[${item.background}] pl-[6px] pr-[6px] text-[6px] font-semibold text-[white]`}
    //               >
    //                 {item.name}
    //               </div>
    //             );
    //           })}
    //         </div>
    //         <span className="mb-[10px] text-sm text-[#4d555e]">
    //           #2 opened 10 days aga by emil0519
    //         </span>
    //       </div>
    //     </section>
    //     <section className="mb-[30px]  hidden min-h-[30px] items-center small:flex">
    //       <div className="mr-[40px] flex">
    //         <img
    //           src={doggy}
    //           alt=""
    //           className={`relative z-[1]  h-[20px] w-[20px]
    //           rounded-full`}
    //         ></img>
    //         <img
    //           // onMouseEnter={() => setHoverUser(true)}
    //           // onMouseOut={() => setHoverUser(false)}
    //           src={avatar}
    //           alt=""
    //           className="z-[2]  float-right ml-[11px] h-[20px] w-[20px] -translate-x-[40px] rounded-[9999px]  duration-300 ease-in-out hover:ml-[-11px]"
    //         ></img>
    //       </div>
    //       <div className="items-inherit mr-[20px] flex">
    //         <img
    //           src={comment}
    //           alt=""
    //           className="w-[10px]rounded-[full] mr-[3px] h-[10px]"
    //         ></img>
    //         <span className="text-[10px]">2</span>
    //       </div>
    //     </section>
    //   </section>
    // </section>
  );
}
export default IssueColumn;
