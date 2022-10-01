import down from "../img/triangle-down.svg";
import { useGetAllIssuesQuery } from "../state/issueRTK";
import x from "../img/x.svg";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/useContext";

function Assignee() {
  const navigate = useNavigate();
  const { value, setValue } = useContext(UserContext);

  const { data, isError, isSuccess, isLoading } = useGetAllIssuesQuery({
    baseType: "repos",
    type: "issues",
    name: "emil0519",
    repo: "testing-issues",
    query: "",
  });
  const [localData, setLocalData] = useState<any>();
  const [renderData, setRenderData] = useState<any>();
  const [showAssignee, setShowAssignee] = useState(false);

  useEffect(() => {
    if (data !== undefined) {
      handleAssignees();
      setLocalData(data);
    } else {
      return;
    }
  }, [data, localData]);
  function handleAssignees() {
    let filteredAssignee = [];
    let uniq: string | any[];

    if (data !== undefined && localData !== null && localData !== undefined) {
      let assignees = data
        .map((item) => item.assignees)
        .filter((item) => item.length >= 1);
      let allAssignees = [];
      for (let i = 0; i <= assignees.length - 1; i++) {
        allAssignees.push(assignees[i][0].login);
        if (assignees[i].length > 1) {
          for (let x = 0; x <= assignees[i].length - 1; x++) {
            allAssignees.push(assignees[i][x].login);
          }
        } else {
          allAssignees.push(assignees[i][0].login);
        }
      }

      uniq = [...new Set(allAssignees)];

      let allObj = [];
      for (let i = 0; i <= data.length - 1; i++) {
        if (localData[i].assignees.length !== 0) {
          allObj.push(localData[i].assignees);
        } else {
          for (let x = 0; x <= data[i].assignees.length - 1; x++) {
            allObj.push(localData[i][x].assignees);
          }
        }
      }

      for (let x = 0; x <= allObj.length - 1; x++) {
        if (allObj[x].length > 1) {
          for (let y = 0; y <= allObj[x].length - 1; y++) {
            filteredAssignee.push(allObj[x][y]);
          }
        } else {
          filteredAssignee.push(allObj[x][0]);
        }
      }
    } else {
      return;
    }
    //uniq=["x",e]
    let found = [];
    for (let x = 0; x <= uniq.length - 1; x++) {
      found.push(filteredAssignee.find((item) => item.login === uniq[x]));
    }

    setRenderData(found);
  }

  if (renderData === undefined) {
    return <></>;
  }
  return (
    <>
      <span
        onClick={() => setShowAssignee(true)}
        className="ml-[16px] mr-[16px] flex cursor-pointer text-xs text-[#212529] hover:text-[black] small:relative small:items-center"
      >
        Assignee
        <img
          src={down}
          alt=""
          className="ml-[2px] hidden h-[4px] small:block small:w-[8px]"
        ></img>
      </span>
      <div
        // 透明外面，點擊會關掉彈窗
        onClick={() => setShowAssignee(false)}
        className={`${
          showAssignee ? "fixed" : "hidden"
        } top-0 right-0 bottom-0 left-0 z-[99] flex bg-[black] p-[16px] opacity-25 small:opacity-0`}
      ></div>
      <div
        //彈出的清單
        className={`${
          showAssignee ? "fixed" : "hidden"
        }   top-[1.5%] right-[9px] z-[99] flex h-[max-content] w-[95vw] flex-col rounded-lg border-[0.5px] border-solid border-[#cad1d9] bg-[white] small:absolute  small:top-[18px] small:left-[84px] small:h-[max-content] small:w-[298px] med:top-[20px] big:top-[18px] big:left-[77px] `}
      >
        <div className="right-[5vw] flex h-[54px] w-[100%] items-center justify-between small:h-[33px]">
          <span className="ml-[16px] text-xs font-semibold small:p-0 ">
            Filter by who's assigned
          </span>
          <img
            src={x}
            onClick={() => setShowAssignee(false)}
            className="mr-[16px] h-[16px] w-[16px] cursor-pointer"
            alt=""
          ></img>
        </div>
        <div className="flex h-[65px] w-[100%] items-center justify-center border-t-[0.5px] border-b-[0.5px] border-solid border-[#d3d9e0] bg-[white] small:h-[49px] ">
          <input
            placeholder="Filter users"
            // onChange={(e) => labelFilter(e.target.value)}
            className="h-[32px] w-[85%] rounded-md border-[1px] border-solid border-[#d3d9e0] p-[5px_12px] small:w-[95%] small:text-xs"
          ></input>
        </div>
        <div className="h-[202px] overflow-y-auto overflow-x-hidden small:h-[416px]">
          <div className="flex h-[54px] w-[100%] cursor-pointer items-center justify-between border-t-[0.5px] border-b-[0.5px] border-solid border-[#d3d9e0] bg-[white] hover:bg-[#f3f5f7] small:h-[49px] small:w-[298px]">
            <span className=" m-[16px] ml-[52px] text-xs font-semibold">
              Assigned to nobody
            </span>
          </div>

          {renderData.map((item: any) => (
            <div
              onClick={() =>
                setValue({
                  ...value,
                  assignees: `assignee=${item.login}`,
                })
              }
              className="flex h-[54px] w-[100%] cursor-pointer flex-row items-center justify-start border-t-[0.5px] border-b-[0.5px] border-solid border-[#d3d9e0] bg-[white] hover:bg-[#f3f5f7] small:h-[49px]"
            >
              <div className="flex flex-col">
                <img
                  src={item.avatar_url}
                  alt=""
                  className="mr-[8px] h-[20px] w-[20px]"
                ></img>
                <span className=" text-xs font-semibold">{item.login}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Assignee;
