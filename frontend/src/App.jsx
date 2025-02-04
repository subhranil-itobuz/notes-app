import { Routes, Route } from "react-router-dom";

import Home from './pages/Home.jsx'
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import VerifyEmail from './pages/VerifyEmail.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { UserProvider } from "./contexts/UserContext.jsx";
import ReverifyPage from "./pages/ReverifyPage.jsx";


function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/verify/:token' element={<VerifyEmail />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/reverify' element={<ReverifyPage />} />
        </Routes>
      </UserProvider>
    </AuthProvider>
  )
}

export default App
