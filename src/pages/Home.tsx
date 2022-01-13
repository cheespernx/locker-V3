import React from 'react';
import Header from '../components/Header';
import { useAuth } from "../context/AuthProvider/useAuth";
// Assets import
import '../styles/pages/home.scss';

export default function Home() {
  const auth = useAuth();
  const user = { name: auth.name, email: auth.email, uid: auth.uid }
  
  return (
    <div className="main-content">
      <Header></Header>
      <h1>Hello {user.name ? user.name : user.email}!</h1>
    </div>
  )
};