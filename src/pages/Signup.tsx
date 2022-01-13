import { useState } from 'react';

import logo from '../assets/images/logo.svg'

import '../styles/pages/login.scss';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import InputGroup from '../components/Input';
import { Button } from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';

import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

const auth = getAuth();

export default function Signup() {

  const navigate = useNavigate();

  const [ userEmail, setUserEmail ] = useState() as any;
  const [ userPassword, setUserPassword ] = useState() as any;
  const [ btnDisable, setBtnDisable ] = useState(true) as any;

  async function handleCreateAccount(){

    createUserWithEmailAndPassword(auth, userEmail, userPassword)
    .then(userCredential => {
      sendEmailVerification(userCredential.user).then(() => {
        toast.success('Account created successfully! Verify your inbox to activate your account.');
        setTimeout(() => navigate(`/login`, {replace: true}), 5000)
      })
    })
    .catch((error) => {
      switch (error.code){
        case 'auth/email-already-in-use':
          toast.error('Email already in use!')
          break;
        case 'auth/network-request-failed':
          toast.error('Error on the network request! Please try again later.')
          break;
      }
    });
  }

  function verifyPass (passRepeat: string) {

    if(passRepeat === userPassword && userPassword.length > 8) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  }

  return (
    <div className="main-content">
      <aside className="left-side">
        <div className="main-form">
          <img src={logo} className="main-logo" alt="Logo" />
          <h1>Create your account</h1>
          <p>Keep your secrets safe easily.</p>

          <InputGroup label="Email" placeholder="mail@website.com" id="userEmail" onChange={(event) => setUserEmail( event.currentTarget.value )} isLabelled isRequired type="email"/>

          <InputGroup label="Password" placeholder="Min. 8 character" id="userPassword" onChange={event => setUserPassword( event.target.value )} isLabelled isRequired type="password"/>

          <InputGroup label="Repeat your password" placeholder="Min. 8 character" id="userPasswordRepeat" isLabelled isRequired type="password" onChange={(event) => verifyPass(event.currentTarget.value) }/>
          
          <Button className="primary mb-1" id="btnCreateAccount" isPrimary onClick={handleCreateAccount} disabled={btnDisable}>Create account</Button>
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
            <Link to="/login" className="link">Or make login</Link>
          </div>
        </div>
      </aside>

      <aside className="right-side">
        <h1>The safest and easyest way to save your password.</h1>
      </aside>
    </div>
  )
};