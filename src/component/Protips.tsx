import { useEffect, useState } from "react";
import bulb from "../img/light-bulb.svg";

function ProTips() {
  const tipsList = [
    "Ears burning? Get @emil0519 mentions with mentions:emil0519",
    "Exclude everything labeled bug with-label:bug.",
    "no:milestone will show everything without a milestone",
    "Add no:assignee to see everything thats not assigned",
    "Find all open issues with in progress development work with linked:pr.",
    "Exclude everything labeled bug with -label:bug.",
    "Type g p on any issue or pull request to go back to the pull request listing page.",
    "Whats not been updated in a month: updated:<2022-08-27.",
    "Mix and match filters to narrow down what you are looking for.",
    "Notify someone on an issue with a mention, like: @emil0519.",
    "Find everything you created by searching author:emil0519.",
    "Updated in the last three days: updated:>2022-09-24.",
    "Loading",
  ];
  const [randomIndex, setRandomIndex] = useState(12);
  useEffect(() => {
    setRandomIndex(Math.round(Math.random() * 12));
  }, []);
  return (
    <section className="mt-[32px] hidden w-[100%] items-center justify-center med:flex">
      <div className="flex w-[fit-content] items-center">
        <img src={bulb} className="mr-[5px] h-[16px] w-[16px]" alt=""></img>
        <span className="mr-[6px] text-base font-semibold">ProTip!</span>
        <span className=" text-sm text-[#555d66] ">
          {tipsList[randomIndex]}
        </span>
      </div>
    </section>
  );
}
export default ProTips;
