import React, { useEffect, useState } from 'react'
import { Button, Box, Container, Typography, TextField } from "@mui/material"
import { updateContact, getOneContact } from "../actions/contact"
import { useNavigate, useParams } from "react-router-dom"



const EditContact = () => {
    const navigate = useNavigate();
    const { id } = useParams()
    //console.log("id------",id)
    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
    });
    const { name, email, phone } = contact;
    let userData = JSON.parse(localStorage.getItem("myUser"))
    useEffect(() => {
        getOneContact(id).then((res) => {
            console.log(res)
            setContact(res)

        })
    }, [id])
    const onChange = (e) =>
        setContact({
            ...contact,
            [e.target.name]: e.target.value,
        });
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(name, email, phone)
        updateContact({ name, email, phone }, id, userData._id).then((res) => {
            console.log("data updated", res)
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
                        Edit Contact
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
                            Update Contact
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    )
}


export default EditContact