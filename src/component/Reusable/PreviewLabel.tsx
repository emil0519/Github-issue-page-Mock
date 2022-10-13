import { useEffect, useState } from "react";

type LabelProps = {
  labels: any;
};

function PreviewLabel({ labels }: LabelProps) {
  const [mouseOver, setMouseOver] = useState<string>("");
  useEffect(() => console.log(labels), [labels]);
  return (
    <>
      {labels.map((item: any) => (
        <section
          onMouseOver={() => setMouseOver(item.name)}
          onMouseOut={() => setMouseOver("")}
          style={{ background: `#${item.color}` }}
          className="relative mr-[5px] flex h-[18px] w-[max-content] cursor-pointer items-center rounded-[15px] p-[4px_7px]"
        >
          <span className="whitespace-nowrap text-xs text-black">
            {item.name}
          </span>
          <>
            {item.description === undefined ? (
              ""
            ) : item.description.length === 0 ? (
              ""
            ) : (
              <div
                className={`
  ${mouseOver === item.name ? "block" : "hidden"}  
  absolute top-[147%] flex w-[max-content] cursor-text items-center justify-center rounded-md bg-black p-[5px_9px]`}
              >
                <span className="upward-triangle absolute top-[-31%] left-[3px] h-[9px] w-[9px] bg-black"></span>
                <span className="text-xs text-[white]">
                  {" "}
                  {item.description}
                </span>
              </div>
            )}
          </>
        </section>
      ))}
    </>
  );
}

export default PreviewLabel;
