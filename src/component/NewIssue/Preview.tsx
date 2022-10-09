import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

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
  function MarkdownPreviewer() {
    return (
      <ReactMarkdown
        children={inputValue}
        components={{
          em: ({ node, ...props }) => (
            <i style={{ fontStyle: "italic" }} {...props} />
          ),
          strong: ({ node, ...props }) => (
            <b style={{ fontWeight: "bolder" }} {...props} />
          ),
          h1: ({ node, ...props }) => (
            <h1 style={{ fontSize: "1.75em" }} {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 style={{ fontSize: "1.5em" }} {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 style={{ fontSize: "1.25em" }} {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul style={{ listStyle: "disc", paddingLeft: "16px" }} {...props} />
          ),
          li: ({ node, ...props }) => <li {...props} />,
          ol: ({ node, ...props }) => (
            <ol style={{ listStyle: "auto", paddingLeft: "16px" }} {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              style={{
                padding: "0px 14px",
                borderLeft: "0.25em solid #d0d7de",
              }}
              {...props}
            />
          ),
          code: ({ node, ...props }) => (
            <code
              style={{
                padding: "0.2em 0.4em",
                margin: 0,
                fontSize: "85%",
                borderRadius: "6px",
                background: "rgba(175,184,193,0.2)",
              }}
              {...props}
            />
          ),
          input: ({ node, ...props }) => (
            <input
              type="checkbox"
              style={{
                margin: "0 0.2em 0.25em -1.6em",
                verticalAlign: "middle",
              }}
              {...props}
            />
          ),
        }}
      />
    );
  }

  const [storeInput, setStoreInput] = useState<string>("");
  useEffect(() => console.log(storeInput), [storeInput]);

  useEffect(() => {
    if (clickName === "preview") {
      const startingValue = inputValue.indexOf("<");
      const differences = inputValue.indexOf(`>`) - startingValue + 1;
      const searcher = inputValue.substring(startingValue, differences);
      const newInput = inputValue.replace(searcher, "");
      console.log(newInput);
      setStoreInput(inputValue);

      setInputValue(newInput);
    } else {
      console.log(storeInput);
      setInputValue(storeInput);
    }
  }, [clickName]);
  return (
    <section
      className={`${
        clickName === "preview" ? "flex" : "hidden"
      } min-h-[239px] w-[95%] flex-col bg-[white]`}
    >
      {inputValue.length === 0 ? (
        "Nothing to preview"
      ) : (
        <>
          {images.map((image: any, index: number) => (
            <div key={index} className="flex w-[100%] flex-col">
              <img
                src={image.dataURL}
                alt=""
                className="h-auto w-auto max-w-[100%]"
              />
              <div className="">
                {inputValue}
                {MarkdownPreviewer()}
              </div>
            </div>
          ))}
        </>
      )}
    </section>
  );
}

export default Preview;
