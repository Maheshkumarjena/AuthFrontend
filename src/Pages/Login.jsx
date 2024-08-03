import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({feedback,setFeedback,userName,setUserName,userEmail,setUserEmail}) => {
  const [user, setUser] = useState({
    EmOrUn: "",
    password: "",
  });

  const navigate = useNavigate();

  const [fbvis, setFbvis] = useState("false");

  axios.defaults.withCredentials=true;


  function handleSubmit(e) {
    e.preventDefault();
    axios.defaults.withCredentials=true;
    axios.post('http://localhost:3000/auth/login',{user})
      .then(res => {
        if (res.data.status) {
          setUserName(res.data.user.userName);
          setUserEmail(res.data.user.email);
          navigate("/dashboard");
          setFeedback({type: 'success', message: 'Login Successfull'})
        } else {
          setFeedback(res.response.data.message);
      setFbvis('true');

      setTimeout(() => {
        setFeedback('');
        setFbvis('false');
      }, 2000);
        }
      })
      .catch(err => {
        console.log(err);
        const errormsg=err.response.data.message ||  'An error occurred during signup.......';
        setFbvis('true')
        setFeedback(errormsg);

      setTimeout(() => {
        setFeedback('');
        setFbvis('false');
      }, 3000);
      });
  }

  return (
    <div className="Sign-up-container">
      <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
        <div className="bg-white p-3 rounded w-25">
          <h2>Log in</h2>
          <form className='sign-up-form' onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="EmOrUn">
                <strong>Username or Email</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Username or Email"
                name="EmOrUn"
                className="form-control rounded-0"
                onChange={(e) => { setUser({ ...user, EmOrUn: e.target.value }) }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="*******"
                name="password"
                className="form-control rounded-0"
                onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
              />
            </div>
            <button type='submit'>Login</button>
            <div>
              <Link to='/forgotpassword'>Forgotpassword?</Link>
              <p>Don't have an account? <Link to='/'>Sign Up</Link></p>
            </div>

            {fbvis && (<p>{feedback}</p>)}

          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
