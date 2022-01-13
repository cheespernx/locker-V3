import { useState } from 'react';

import logo from '../assets/images/logo.svg'

import '../styles/pages/login.scss';

import InputGroup from '../components/Input';
import { Button } from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

export default function Signup() {

  const navigate = useNavigate();

  const [ userEmail, setUserEmail ] = useState() as any;
  const [ userPassword, setUserPassword ] = useState() as any;
  const [ btnDisable, setBtnDisable ] = useState(true) as any;

  async function handleCreateAccount(){

    createUserWithEmailAndPassword(auth, userEmail, userPassword)
    .then(() => {
      alert('Account created successfully!')
      navigate(`/login`, {replace: true})
    })
    .catch((error) => {
      switch (error.code){
        case 'auth/email-already-in-use':
          alert('Email already in use!');
          break;
        case 'auth/network-request-failed':
          alert('Error on the network request! Please try again later.');
          break;
      }
    });
  }

  function verifyPass (passRepeat: string) {

    if(passRepeat === userPassword){
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