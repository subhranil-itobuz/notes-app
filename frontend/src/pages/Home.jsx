import { useContext, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Notes from '../components/Notes'
import { AuthContext } from '../contexts/AuthContext'
import { UserContext } from '../contexts/UserContext'

const Home = () => {
  const { isLoggedIn } = useContext(AuthContext)
  const { getUser } = useContext(UserContext)

  useEffect(() => {
    const getUserDetails = async () => {
      const user = await getUser()
      console.log(user)
    }

    isLoggedIn && getUserDetails()
    // eslint-disable-next-line  
  }, [])
  return (
    <>
      <Navbar />
      {
        isLoggedIn ? <Notes />
          :
          <div className='text-3xl mt-28 px-2 font-mono text-center text-red-500 font-bold'>
            *Please Create an account or login to use this notes App
          </div>
      }
    </>
  )
}

export default Home