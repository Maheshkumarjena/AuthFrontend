import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = ({feedback,setFeedback}) => {

    const [fbvis,setFbvis]=useState("false")
    const [email ,setEmail]=useState("")

    const navigate=useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        axios.post('http://localhost:3000/auth/forgotpassword',{email})
        .then(res=>{
            if(res.data.status){
                alert('Check your email for reset password link .')
                setFeedback('check your email for reset password link ')
                setFbvis('true')
                navigate('/login')

                setTimeout(() => {
                    setFeedback(" ")
                    setFbvis("false")

                }, 2000);
            }
            console.log(res.data.message);
            setFeedback(res.data.message);
            setFbvis('true')
            setTimeout(() => {
                setFeedback(" ")
                setFbvis("false")

            }, 2000);


        })
        .catch(err=>{
            console.log(err,"this is the error ")
            
        })
         
    }

  return (
    <div className="Forgot-password-container">
      <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
        <div className="bg-white p-3 rounded w-25">
          <h2>Forgot Password</h2>
          <form className="sign-up-form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                className="form-control rounded-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <div>
              <p>
                Have an account? <Link to="/login">Login</Link>
              </p>
            </div>
            {fbvis && <p>{feedback}</p>}
          </form>
        </div>
      </div>
    </div>
    
)
}

export default ForgotPassword