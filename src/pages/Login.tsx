import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider/useAuth";

import { message } from "antd"
import InputGroup from '../components/Input';
import { Button } from '../components/Button';

import logo from '../assets/images/logo.svg';

import "../styles/pages/login.scss"

export default function Login() {

  const auth = useAuth();
  const navigate = useNavigate();

  // Input states
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  async function loginFunction() { // Function that is called when submit button is pressed
    try {
      await auth.authenticate(email, password);

      navigate('/profile');
    } catch (error) {
      message.error('Invalid email or password')
    }
  }

  return (
    <div className="main-content">
      <aside className="left-side">
        <div className="main-form">
          <img src={logo} className="main-logo" alt="Logo" />
          <h1>Login</h1>
          <p>Keep your secrets safe easily.</p>

          <InputGroup label="Email" placeholder="mail@website.com" id="userEmail" isLabelled isRequired type="email" onChange={(event) => setEmail( event.currentTarget.value )}/>
          <InputGroup label="Password" placeholder="Min. 8 character" id="userPassword" isLabelled isRequired type="password" onChange={(event) => setPassword( event.currentTarget.value )}/>

          <div className="forget-password">
            <Link to="/password-reset" className="link">Forget password?</Link>
          </div>
          <Button className="primary mb-1" isPrimary onClick={loginFunction}>Login</Button>
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
