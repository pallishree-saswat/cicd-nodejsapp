import {useContext} from 'react'
import Button from 'react-bootstrap/Button';
import AuthContext from "../authContext/index"
import axios from 'axios';
import {  Link } from 'react-router-dom';

const BlogItem = ({ blog, getBlogs }) => {
 const authContext = useContext(AuthContext)
 

 //delete blog by author
 const deleteBlog =  (blogId) => {
   const headers = {
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${authContext.token}`
   }
   axios.delete(`http://localhost:8000/api/delete/${blogId}`, {
     headers: headers
   }).then((res) => {
      alert("Blog deleted successfully")
     getBlogs()
    }).catch((err) =>{
      alert("Cant delete.Please try again later")
      console.log(err)
    })
 }



  return (
    
       
    
    <>
      <div className="card mt-5" style={{ maxWidth: "100%", border: "2px", backgroundColor: "transparent", borderColor: "#333" }}>

         
        <div className="row g-0 mb-2 main-card" >
         
          <div className="col-md-4">
            <img src={blog.image} alt="..." width="100%" height="100%"/>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title"><a style={{textDecoration:"inherit",color:"#333",fontWeight:"bolder",fontSize:"1.9rem"}} href="/">{blog.title}</a></h5>

             { blog.desc.length >250 ?
              <p className="card-text"> {  `${blog.desc}`.substring(0, 250) + "..."} </p>
              :
                <p className="card-text"> {`${blog.desc}`} </p>
             }
              <Button variant="secondary" >
                <Link to={`/detail/${blog._id}`} style={{ textDecoration: 'none', color:"#fff" }} >
                  Read More
                </Link>
              </Button>
              {authContext.token && authContext.user._id === blog.createdBy ? <Button variant="warning">
                <Link to={`/edit/${blog._id}`} style={{ textDecoration: 'none', color: "#000" }}>
              Edit 
              </Link>
              </Button> : ""} 
              {authContext.token && authContext.user._id === blog.createdBy ? <Button variant="danger"  onClick={(e) => deleteBlog(blog._id)}>Delete </Button> : ""} 
            </div>
          </div>
           </div>
      
      </div>
    </>
   
  )
}

export default BlogItem