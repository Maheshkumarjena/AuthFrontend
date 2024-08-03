import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import DashBoard from './Pages/DashBoard';
import Home from './Pages/Home';
import react ,{ useState } from 'react';

function App() {
  const [feedback,setFeedback]=useState();
  const [fbvis,setFbvis]=useState();
  const [userName , setUserName]=useState();
  const [userEmail , setUserEmail]=useState();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home feedback={feedback} fbvis={fbvis} setFbvis={setFbvis} setFeedback={setFeedback} />}  />
        <Route path='/login' element={<Login userName={userName} setUserName={setUserName} userEmail={userEmail} setUserEmail={setUserEmail} feedback={feedback} setFeedback={setFeedback} />} />
        <Route path='/signup' element={<SignUp feedback={feedback} setFeedback={setFeedback} />} />
        <Route path='/forgotpassword' element={<ForgotPassword feedback={feedback} setFeedback={setFeedback} />} />
        <Route path='/resetpassword/:token' element={<ResetPassword feedback={feedback} setFeedback={setFeedback} />} />
        <Route path='/dashboard' element={<DashBoard userName={userName} setUserName={setUserName} userEmail={userEmail} setUserEmail={setUserEmail} fbvis={fbvis} setFbvis={setFbvis} feedback={feedback} setFeedback={setFeedback} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
