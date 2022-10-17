import { useContext, useEffect ,useState} from 'react'
import {Container} from "react-bootstrap"
import BlogItem from "../components/BlogItem"
import AuthContext from "../authContext/index"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import {  BE_API } from "../apis"

const HomePage = () => {
  const authContext = useContext(AuthContext);
  const {  isAuthenticated } = authContext;
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
useEffect(() => {
  if (isAuthenticated) {
    navigate("/");
  }
    getBlogs();
  


}, [isAuthenticated, navigate]);

  const getBlogs = async () => {
    try {
      const res = await axios.get(`${BE_API}/all`);
      setBlogs(res.data.data)
    } catch (error) {
      console.log("error--->", error.response.data.msg)
      let err = error.response.data.msg
      alert(err)
    }
  }


  return (
<>
  {blogs.length > 0 ? 
        <Container>


          {blogs && blogs.map((item) => (<BlogItem blog={item} getBlogs={getBlogs} />))}

          {/* <BlogItem/> */}


  </Container>
  :
  "Loading"
  }
</>
   
  )
}

export default HomePage