import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import logo from "../../assets/images/logo.svg"
import { useAuth } from '../../context/AuthProvider/useAuth';
import { Button } from '../Button';
import Divider from '../Divider';

import "./styles.scss";

export default function Header () {

  const auth = useAuth();
  const user = { name: auth.name, email: auth.email, uid: auth.uid };

  const navigate = useNavigate();

  async function logout() {
    auth.logout();
    navigate('/login');
  }

  return (
    <div className="main-header">
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="Locker" className="logo-img"/>
        </Link>
      </div>
      <div className="nav-container">
        <div className="user-container">
          <div className="dropdown">
            <Button className="dropbtn"><span className="user-connected">{user.name ? user.name : user.email}</span></Button>
            <div className="dropdown-content">
              <Link to="/profile">Profile</Link>
              <Divider />
              <Button className="transparent hover-text-danger small" isPrimary onClick={logout}>Logout</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
