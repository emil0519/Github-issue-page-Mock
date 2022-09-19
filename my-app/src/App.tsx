import { useEffect } from "@storybook/addons";
import { response } from "express";
import React, { useState } from "react";
import api from "./utils/api";

function App() {

  const [user, setUser] = useState(null);

  const startResult= async()=>{
    const result= await api.getLabels("emil0519", "testing-issues")
    setUser(result)
    console.log(result)
  }

  startResult();
  

// console.log(user)
  
  // setUser(response)

  // useEffect(()=>console.log(user),[user])

  // if(user===null){
  //   return<></>
  // }
  if(user===null){
    return <></>
  }


  return (
    <>
      <div>Hello world</div>
    </>
  );
}

export default App;
