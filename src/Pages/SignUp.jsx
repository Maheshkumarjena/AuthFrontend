import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const SignUp = ({ feedback, setFeedback }) => {
  const [user, Setuser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [fbvis, setFbvis] = useState(false); // Use boolean instead of string

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://auth-backendd.vercel.app/auth/signup", user);

      setFeedback(res.data.message);
      setFbvis(true); // Set boolean true

      setTimeout(() => {
        setFeedback('');
        setFbvis(false); // Set boolean false
      }, 2000);

      console.log(res);
      navigate('/login');
    } catch (err) {
      console.error('Error during signup:', err);

      let errorMsg;
      if (err.response) {
        if (err.response.data && err.response.data.message) {
          errorMsg = err.response.data.message;
        } else {
          errorMsg = 'An error occurred during signup.';
        }
      } else {
        errorMsg = err.message || 'An unknown error occurred';
      }
      setFeedback(errorMsg);

      setTimeout(() => {
        setFeedback('');
        setFbvis(false);
      }, 3000);
    };
  }

  return (
    <>
      <div className="Sign-up-container">
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
          <div className="bg-white p-3 rounded w-25">
            <h2>Sign Up</h2>
            <form className='sign-up-form' onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="Username">
                  <strong>Username</strong>
                </label>
                <input
                  type="text"
                  placeholder="Enter Username"
                  name="name"
                  className="form-control rounded-0"
                  onChange={(e) => { Setuser({ ...user, name: e.target.value }) }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email">
                  <strong>Email</strong>
                </label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  className="form-control rounded-0"
                  onChange={(e) => { Setuser({ ...user, email: e.target.value }) }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password">
                  <strong>Password</strong>
                </label>
                <input
                  type="password"
                  placeholder="*******"
                  name="password" // Fix here
                  className="form-control rounded-0"
                  onChange={(e) => { Setuser({ ...user, password: e.target.value }) }}
                />
              </div>
              <button type='submit'>SignUp</button>
              <div>
                <p>Have an account? <Link to='/login'>Login</Link></p>
              </div>

              {fbvis && <p>{feedback}</p>} {/* Conditional rendering */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
