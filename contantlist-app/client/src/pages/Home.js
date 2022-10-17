import React, { useEffect, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';
import { Link, Navigate } from "react-router-dom";
import { getContact,deleteContact } from "../actions/contact"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

export default function DataTable() {
  const [data, setData] = useState([])
  let navigate = useNavigate()
  let userData = JSON.parse(localStorage.getItem("myUser"))
  useEffect(() => {
    console.log(userData)
    if(userData === null){
      navigate("/")
    }else{
    getAllContacts(userData._id) 
    }
  }, [ navigate, userData])

 const getAllContacts = (userId) => {
   getContact(userId).then((res) => {
     console.log(res)
     setData(res)
   }).catch((err) => console.log("error", err))
 }

  let arrIds = []
  const getIds = (id) => {
    let index = arrIds.indexOf(id)
    if (index === -1) {
      arrIds.push(id)
    } else {
      arrIds = arrIds.filter((v, i, arr) => {
        return i !== index
      })
    }
  }

  const deleteContactById = (e,contactId,userid) => {
    e.preventDefault()
   deleteContact(contactId, userid).then((res) => {
    alert("Contact Removed")
     getAllContacts(userData._id) 
   })
  }


  return (
    <>
      <Link to={"/create"}>
        <Button style={{ marginLeft: "80%", marginBottom: "2rem", background: "#16E2F5", color: "#000" }} variant="contained" startIcon={<AddCircleOutlineIcon />}>
          Add Contact
        </Button>
      </Link>



      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Action</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row._id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>
                  <span>
                    <Link to={`/edit/${row._id}`} >
                      <EditIcon />
                    </Link>
                  </span>
                  <span onClick={(e) => deleteContactById(e,row._id, userData._id)}>
                    <DeleteIcon />
                     </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
