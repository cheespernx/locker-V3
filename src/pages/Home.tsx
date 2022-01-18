import React, { useState } from 'react';
import Header from '../components/Header';
import { useAuth } from "../context/AuthProvider/useAuth";
// Assets import
import '../styles/pages/home.scss';

import Account from '../components/Account';
import { Button } from '../components/Button';
import InputGroup from '../components/Input';

import { FaPlus } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';


export default function Home() {
  const auth = useAuth();
  const user = { name: auth.name, email: auth.email, uid: auth.uid };

  const [menuView, setMenuView] = useState(false);

  return (
    <div className="home-content">
      <Header></Header>
      <div className="container account-container">
        <div className="row account-list-header mb-3">
          <div className="col-md">
            <h3 className="page-title mb-3">Saved accounts</h3>
          </div>
          <div className="col-md-2">
            <Button isOutlined style={{ fontWeight: 300 }} onClick={() => setMenuView(!menuView)}><FaPlus className="me-1" />Add account</Button>
          </div>
        </div>
        <div className="account-list">
          <Account accountName="Google Account" accountSite="google.com" key="1" />
        </div>
        <div className="account-menu-container">
          <div className={menuView ? 'side-menu show' : 'side-menu hide'} >
            <div className="left-side-menu" onClick={() => setMenuView(!menuView)}></div>
            <div className="right-menu">
              <div className="title-row mb-5">
                <h3 className="page-title">Add new account</h3>
                <button className="button-close-menu" onClick={() => setMenuView(!menuView)}><span>{<GrClose/>}</span></button>
              </div>
              <InputGroup label="Email" placeholder="mail@website.com" isLabelled isRequired type="email" />
              <InputGroup label="Username" placeholder="yourusername" isLabelled type="text" />
              <InputGroup label="Password" placeholder="Your password" isLabelled isRequired type="password" />
              <InputGroup label="Link" placeholder="Link for the website" isLabelled type="text" />
              <div className="select-group mb-4">
                <label className="label-select">Select the account type</label>
                <select className="form-select">
                  <option hidden>Select one option</option>
                  <option value="Google Account">Google Account</option>
                  <option value="YouTube Account">YouTube Account</option>
                  <option value="Email Account">Email Account</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <Button className="primary mb-1 btn-submit" isPrimary onClick={() => { }}>Add account</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};