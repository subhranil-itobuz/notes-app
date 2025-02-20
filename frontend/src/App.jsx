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
import ErrorPage from "./pages/ErrorPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import AdminProtectedRoute from "./middleware/AdminProtectedRoute.jsx";
import AllUsersPage from "./pages/AllUsersPage.jsx";
import { AdminProvider } from "./contexts/AdminContext.jsx";
import { ChatProvider } from "./contexts/ChatContext.jsx";
import Chat from "./pages/Chat.jsx";


function App() {

  return (
    <div className="max-w-[1440px] h-[100vh] mx-auto bg-[#16425b]">
      <AuthProvider>
        <AdminProvider>
          <UserProvider>
            <NotesProvider>
              <ChatProvider>
                <Routes>

                  <Route path='*' element={<ErrorPage />} />
                  <Route path='/' element={<Home />} />
                  <Route path='/signup' element={<SignupPage />} />
                  <Route path='/verify/:token' element={<VerifyEmail />} />
                  <Route path='/login' element={<LoginPage />} />
                  <Route path='/reverify' element={<ReverifyPage />} />

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

                  {/* Admin protected route */}
                  <Route path="/admin" element={
                    <AdminProtectedRoute>
                      <AdminPage />
                    </AdminProtectedRoute>
                  } />

                  <Route path="/users" element={
                    <AdminProtectedRoute>
                      <AllUsersPage />
                    </AdminProtectedRoute>
                  } />

                  <Route path="/chat" element={<Chat />} />

                </Routes>
              </ChatProvider>
            </NotesProvider>
          </UserProvider>
        </AdminProvider>
      </AuthProvider>
    </div>
  )
}

export default App
