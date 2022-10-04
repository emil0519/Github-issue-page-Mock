import { useEffect, useState } from "react";

function EditSection() {
  const [clickName, setClickName] = useState("write");
  useEffect(() => console.log(clickName), [clickName]);
  return (
    <section className="mt-[36px] flex h-[max-content] w-[100%] flex-col items-center ">
      <input
        placeholder="Title"
        className="w-[95%] rounded-md border-[1px] border-solid border-[#cad1d9]  p-[7px]"
      ></input>
      <section className="mt-[12px] flex w-[95%]">
        <div
          onClick={() => setClickName("write")}
          className={`${
            clickName === "write" ? "bg-[white]" : "bg-[#f5f7f9]"
          } ${clickName === "write" ? "border-b-0 " : "border-b-[1px] "} ${
            clickName === "write" ? "rounded-t-md " : "rounded-t-none "
          } border-1px flex h-[41px] w-[50%] cursor-pointer items-center justify-center border-x-[1px] border-t-[1px] border-solid border-[#cad1d9]`}
        >
          <span className="text-sm">Write</span>
        </div>
        <div
          onClick={() => setClickName("preview")}
          className={`${
            clickName === "preview" ? "bg-[white]" : "bg-[#f5f7f9]"
          } ${clickName === "preview" ? "border-b-0 " : "border-b-[1px] "} ${
            clickName === "preview" ? "rounded-t-md " : "rounded-t-none "
          } border-1px flex h-[41px] w-[50%] cursor-pointer items-center justify-center border-r-[1px] border-t-[1px]  border-solid border-[#cad1d9] `}
        >
          <span className="text-sm">Preview</span>
        </div>
      </section>
      <section className="flex h-[32px] w-[95%]"></section>
    </section>
  );
}

export default EditSection;
