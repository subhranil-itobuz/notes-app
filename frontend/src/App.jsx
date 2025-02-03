import './App.css'
import Home from './pages/Home.jsx'
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import { Routes, Route } from "react-router-dom";
import VerifyEmail from './pages/verifyEmail.jsx';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/verify/:token' element={<VerifyEmail />} />
      <Route path='/login' element={<LoginPage />} />
    </Routes>
  )
}

export default App
