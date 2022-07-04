import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const TodoList = () => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const [task, settask] = useState("");
  // const [description, setdescription] = useState("");

  const addtask = () => {
    setloading(true);
    const token = localStorage.getItem("token");
    axios({
      method: "post",
      url: `https://api-nodejs-todolist.herokuapp.com/task`,
      headers: { Authorization: "Bearer " + token },
      data: {
        description: task
       
      },
    })
      .then((response) => {
        console.log(response.data.data);
        // const slicedArray = response.data.slice(0, 10);
        //   setdata(response.data.data);
        setloading(false);
        getTodos();
      })
      .catch((error) => {
        console.log(error);
        alert("Something gone wrong");
        setloading(false);
      });
  };
  const ondelete = (id) => {
    console.log(id, "delete");
    setloading(true);
    const token = localStorage.getItem("token");
    axios({
      method: "delete",
      url: `https://api-nodejs-todolist.herokuapp.com/task/${id}`,
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => {
        console.log(response.data.data);
        // const slicedArray = response.data.slice(0, 10);
        //   setdata(response.data.data);
        setloading(false);
        getTodos();
      })
      .catch((error) => {
        console.log(error);
        alert("Something gone wrong");
        setloading(false);
      });
  };

  const onfinish = (id) => {
    console.log(id, "delete");
    setloading(true);
    const token = localStorage.getItem("token");
    axios({
      method: "put",
      url: `https://api-nodejs-todolist.herokuapp.com/task/${id}`,
      headers: { Authorization: "Bearer " + token },
      data: {
        completed: true,
      },
    })
      .then((response) => {
        console.log(response.data.data);
        // const slicedArray = response.data.slice(0, 10);
        //   setdata(response.data.data);
        setloading(false);
        getTodos();
      })
      .catch((error) => {
        console.log(error);
        alert("Something gone wrong");
        setloading(false);
      });
  };

  const getTodos = () => {
    setloading(true);
    const token = localStorage.getItem("token");
    axios({
      method: "get",
      url: `https://api-nodejs-todolist.herokuapp.com/task`,
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => {
        console.log(response.data.data);
        // const slicedArray = response.data.slice(0, 10);
        setdata(response.data.data);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
        alert("Something gone wrong");
        setloading(false);
      });
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <table className="data_table">
      <div>
        <input
          type="text"
          placeholder="Enter Your task"
          onChange={(e) => {
            settask(e.target.value);
          }}
        />
         {/* <input
          type="text"
          placeholder="Enter description"
          onChange={(e) => {
            setdescription(e.target.value);
          }}
        /> */}
        <button onClick={addtask}>Submit</button>
      </div>

      {loading
        ? "loading..."
        : data.length > 0
        ? data.map((d) => (
            <tr key={d._id}>
              <td>{d.createdAt}</td>
              <td>{d.description}</td>
              <td>{d.completed ? "completed" : "not completed"}</td>
              <td>
                <Link to={`todoExpanded/${d._id}`}>
                  <button>view</button>
                </Link>
              </td>
              <td>
                <button onClick={() => ondelete(d._id)}>delete</button>
              </td>
              <td>
                <button onClick={() => onfinish(d._id)}>finish</button>
              </td>
            </tr>
          ))
        : "No task found"}
    </table>
  );
};

export default TodoList;
