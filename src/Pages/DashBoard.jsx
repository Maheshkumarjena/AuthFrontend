import React from 'react'
import {useNavigate } from 'react-router-dom'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const DashBoard = ({feedback,setFeedback,setFbvis,fbvis,userName,setUserName,userEmail,setUserEmail}) => {

  const navigate = useNavigate()
  axios.defaults.withCredentials=true;

  useEffect(()=>{
    axios.get('http://localhost:3000/auth/verify')
    .then(res=>{
       console.log(res);
       setUserEmail(res.data.email)
       setUserName(res.data.username)
        setFeedback(res.data.status ? `Welcome to your Dashboard` : " Make sure to login before accessing the Dashboard")
        setFbvis(true)
        setTimeout(() => { 
            setFeedback(' ')
            setFbvis(false)
        }, 3000);
      if(res.data.status){
        console.log(res.data.status);
        
      }
      else{
        navigate('/')
      }

    })
  },[])


const handleclick =(e)=>{

    e.preventDefault;
    axios.defaults.withCredentials=true;

    axios.post('http://localhost:3000/auth/logout')
    .then(res=>{
        if(res.data){
            setFeedback('You have been successfully logged out')
            setFbvis(true)
            navigate('/')
            setTimeout(() => {
                setFbvis(false)
                setFeedback(" ")
            }, timeout);
        }
        else{
            setFeedback('couldnot logout')
        }
    })
    .catch(err=>{
        console.log('Some error occured')
    })
}


  return (
    <>
      <header className="App-header text-center d-flex flex-column justify-content-center align-items-center bg-primary vw-100 vh-100">
        <h1 className="my-4">Welcome, {userName}!</h1>
        <p className="mb-4">Email: {userEmail}</p>
        <div className="btn-group flex-column gap-2" role="group">
        <button style={{backgroundColor:'black' , borderRadius:'10px' }} className="btn btn-secondary">
                <Link to='/' style={{textDecoration:'none'}} className="text-white ">Home</Link>
            </button>
            <button style={{backgroundColor:'black' , borderRadius:'10px'}} onClick={handleclick} className="btn btn-secondary">
                Logout
        </button>
        </div>
      </header>
    </>


)
}

export default DashBoard