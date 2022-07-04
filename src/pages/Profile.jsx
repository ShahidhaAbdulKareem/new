import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [data, setdata] = useState([]);
  const [image, setimage] = useState({});

  const [loading, setloading] = useState(false);

  const getProfile = () => {
    setloading(true);
    const token = localStorage.getItem("token");
    axios({
      method: "get",
      url: `https://api-nodejs-todolist.herokuapp.com/user/me          `,
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => {
        console.log(response.data);
        // const slicedArray = response.data.slice(0, 10);
        setdata(response.data);
        setloading(false);
        getProfileImage(response.data._id)
      })
      .catch((error) => {
        console.log(error);
        alert("Something gone wrong");
        setloading(false);
      });
  };

  const getProfileImage = (id) => {
    setloading(true);
    const token = localStorage.getItem("token");
    axios({
      method: "get",
      url: `https://api-nodejs-todolist.herokuapp.com/user/${id}/avatar`,
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => {
        console.log(response.data);
        // const slicedArray = response.data.slice(0, 10);
        setimage(response.data);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
        // alert("Something gone wrong");
        setloading(false);
      });
  };

  const uploadImage = (img) => {
    setloading(true);
    const token = localStorage.getItem("token");

    const formdata=new FormData()
    formdata.append("avatar",img)

    axios({
      method: "post",
      url: `https://api-nodejs-todolist.herokuapp.com/user/me/avatar`,
      headers: { Authorization: "Bearer " + token },
      data:formdata
    })
      .then((response) => {
        console.log(response.data);
        // const slicedArray = response.data.slice(0, 10);
        // setimage(response.data);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
        // alert("Something gone wrong");
        setloading(false);
      });
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      {loading ? (
        "Loading profile...."
      ) : (
        <div>
            <img src={image} alt="" />
            <input type="file" onChange={(e)=>{uploadImage(e.target.files[0])}}/>
          <h2>{data.name}</h2>
        </div>
      )}
    </div>
  );
};

export default Profile;
