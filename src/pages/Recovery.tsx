// Assets import
import logo from '../assets/images/logo.svg'

import '../styles/pages/login.scss';

import InputGroup from '../components/Input';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from 'react';

export default function Recovery(this: any) {

  const [ recoveryEmail, setRecoveryEmail ] = useState('');

  const handleRecoveryPassword = (email: string) => {

    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('Check your inbox and follow the instructions!')
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  return (
    <div className="main-content">
      <aside className="left-side">
        <div className="main-form">
          <img src={logo} className="main-logo" alt="Logo" />
          <h1>Recovery password</h1>
          <p>Keep your secrets safe easily.</p>

          <InputGroup label="Email" id="emailRecovery" onChange={(event) => setRecoveryEmail( event.target.value )} value={recoveryEmail} placeholder="mail@website.com" isLabelled isRequired type="email"/>

          <Button className="primary" isPrimary onClick={ () => handleRecoveryPassword(recoveryEmail) }>Recovery</Button>

          <div className="align-center mt-1">
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