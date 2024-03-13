import { superbase } from "../../utils/clientProduction";
type SmallDropProps = {
  controller: {
    content: string;
  }[];
  showDrop: boolean;
  setShowDrop: React.Dispatch<React.SetStateAction<boolean>>;
};

function SmallDrop({ controller, showDrop, setShowDrop }: SmallDropProps) {
  async function signOut() {
    setShowDrop(false);
    await superbase.auth.signOut();
    localStorage.clear();
    window.location.assign(`/`);
  }

  return (
    <section
      className={`${
        showDrop ? "flex" : "hidden"
      } h-[max-content] w-[100%] flex-col items-center justify-center bg-[#24292f] med:hidden`}
    >
      <input
        className="mb-[20px] h-[30px] w-[95%] rounded-md border-[1px] border-solid border-[#45494e] bg-[#24292f] p-[7px] text-[#45494e]"
        placeholder="Search or jump to"
      ></input>
      <div className="mb-[12px] h-[1px] w-[95%] bg-[#45494e]"></div>
      {controller.map((item) => (
        <>
          {item.content === "|" ? (
            <div className="mb-[12px] h-[1px] w-[95%] bg-[#45494e]"></div>
          ) : item.content === "Sign out" ? (
            <div
              onClick={() => signOut()}
              className="mb-[12px] w-[95%] cursor-pointer text-[16px] font-semibold text-white hover:text-[#bebfc1]"
            >
              {item.content}
            </div>
          ) : (
            <div className="mb-[12px] w-[95%] cursor-pointer text-[16px] font-semibold text-white hover:text-[#bebfc1]">
              {item.content}
            </div>
          )}
        </>
      ))}
    </section>
  );
}

export default SmallDrop;
