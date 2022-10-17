import React, {useEffect,useState, useContext} from 'react'
import { Form, Container, Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import axios  from 'axios'
import AuthContext from "../authContext/index"
import { Cloudinary_API, BE_API } from "../apis"

const EditPage = () => {
  const authContext = useContext(AuthContext)
  const navigate = useNavigate();
  const { id } = useParams()

  const [blog, setBlog] = useState({
    title: "",
    desc: ""
  })
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState("")

  const { title, desc } = blog;
  const handleChange = (e) => setBlog({ ...blog, [e.target.name]: e.target.value })

  let blogObj = {
    title,
    desc,
    image: url
  }
  console.log(blogObj)

  useEffect(() => {
    axios.get(`${BE_API}/post/${id}`).then((res) => {
      console.log(res)
      setBlog(res.data.data)

    })
  }, [id])
  

  //edit blog by author
  const editBlog = (blogId) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authContext.token}`
    }

    axios.put(`${BE_API}/edit/${blogId}`, blogObj, {
      headers: headers
    }).then((res) => {
      console.log("data", res.data.data)
      navigate("/")
    })

  }
  const onSubmit = async (e) => {
    e.preventDefault();
    editBlog(id)
   
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
setLoading(true)
    const data = new FormData();
    data.append('file', file)
    data.append("upload_preset", "insta-clone")

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
      <h2 style={{ textAlign: "center" }}> Edit Blog </h2>
      <Form style={{ width: "60%", marginLeft: "25%" }} className="mt-4" onSubmit={onSubmit}>
        <Form.Group className="mb-4" controlId="formBasicEmail">

          <Form.Control type="text" placeholder="Title" name='title' value={title} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-4" controlId="formBasicEmail">

          <Form.Control type="text" as="textarea" name='desc' rows={5} placeholder="Description" value={desc} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formBasicPassword">

          <Form.Control type="file" name='img'  onChange={uploadFileHandler} />
        </Form.Group>



        <Button variant="primary" type="submit" >
          {loading ? "Loding" : "Submit"} 
        </Button>
      </Form>
    </Container>

  )
}

export default EditPage