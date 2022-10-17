import {useState,useContext} from 'react'
import { Form, Container, Button } from "react-bootstrap"
import { useNavigate} from "react-router-dom"
import axios  from 'axios'
import AuthContext from "../authContext/index"

import {Cloudinary_API, BE_API} from "../apis"


const AddPage = () => {

    const navigate = useNavigate()
    const authContext = useContext(AuthContext)
    const [blog, setBlog] = useState({
        title:"",
        desc:""
    })
const [loading, setLoading] = useState(false)
    const [url, setUrl] = useState("")

    const {title,desc} = blog;
    const handleChange = (e) => setBlog({...blog , [e.target.name]:e.target.value})

    let blogObj = {
        title,
        desc,
        image: url
    }
    console.log(blogObj)
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authContext.token}`
            }

        

            const res = await axios.post(`${BE_API}/post`, blogObj, {
                headers: headers
            });
            console.log(res.data);
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

   
    const uploadFileHandler = async (e) => {
        setLoading(true)
        const file = e.target.files[0]
       
        const data = new FormData();
        data.append('file', file)
        data.append("upload_preset", "images")
        fetch(`${Cloudinary_API}`, {
            method: "post",
            body: data
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                setUrl(data.secure_url)
                setLoading(false)
            }).catch(err => {
                console.log(err)
            })
    }


    


    return (
        <Container className="mt-4" >
            <h2 style={{ textAlign: "center" }}> Create Blog </h2>
            <Form style={{ width: "60%", marginLeft: "25%" }} className="mt-4" onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="formBasicEmail">

                    <Form.Control type="text" placeholder="Title" name='title' value={title} onChange={handleChange} required/>
                </Form.Group>
                <Form.Group className="mb-4" controlId="formBasicEmail">

                    <Form.Control type="text" as="textarea" name='desc' rows={5} placeholder="Description" value={desc} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">

                    <Form.Control type="file" name='img'  onChange={uploadFileHandler} />

                   
                </Form.Group>


                <Button variant="danger" type="submit" disabled={loading ? true : false}>
                   {loading ? "Loding" :"Submit"} 
                </Button>
            </Form>
        </Container>

    )
}

export default AddPage