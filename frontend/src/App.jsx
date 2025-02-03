import './App.css'
import Home from './pages/Home.jsx'
import LoginPage from './pages/LoginPage.jsx';
import Navbar from './components/Navbar.jsx'
import SignupPage from './pages/SignupPage.jsx';
import {
  Routes,Route
} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
    </Routes>
  )
}

export default App
