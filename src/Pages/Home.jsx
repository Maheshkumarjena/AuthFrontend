import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'



const Home = ({feedback,setFeedback,fbvis ,setFbvis}) => {


  


  return (
    <div className='d-flex flex-column justify-content-center align-items-center bg-primary vh-100'>
    <button className='btn btn-light w-50 mb-3 mx-auto'>
      <Link to='/dashboard'>Dashboard</Link>
    </button>
    <button className='btn btn-light w-50 mb-3 mx-auto'>
      <Link to='/signup'>Sign Up</Link>
    </button>
    <button className='btn btn-light w-50 mb-3 mx-auto'>
      <Link to='/login'>Sign In</Link>
    </button>
    <button className='btn btn-light w-50 mb-3 mx-auto'>
      <Link to='/forgotpassword'>Change password</Link>
    </button>

    
    {{fbvis} ? (<p style={{backgroundColor:'white', width:"50vw" ,textAlign:"center", borderRadius:'5px', margin:"20px"}}>{feedback}</p>) : " "}

  </div>
  
  )
}

export default Home