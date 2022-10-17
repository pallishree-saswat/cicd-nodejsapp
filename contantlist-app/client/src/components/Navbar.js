import React, {useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Contacts } from "@mui/icons-material"

const Navbar = () => {
  const navigate = useNavigate();
  let userData = JSON.parse(localStorage.getItem("myUser"))
  let userToken = JSON.parse(localStorage.getItem("myToken"))
  useEffect(() => {
    // console.log("userdata", userData)
  if (userToken && userToken === null) {
      navigate("/")
    }
  },[navigate, userToken])
  const onLogout = () => {
  
    localStorage.removeItem("myUser")
    localStorage.removeItem("myToken")
    navigate("/");
  }
  return (
    <div className='navbar'>
      <h1>

        <Link to={"/index"} style={{ color: "#333" }}>
          <Contacts /><span>Contact Store</span>
        </Link>

      </h1>
      {userToken && userToken  !== null ? <div className='user'>
        <span>Hello {userData.name}</span>
        <a onClick={onLogout} style={{ color: "#333" }}>
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span  className="hide-sm">Logout</span>
        </a>
      </div> : <ul >
        <li>
            <Link style={{ color: "#333" }} to="/register">Register</Link>
        </li>
        <li>
            <Link style={{ color: "#333" }} to="/">Login</Link>
        </li>
      </ul>}
    </div>
  )
}

export default Navbar