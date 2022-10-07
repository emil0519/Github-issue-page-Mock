import { GearIcon } from "@primer/octicons-react";
import { useEffect, useState } from "react";
import x from "../../img/x.svg";
import check from "../../img/check.svg";

type controllerProps = {
  controller: {
    title: string;
    default: {
      descriptionWithoutLink: string;
      descriptionWithLink?: string;
      desLink?: string;
      isLinkDecoration?: boolean;
      inputPlaceholder: string;
      mainHeader: string;
      subHeader?: string;
      clearText?: string;
      isOpen: boolean;
      isCancel: boolean;
    };
    data?: any;
    defaultData?: any;
    selected?: string[];
    showSelectedData: { title: string; icon: string };
  }[];
  clickIndex: number;
  inputValue: string;
  clickRate: number;

  setClickIndex: React.Dispatch<React.SetStateAction<number>>;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  setClickRate: React.Dispatch<React.SetStateAction<number>>;
};

function NewAssignee({
  controller,
  inputValue,
  setInputValue,
  clickIndex,
  setClickIndex,
  setSelectedValue,
  clickRate,
  setClickRate,
}: controllerProps) {
  const [mouseOver, setMouseOver] = useState("");
  const [showDropDown, setShowDropDown] = useState("");
  const [mainHeader, setMainHeader] = useState<string[]>([]);
  const [fetchedData, setFetchedData] = useState<any>();

  useEffect(() => {
    const newData = controller.map((item) => item.data);
    if (newData !== undefined) {
      setFetchedData(newData);
    }
  }, [controller]);

  if (
    controller[0].data === undefined ||
    controller[0].default.descriptionWithoutLink === undefined
  ) {
    return <></>;
  }
  return (
    <>
      {controller.map((item: any, index: number) => {
        return (
          <section className="mt-[10px] flex w-[100%] cursor-pointer flex-col items-start justify-center  med:relative med:h-[max-content] med:w-[240px] med:flex-col med:flex-wrap">
            <section
              onClick={() => {
                setShowDropDown(item.title);
                setClickIndex(index);
                setMainHeader([
                  item.default.mainHeader,
                  item.default.inputPlaceholder,
                  item.default.subHeader,
                  item.default.clearText,
                ]);
              }}
              onMouseOver={() => setMouseOver(item.title)}
              onMouseOut={() => setMouseOver("")}
              className="ml-auto mr-auto mb-[5px] flex w-[95%] items-center justify-between "
            >
              <span
                className={`text-[12px] font-semibold ${
                  mouseOver === item.title
                    ? "text-[#1e65d0] "
                    : "text-[#6c737a]"
                }`}
              >
                {item.title}
              </span>
              <GearIcon
                fill={`${mouseOver === item.title ? "#1e65d0" : "#4d555e"}`}
                className="h-[16px] w-[16px]"
              />
            </section>
            {(() => {
              if (!item.default.isOpen) {
                return (
                  <>
                    <span className="mt-[8px] mr-auto ml-auto w-[95%] text-[12px] text-[#6c737a]">
                      {item.default.descriptionWithoutLink}
                    </span>
                    {item.default.descriptionWithLink && (
                      <>
                        <span className="hover:text-[#3e7bd7]">
                          <a href={item.default.desLink}>assign yourself</a>
                        </span>
                      </>
                    )}{" "}
                  </>
                );
              } else if (item.selected.length !== 0) {
                const showSelected = item.selected.map(
                  (selected: any, _index: number) =>
                    item.data.filter((item: any) => item.title === selected)
                );
                let renderData = [];
                for (let x = 0; x < showSelected.length; x++) {
                  renderData.push(showSelected[x][0]);
                }
                return renderData.map((item) => {
                  return (
                    <>
                      <div className="ml-auto mr-auto mt-[5px] flex w-[95%] items-center">
                        {item.icon.includes("http") ? (
                          <img
                            src={item.icon}
                            className="ml-[4px] mr-[5px] mt-[5px] h-[20px] w-[20px] rounded-full"
                            alt=""
                          ></img>
                        ) : (
                          <div
                            style={{ background: `#${item.icon}` }}
                            className={`mr-[6px] h-[14px] w-[14px] rounded-full `}
                          ></div>
                        )}
                        <span className="text-xs font-semibold">
                          {item.title}
                        </span>
                      </div>
                    </>
                  );
                });
              }
            })()}

            <div className="mt-[8px] mr-auto ml-auto w-[95%] text-[12px] text-[#6c737a]">
              {item.default.isOpen && (
                <>
                  {item.selected.length === 0 &&
                    item.default.descriptionWithoutLink}
                  {item.selected.length === 0 &&
                    item.default.descriptionWithLink && (
                      <>
                        <span className="hover:text-[#3e7bd7]">
                          <a href={item.default.desLink}>assign yourself</a>
                        </span>
                      </>
                    )}{" "}
                </>
              )}
            </div>
            {(() => {
              if (item.default.isOpen === true) {
                return (
                  <>
                    <div className="mt-[16px] h-[0.4px] w-[92%] bg-[#cdd4db]"></div>
                    <div
                      // 透明外面，點擊會關掉彈窗
                      onClick={() => {
                        setShowDropDown("");
                        setInputValue("");
                      }}
                      className={`${
                        showDropDown === item.title ? "fixed" : "hidden"
                      } top-0 right-0 bottom-0 left-0 z-[99] flex bg-[black] p-[16px] opacity-25 small:opacity-0`}
                    ></div>
                    {item.default.isOpen && showDropDown === item.title && (
                      <div
                        //彈出的清單
                        className={`${showDropDown ? "fixed" : "hidden"} 
              ${showDropDown ? "med:absolute" : ""}
              top-[21%] right-[16px] z-[99] flex h-[70vh] w-[95vw] flex-col rounded-lg border-[0.5px] border-solid border-[#cad1d9] bg-[white] small:h-[max-content] small:w-[298px] med:top-[40%] med:right-[0]`}
                      >
                        <div className="flex h-[54px] w-[100%] items-center justify-between small:h-[33px]">
                          <span className="ml-[16px] text-xs font-semibold small:p-0 ">
                            {mainHeader[0]}
                            {/* {item.default.mainHeader} */}
                          </span>
                          <img
                            src={x}
                            onClick={() => setShowDropDown("")}
                            className="mr-[16px] h-[16px] w-[16px] cursor-pointer"
                            alt=""
                          ></img>
                        </div>
                        <div className="flex h-[65px] w-[100%] items-center justify-center border-t-[0.5px] border-b-[0.5px] border-solid border-[#d3d9e0] bg-[white] small:h-[49px] ">
                          <input
                            placeholder={mainHeader[1]}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="h-[32px] w-[85%] rounded-md border-[1px] border-solid border-[#d3d9e0] p-[5px_12px] small:w-[95%] small:text-xs"
                          ></input>
                        </div>
                        {mainHeader[2] && (
                          <div className="flex items-center bg-[#f5f7f9]">
                            <span className="ml-[8px] pt-[8px] pb-[8px] text-sm font-semibold">
                              Suggestions
                            </span>
                          </div>
                        )}
                        {mainHeader[3] && (
                          <div className="flex h-[54px] w-[100%] cursor-pointer items-center border-t-[0.5px] border-b-[0.5px] border-solid border-[#d3d9e0] bg-[white] hover:bg-[#f3f5f7] small:h-[49px] small:w-[298px]">
                            <img
                              src={x}
                              onClick={() => setShowDropDown("")}
                              className="ml-[40px] mr-[4px] h-[16px] w-[16px] cursor-pointer"
                              alt=""
                            ></img>
                            <span className="ml-[9px] text-xs">
                              Clear assignees
                            </span>
                          </div>
                        )}
                        <div className="flex max-h-[204px] flex-col overflow-y-auto">
                          {controller[clickIndex].data.map((item: any) => (
                            //data start to loop here
                            <div
                              onClick={() => {
                                setInputValue("");
                                setSelectedValue(item.title);
                                setClickRate(clickRate + 1);
                              }}
                              className={`${
                                item.description === undefined
                                  ? "flex-nowrap"
                                  : "flex-wrap"
                              } flex h-[53px] w-[100%] cursor-pointer items-center justify-start border-t-[0.5px] border-b-[0.5px] border-solid border-[#d3d9e0] bg-[white] hover:bg-[#f3f5f7] small:w-[298px]  `}
                            >
                              <div
                                className={`${
                                  item.description !== undefined &&
                                  item.description.length === 0
                                    ? "h-[54px]"
                                    : "h-[16px]"
                                } 
                    ${
                      item.description === undefined
                        ? "w-[fit-content]"
                        : "w-[100%]"
                    }
                    m-0 flex items-center justify-between small:mt-0 small:h-[35px]`}
                              >
                                <div className="flex items-center">
                                  <img
                                    src={check}
                                    alt=""
                                    className={`${
                                      controller[clickIndex].selected!.includes(
                                        item.title
                                      )
                                        ? "visible"
                                        : "invisible"
                                    } mr-[8px] ml-[40px]  h-[16px] w-[16px]`}
                                  ></img>
                                  {item.icon.includes("http") ? (
                                    <img
                                      src={item.icon}
                                      className="ml-[4px] mr-[5px] h-[20px] w-[20px] rounded-full"
                                      alt=""
                                    ></img>
                                  ) : (
                                    <div
                                      style={{ background: `#${item.icon}` }}
                                      className={`mr-[6px] h-[14px] w-[14px] rounded-full `}
                                    ></div>
                                  )}

                                  <span className=" mr-[6px] text-[14px] font-semibold">
                                    {item.title}
                                  </span>
                                </div>
                                {!item.icon.includes("http") && (
                                  <img
                                    src={x}
                                    className="mr-[13px] h-[16px] w-[16px] cursor-pointer"
                                    alt=""
                                  ></img>
                                )}
                              </div>

                              {item.description === undefined ? (
                                <span className=" mr-[6px] text-[12px] text-[#737a81]">
                                  {item.title}
                                </span>
                              ) : item.description.length === 0 ? (
                                <></>
                              ) : (
                                <>
                                  <span className="mt-[6px] mb-[30px] ml-[83px] mr-[6px] text-[12px] text-[#737a81]">
                                    {item.description}
                                  </span>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                );
              }
            })()}
          </section>
        );
      })}
    </>
  );
}

export default NewAssignee;
