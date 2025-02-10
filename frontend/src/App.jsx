import { Routes, Route } from "react-router-dom";

import Home from './pages/Home.jsx'
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import VerifyEmail from './pages/VerifyEmail.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { UserProvider } from "./contexts/UserContext.jsx";
import ReverifyPage from "./pages/ReverifyPage.jsx";
import CreateNotePage from "./pages/CreateNotePage.jsx";
import { NotesProvider } from "./contexts/NotesContext.jsx";
import ViewAllNotesPage from "./pages/ViewAllNotesPage.jsx";
import ProfilePage from './pages/ProfilePage.jsx'

function App() {

  return (
    <div className="max-w-[1440px] h-[100vh] mx-auto bg-[#16425b]">
      <AuthProvider>
        <UserProvider>
          <NotesProvider>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/signup' element={<SignupPage />} />
              <Route path='/verify/:token' element={<VerifyEmail />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/reverify' element={<ReverifyPage />} />

              {/* Protected Routes */}
              <Route path='/notes/create' element={<CreateNotePage />} />
              <Route path='/notes/view' element={<ViewAllNotesPage />} />
              <Route path='/profile' element={<ProfilePage />} />
            </Routes>
          </NotesProvider>
        </UserProvider>
      </AuthProvider>
    </div>
  )
}

export default App
