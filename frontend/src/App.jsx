import './App.css'
import Home from './pages/Home.jsx'
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import { Routes, Route } from "react-router-dom";
import VerifyEmail from './pages/verifyEmail.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/verify/:token' element={<VerifyEmail />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
