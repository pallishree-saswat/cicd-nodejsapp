import React,{useContext,useEffect,useState} from 'react'
import { Button, Box, Container, Typography, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"
import AuthContext from '../context/authContext/authContext';
const Register = () => {
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  const { register, error, clearErrors, isAuthenticated } = authContext;

 
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [errorMsg, setErrorMsg] = useState(null)
  const { name,email, password } = user;
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/index");
    }
    error && setTimeout(() => {
      clearErrors()
    }, 3000);
    errorMsg && setTimeout(() => {
      setErrorMsg(null)
    }, 3000);
  }, [isAuthenticated, navigate, error, clearErrors, errorMsg, setErrorMsg])
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "" ) {

      setErrorMsg("Please enter all fields");
    }  else {
      register({
        name,
        email,
        password,
      });
      navigate("/index")

    }
  };

  return (
    <div>
      <Container maxWidth="sx">
        <Typography component="h1" variant="h5">
          {errorMsg}
        </Typography>
        {error && <Typography component="h1" variant="h5">{error}</Typography>}
        <Box sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Typography component="h1" variant="h5">
           Account Register
          </Typography>
          <Box>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={name}
              onChange={(e)=>onChange(e)}
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e)=>{submit(e)}}
            >
              register
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  )
}

export default Register