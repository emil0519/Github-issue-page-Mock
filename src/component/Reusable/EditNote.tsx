import info from "../../img/info.svg";

function EditNote() {
  return (
    <div className="mt-[16px] flex h-[fit-content] w-[95%]">
      <img src={info} alt="" className="mr-[4px] h-[16px] w-[16px]"></img>
      <span className="mb-[16px] text-[12px] text-[#575f67]">
        Remember, contributions to this repository should follow our{" "}
        <a
          href="https://docs.github.com/en/site-policy/github-terms/github-community-guidelines"
          className="text-[#1760cf] hover:underline hover:decoration-[#1760cf]"
        >
          GitHub Community Guidelines.
        </a>
      </span>
    </div>
  );
}

export default EditNote;
