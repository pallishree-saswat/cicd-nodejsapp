import React, {useState} from 'react'
import { Button, Box, Container, Typography, TextField } from "@mui/material"
import {addContact} from "../actions/contact"
import { useNavigate } from "react-router-dom"
const AddEditContact = () => {
    const navigate = useNavigate();
  
    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
    });
    const { name, email, phone } = contact;

    const onChange = (e) =>
        setContact({
            ...contact,
            [e.target.name]: e.target.value,
        });
    const onSubmit = (e) => {
        e.preventDefault();
        // if (current === null) {
        //     addContact(contact);
        // } else {
        //     updateContact(contact);
        // }

    let user = JSON.parse(localStorage.getItem("myUser"))
      addContact({name,email,phone},user._id).then((res)=> {
        console.log("data added", res)
        navigate("/")
      })
   
    };



    return (
        <div>
            <Container maxWidth="sx">
                <Box sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Typography component="h1" variant="h5">
                        Create Contact
                    </Typography>
                    <Box>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="name"
                            value={name}
                            label="Name"
                            type={'text'}
                            id="name"
                            autoComplete="name"
                            variant='filled'
                            onChange={onChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            type={'email'}
                            autoComplete="email"
                            autoFocus
                            variant='filled'
                            value={email}
                            onChange={onChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="phone"
                            label="Phone Number"
                            name="phone"
                            type={'number'}
                            autoComplete="email"
                            autoFocus
                            variant='filled'
                            value={phone}
                            onChange={onChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={onSubmit}
                        >
                         Create Contact
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    )
}


export default AddEditContact