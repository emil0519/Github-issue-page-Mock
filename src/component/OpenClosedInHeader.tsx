import check from "../img/check.svg";
import open from "../img/issue-opened.svg";

function OpenClosedInHeader() {
  return (
    <section className="m-0 hidden big:flex">
      <div className="mr-[4px] flex cursor-pointer big:h-[21px] big:w-[71px]">
        <img src={open} alt="" className="mr-[4px] h-[16px] w-[16px]"></img>
        <span className="text-xs font-semibold">2 Open</span>
      </div>
      <div className="ml-[10px] flex cursor-pointer">
        <img src={check} alt="" className="h-[16px] w-[16px]"></img>
        <span className="ml-[4px] text-xs">1 Closed</span>
      </div>
    </section>
  );
}
export default OpenClosedInHeader;
