import React from 'react';
import Header from '../components/Header';
import { useAuth } from "../context/AuthProvider/useAuth";
// Assets import
import '../styles/pages/home.scss';

import Account from '../components/Account';
import { Button } from '../components/Button';

import { FaPlus } from 'react-icons/fa';

export default function Home() {
  const auth = useAuth();
  const user = { name: auth.name, email: auth.email, uid: auth.uid };
  
  return (
    <div className="home-content">
      <Header></Header>
      <div className="container account-container">
        <div className="row account-list-header mb-3">
          <div className="col-md">
            <h3 className="page-title mb-3">Saved accounts</h3>
          </div>
          <div className="col-md-2">
            <Button isOutlined style={{ fontWeight: 300 }}><FaPlus className="me-1" />Add account</Button>
          </div>
        </div>
        <Account accountName="Google Account" accountSite="google.com" key="1" />
      </div>
    </div>
  )
};