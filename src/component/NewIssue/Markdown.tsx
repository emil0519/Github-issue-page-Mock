import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import ReactDom from "react-dom";
import remarkGfm from "remark-gfm";

function MarkDown() {
  const [issueContainer, setIssueContainer]: any = useState("Leave a comment");
  function Marker() {
    return (
      <ReactMarkdown
        children={issueContainer}
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

  return (
    <>
      <textarea
        // cols="30"
        // rows="10"
        value={issueContainer}
        className="md:leading-snug md:h-[200px] md:border-b-[0px] lg:focus:bg-white lg:border-b-[1px] lg:border-dashed lg:h-[200px] lg:leading-snug lg:rounded-b-[0px] xl:focus:bg-white xl:border-dashed xl:h-[200px] xl:leading-snug xl:rounded-b-[0px] relative w-full rounded-md border-[1px] border-t-[0px] border-r-[0px] border-l-[0px] border-solid border-gray-400 bg-slate-100 px-2 py-2"
        onChange={(e) => {
          setIssueContainer(e.target.value);
        }}
      />
      {Marker()}
    </>
  );
}

export default MarkDown;
