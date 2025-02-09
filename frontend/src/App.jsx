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
import ProtectedRoutes from "./middleware/ProtectedRoutes.jsx";
import IsLoggedIn from "./middleware/isLoggedIn.jsx";

function App() {

  // const { isLoggedIn } = useContext(AuthContext)

  return (
    <div className="max-w-[1440px] h-[100vh] mx-auto bg-[#16425b]">
      <AuthProvider>
        <UserProvider>
          <NotesProvider>
            <Routes>
              <Route path='/' element={<Home />} />

              <Route path='/signup' element={
                <IsLoggedIn>
                  <SignupPage />
                </IsLoggedIn>
              }
              />
              <Route path='/verify/:token' element={
                <IsLoggedIn>
                  <VerifyEmail />
                </IsLoggedIn>
              } />
              <Route path='/login' element={
                <IsLoggedIn>
                  <LoginPage />
                </IsLoggedIn>
              } />
              <Route path='/reverify' element={
                <IsLoggedIn>
                  <ReverifyPage />
                </IsLoggedIn>
              } />

              {/* Protected Routes */}
              <Route path='/notes/create' element={
                <ProtectedRoutes>
                  <CreateNotePage />
                </ProtectedRoutes>
              } />

              <Route path='/notes/view' element={
                <ProtectedRoutes>
                  <ViewAllNotesPage />
                </ProtectedRoutes>
              } />

              <Route path='/profile' element={
                <ProtectedRoutes>
                  <ProfilePage />
                </ProtectedRoutes>
              } />
            </Routes>
          </NotesProvider>
        </UserProvider>
      </AuthProvider>
    </div>
  )
}

export default App
