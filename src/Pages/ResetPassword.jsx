import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate , useParams } from 'react-router-dom'

const ResetPassword = ({feedback,setFeedback}) => {

    const [fbvis,setFbvis]=useState("false")
    const [password,setPassword]=useState("")

    const {token}=useParams();

    const navigate=useNavigate()

    axios.defaults.withCredentials=true;

    function handleSubmit(e) {
        e.preventDefault()
        axios.put(`http://localhost:3000/auth/resetpassword/${token}`,{password})
        .then(res=>{
            if(res.data.status){
                setFeedback('password has been successfully updated')
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
          <h2>Reset password</h2>
          <form className="sign-up-form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="password">
                <strong>password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                name="password"
                className="form-control rounded-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            {fbvis && <p>{feedback}</p>}
          </form>
        </div>
      </div>
    </div>
    
)
}

export default ResetPassword