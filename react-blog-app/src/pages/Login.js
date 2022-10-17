import {useEffect,useState,useContext} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom"
import AuthContext from "../authContext/index"
import {useNavigate} from "react-router-dom"


const Login = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { login,  isAuthenticated } = authContext;
  const [user, setUser] = useState({
    email:"",
    password:""
  })
  const {email,password} = user;
  useEffect(() => {
    if (isAuthenticated){
      navigate("/");
     }
     
  }, [ isAuthenticated,navigate])
  
  const handleChange = (e) =>{
     setUser({...user,[e.target.name]:e.target.value});
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    login(user);
  }
  return (
   <div className="container mt-4">  
     <h2 className="mt-5" style={{textAlign:"center"}}>Login</h2>
     <Form className="mt-2" style={{width:"63%",marginLeft:"20%"}} onSubmit={handleSubmit}>
      
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' value={email} onChange={handleChange} required/>
      </Form.Group>

      <Form.Group className="mb-2" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' value={password} onChange={handleChange} required/>
      </Form.Group>
      <div className="mb-1" style={{display:"flex"}}>
       <span > Are you haven't registered?</span><Link style={{cursor:"pointer",marginLeft:"0",color:"inherit"}} to="/register">Register now</Link>
     
      </div>
        
      <Button variant="danger" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  )
}

export default Login