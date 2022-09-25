// import { useEffect } from "@storybook/addons";
import { response } from "express";
import React, { useState } from "react";
import api from "./utils/api";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Repo from "./component/Repo";
import Option from "./component/Option";
import LabelButtons from "./component/LabelButtons";
import BoxHeader from "./component/BoxHeader";
import { useDispatch } from "react-redux";

function App() {
  const [label, setLabel] = useState(null);
  // console.log(initState.then((data: { json: () => any }) => data.json()));
  // reducer(_,action)
  // async function startResults() {
  //   const reuslt = await console.log(initState);
  // }
  // startResults();
  const dispatch = useDispatch();
  function test() {
    dispatch({
      type: "getList",
    });
  }

  async function startResult() {
    const result = await api.getLabels("emil0519", "testing-issues");
    setLabel(result);
    console.log(result);
  }

  const startCreate = async () => {
    const result = await api.createLabels(
      "emil0519",
      "testing-issues",
      "new",
      "newdes",
      "e99695"
    );
    console.log(result);
  };

  const startUpdate = async () => {
    const result = await api.updateLabels(
      "emil0519",
      "testing-issues",
      "abcd",
      "New names",
      "Hello world",
      "f29513"
    );
    console.log(result);
  };

  const startDelete = async () => {
    const result = await api.deleteLabel("emil0519", "testing-issues", "abcd");
    console.log(result);
  };

  /* <div>Hello world</div> */

  /* <button onClick={()=>startResult()}>Show Label List</button> */

  /* <button onClick={()=>startDelete()}>Show Label List</button> */

  return (
    <>
      <Header />
      <Repo />
      <Option />
      <LabelButtons />
      <BoxHeader />
      <Footer />
      {/* <button onClick={() => test()}></button>
      <button onClick={() => startCreate()}>Create Label</button>
      <button onClick={() => startDelete()}>Delete</button> */}
    </>
  );
}

export default App;
