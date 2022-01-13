import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/AuthProvider';
import { ProtectedLayout } from './components/ProtectedLayout';

import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Recovery from './pages/Recovery';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <ProtectedLayout>
              <Home />
            </ProtectedLayout>
            }
          />
          <Route path='/login' element={<Login />} />            
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/password-reset" element={<Recovery />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
