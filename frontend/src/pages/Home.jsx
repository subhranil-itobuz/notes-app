import { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { AuthContext } from '../contexts/AuthContext'
import { UserContext } from '../contexts/UserContext'
import Dashboard from './Dashboard'

const Home = () => {
  const { isLoggedIn } = useContext(AuthContext)
  const { getUser } = useContext(UserContext)
  const [user, setUser] = useState()

  useEffect(() => {
    const getUserDetails = async () => {
      const user = await getUser()
      console.log(user)
      setUser(user)
    }
    isLoggedIn && getUserDetails()

    // eslint-disable-next-line  
  }, [])
  return (
    <div className='scroll-smooth'>
      <Navbar user={user} />
      {
        isLoggedIn ? <Dashboard />
          :
          <div className='text-3xl mt-28 px-2 font-mono text-center text-red-500 font-bold'>
            *Please Create an account or login to use this notes App
          </div>
      }
    </div>
  )
}

export default Home