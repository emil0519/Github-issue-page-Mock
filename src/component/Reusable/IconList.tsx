import { ChevronLeftIcon, ChevronRightIcon } from "@primer/octicons-react";
import { useNavigate } from "react-router-dom";

type IconListProps = {
  controller: (string | JSX.Element)[][];
};

function IconList({ controller }: IconListProps) {
  const navigate = useNavigate();

  return (
    <section className="flex place-items-center">
      <div className="ml-[20px] flex w-[max-content] cursor-pointer items-center hover:rounded-md hover:bg-[#e7ebef]">
        <span className="mr-[4px] hidden med:block">
          <ChevronLeftIcon size={16} />
        </span>
        <span className="mr-[4px] hidden med:block">
          <ChevronRightIcon size={16} />
        </span>
        <span>Code</span>
      </div>
      {controller.map((item) => (
        <>
          {item[1] === "Issues" ? (
            <div
              onClick={() => navigate("/App")}
              className="ml-[20px] flex w-[max-content] cursor-pointer items-center hover:rounded-md hover:bg-[#e7ebef]"
            >
              <span className="mr-[4px] hidden med:block">{item[0]}</span>
              <span>{item[1]}</span>
            </div>
          ) : (
            <div className="ml-[20px] flex w-[max-content] cursor-pointer items-center hover:rounded-md hover:bg-[#e7ebef]">
              <span className="mr-[4px] hidden med:block">{item[0]}</span>
              <span>{item[1]}</span>
            </div>
          )}
        </>
      ))}
    </section>
  );
}

export default IconList;
