import { useEffect } from "react";

type PreviewProps = {
  clickName: string;
  inputValue: string;
  images: any;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
};

function Preview({
  clickName,
  inputValue,
  images,
  setInputValue,
}: PreviewProps) {
  useEffect(() => {
    const startingValue = inputValue.indexOf("<img");
    const differences = inputValue.indexOf(`">`) - startingValue;
    const searcher = inputValue.substring(startingValue, differences + 5);
    const newInput = inputValue.replace(searcher, "");
    console.log(searcher);
    // console.log(inputValue.indexOf(`">`));
  }, [inputValue]);
  return (
    <section
      className={`${
        clickName === "preview" ? "flex" : "hidden"
      } min-h-[239px] w-[100%] flex-col bg-[white]`}
    >
      {inputValue.length === 0 ? (
        "Nothing to preview"
      ) : (
        <>
          {images.map((image: any, index: number) => (
            <div key={index} className="flex w-[100%] flex-col">
              <img src={image.dataURL} alt="" className="h-auto w-auto" />
              <div className="">{inputValue}</div>
            </div>
          ))}
        </>
      )}
    </section>
  );
}

export default Preview;
