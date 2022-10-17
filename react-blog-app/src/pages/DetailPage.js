import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom"
import { BE_API } from "../apis"


const DetailPage = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState({})

  useEffect(() => {
    axios.get(`${BE_API}/post/${id}`).then((res) => {
      console.log(res)
      setBlog(res.data.data)

    })
  },[id])
 




  return (
    <div className='container mb-5'>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <img src={blog.image} height="400px" alt="thumb" />
        </div>
        <div className="col-md-8">
          <h1 className='text-center'>{blog.title}</h1>
          <p className='lead'> {blog.desc} </p>
        </div>
      </div>

    </div>
  )
}

export default DetailPage