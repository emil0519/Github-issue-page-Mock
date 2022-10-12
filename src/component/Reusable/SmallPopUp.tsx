type SmallPopUpProps = {
  hover: boolean;
  message: string[];
};

function SmallPopUp({ hover, message }: SmallPopUpProps) {
  console.log(message[1]);
  return (
    <>
      {message.map((item, index) => (
        <div
          className={`
         absolute top-[147%] block w-[max-content] cursor-text items-center justify-center rounded-md bg-black p-[5px_9px] `}
        >
          <span className="downward-triangle absolute top-[97%] left-[3px] h-[9px] w-[9px] bg-black"></span>
          <span className="text-xs text-[white]">{item}</span>
        </div>
      ))}
    </>
  );
}

export default SmallPopUp;
