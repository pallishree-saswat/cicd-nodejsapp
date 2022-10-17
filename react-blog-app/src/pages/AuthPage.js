import {useState} from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {  BE_API } from "../apis"


const AuthPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name:"",
    email:"",
    password:""
  });
  const [confirmPassword, setConfirmPassword] = useState("")
  const {name,email,password} = user;
  const handleChange = (e) =>{
     setUser({...user,[e.target.name]:e.target.value});
  }
  const handleSubmit = async (e) =>{
   e.preventDefault();
    if(password !== confirmPassword){
     alert("password doesn't match with confirm password");
    }else{
      axios.post(`${BE_API}/signup`,user).then((res) => {
        navigate("/login")
      }).catch((error) =>{
        console.log("error--->", error.response.data.msg)
        let err = error.response.data.msg
        alert(err)
      })
      
    }
  }
  return (
    <div className="container">  
     <h2 className="mt-4" style={{textAlign:"center"}}>Register User</h2>
     <Form className="mt-2" style={{width:"63%",marginLeft:"20%"}} onSubmit={handleSubmit} >
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" name='name' value={name} onChange={handleChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="Enter Email" name='email' value={email} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label> Confirm Password</Form.Label>
        <Form.Control type="password" placeholder=" Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required/>
      </Form.Group>
      <Button variant="danger" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  )
}

export default AuthPage