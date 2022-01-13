import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider/useAuth";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import InputGroup from '../components/Input';
import { Button } from '../components/Button';

import logo from '../assets/images/logo.svg';

import "../styles/pages/login.scss"
import { getUserLocalStorage } from "../context/AuthProvider/util";

export default function Login() {

  const auth = useAuth();
  const navigate = useNavigate();
  const fullUser = auth.fullUserInfo;
  // Input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const user = getUserLocalStorage()

    if (user && fullUser?.user?.emailVerified) {
      navigate('/');
    }
  })

  function loginFunction() { // Function that is called when submit button is pressed

    auth.signInWithEmail(email, password)
      .then(data => {
        if(fullUser?.user?.emailVerified){
          toast.success('Login successful!');
          setTimeout(() => navigate('/'), 3000)
        } else {
          toast.warning('Please, verify your email address first!');

        }
      })
      .catch(error => {
        console.log(error.toString());
        switch (error.toString()) {
          case 'Error: auth/wrong-password':
            toast.error('Email or password is incorrect');
            break;
          case 'Error: auth/user-not-found':
            toast.error('Invalid data! Check the information provided and try again.');
            break;
          case 'Error: auth/invalid-email':
            toast.error('Invalid email format! Check the information provided and try again.');
            break;
          case 'Error: auth/internal-error':
            toast.error('We found an error in the authentication. Please check the information provided and try again.');
            break;
          case 'Error: auth/too-many-requests':
            toast.error('Multiple requests detected. Please try again later.');
            break;
        }
      })
    }

    return (
      <div className="main-content">
        <aside className="left-side">
          <div className="main-form">
            <img src={logo} className="main-logo" alt="Logo" />
            <h1>Login</h1>
            <p>Keep your secrets safe easily.</p>

            <InputGroup label="Email" placeholder="mail@website.com" id="userEmail" isLabelled isRequired type="email" onChange={(event) => setEmail(event.currentTarget.value)} />
            <InputGroup label="Password" placeholder="Min. 8 character" id="userPassword" isLabelled isRequired type="password" onChange={(event) => setPassword(event.currentTarget.value)} />

            <div className="forget-password">
              <Link to="/password-reset" className="link">Forget password?</Link>
            </div>
            <Button className="primary mb-1" isPrimary onClick={loginFunction}>Login</Button>
            <ToastContainer 
              position="top-center"
              theme="colored"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover 
            />
            <div className="align-center">
              <Link to="/sign-up" className="link">Or create a new account</Link>
            </div>
          </div>
        </aside>

        <aside className="right-side">
          <h1>The safest and easyest way to save your password.</h1>
        </aside>
      </div>
    )
  }
