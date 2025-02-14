import { useContext, useEffect, useState } from 'react'
import ViewAllNotesPage from './ViewAllNotesPage'
import { UserContext } from '../contexts/UserContext'
import { AuthContext } from '../contexts/AuthContext'
const AdminPage = () => {

  const { getUser, } = useContext(UserContext)
  const { isLoggedIn } = useContext(AuthContext)
  const [user, setUser] = useState()


  useEffect(() => {
    const getUserDetails = async () => {
      const user = await getUser()
      setUser(user)
    }
    isLoggedIn && getUserDetails()

    // eslint-disable-next-line  
  }, [])
  return (
    <>
      <ViewAllNotesPage user={user} />
    </>
  )
}

export default AdminPage