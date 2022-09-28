import eye from "../img/eye.svg";
import solidDown from "../img/solid-down.svg";
import fork from "../img/fork.svg";
import star from "../img/star.svg";
function Watch() {
  return (
    <section className="hidden med:flex">
      <div className="flex w-[123.91px] h-[28px] border-[0.5px] border-solid border-[#d4d6d9] mr-[16px] rounded-lg justify-center items-center cursor-pointer hover:bg-[#f1f2f4]">
        <img src={eye} className="w-[16px] h-[16px] mr-[3px]" alt=""></img>
        <span className="text-xs mt-[3px] mr-[3px]">Watch</span>
        <span className="w-[21.42px] h-[20px] bg-[#e4e6e8] rounded-full flex items-center justify-center mr-[3px] mt-[3px]">
          <span className="text-xs">2</span>
        </span>
        <img src={solidDown} className="w-[12px] h-[8px]" alt=""></img>
      </div>
      <div className="flex w-[123.91px] h-[28px] border-[0.5px] border-solid border-[#d4d6d9] mr-[16px] rounded-lg justify-center items-center cursor-pointer hover:bg-[#f1f2f4]">
        <img src={fork} className="w-[16px] h-[16px] mr-[3px]" alt=""></img>
        <span className="text-xs mt-[3px] mr-[3px]">Fork</span>
        <span className="w-[21.42px] h-[20px] bg-[#e4e6e8] rounded-full flex items-center justify-center mr-[3px] mt-[3px]">
          <span className="text-xs">2</span>
        </span>
        <img src={solidDown} className="w-[12px] h-[8px]" alt=""></img>
      </div>{" "}
      <div className="flex w-[123.91px] h-[28px] border-[0.5px] border-solid border-[#d4d6d9] mr-[32px] rounded-lg justify-center items-center cursor-pointer hover:bg-[#f1f2f4]">
        <img src={star} className="w-[16px] h-[16px] mr-[3px]" alt=""></img>
        <span className="text-xs mt-[3px] mr-[3px]">Star</span>
        <span className="w-[21.42px] h-[20px] bg-[#e4e6e8] rounded-full flex items-center justify-center mr-[3px] mt-[3px]">
          <span className="text-xs">2</span>
        </span>
        <img src={solidDown} className="w-[12px] h-[8px]" alt=""></img>
      </div>
    </section>
  );
}

export default Watch;
