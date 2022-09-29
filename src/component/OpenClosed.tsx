import check from "../img/check.svg";
import open from "../img/issue-opened.svg";

function OpenClosed() {
  return (
    <section className="mt-[20px] mb-[15px] flex big:hidden">
      <div className="mr-[4px] flex cursor-pointer">
        <img src={open} alt="" className="mr-[4px] h-[16px] w-[16px]"></img>
        <span className="text-xs  font-semibold big:h-[21px] big:w-[72.45px]">
          2 Open
        </span>
      </div>
      <div className="ml-[10px] flex cursor-pointer">
        <img src={check} alt="" className="h-[16px] w-[16px]"></img>
        <span className="ml-[4px] text-xs big:h-[21px] big:w-[72.45px]">
          1 Closed
        </span>
      </div>
    </section>
  );
}
export default OpenClosed;