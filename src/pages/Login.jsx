import React,{useState} from 'react'
import axios from "axios";
import {useHistory} from "react-router-dom"
const Login = () => {

    // https://api.mythricreditnidhi.in/accounts/login
const [username,setusername] = useState("");
const [password,setpassword] = useState("");
const [loading,setloading] = useState(false)
const history=useHistory()
const onlogin=()=>{
    console.log(username,password)
    setloading(true)
    axios({
        method: "post",
        url: `https://api-nodejs-todolist.herokuapp.com/user/login`,
        data: {
            email: username,
            password: password
          }
      })
        .then((response) => {
          console.log(response.data.token);
          localStorage.setItem("token", response.data.token);
          setloading(false)
          history.push("/home")
        })
        .catch((error) => {
          console.log(error);
          alert("Something gone wrong");
          setloading(false)
        });
}

  return (
    <div>
      <label>Email: </label>
      <input type="email" placeholder='Enter Email' onChange={(e)=>{setusername(e.target.value)}}/><br/>
      <label>Password: </label>
      <input type="password" placeholder='Enter Password' onChange={(e)=>{setpassword(e.target.value)}}/><br/>
      <button className='button' type="submit" onClick={onlogin}>{loading ? "Submitting.." : "Submit"}</button>
    </div>
  )
}

export default Login
