import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const Todoexpanded = () => {
  const [data, setdata] = useState({});
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const token= localStorage.getItem("token");
    axios({
      method: "get",
      url: `https://api-nodejs-todolist.herokuapp.com/task/${id}`,
      headers: { Authorization: "Bearer "+ token},
    })
      .then((response) => {
        console.log(response.data.data);
         setdata(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Something gone wrong");
      });
  },[]);

  return <div>
    <h1>
        {data.description}
    </h1>
  </div>;
};

export default Todoexpanded;
