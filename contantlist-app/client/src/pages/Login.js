import React, { useContext, useEffect, useState } from 'react'
import {Button,Box,Container,Typography,TextField} from "@mui/material"
import AuthContext from '../context/authContext/authContext';
import {useNavigate} from "react-router-dom"
const Login = () => {
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  const { login, error, clearErrors, isAuthenticated } = authContext;

 
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [errorMsg, setErrorMsg] = useState(error)
  const { email, password } = user;

  
  useEffect(() => {
  
    error && setTimeout(() => {
      clearErrors()
    }, 3000);
    errorMsg && setTimeout(() => {
      setErrorMsg(null)
    }, 3000);
  }, [isAuthenticated, navigate, error, clearErrors, errorMsg, setErrorMsg])
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setErrorMsg("please fill in all fields")
    } else {
      login({
        email, password
      });
    }
  };
  return (
    <div>
     { errorMsg && <Typography component="h1" variant="h5">
       {errorMsg}
      </Typography>}
      {error && <Typography component="h1" variant="h5">
        {error}
      </Typography>}
      <Container maxWidth="sx">
        <Box sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Typography component="h1" variant="h5">
           Account Login
          </Typography>
          <Box>
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
              onClick={(e)=>onSubmit(e)}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  )
}

export default Login