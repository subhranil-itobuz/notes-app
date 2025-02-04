import { useContext } from 'react'
import Navbar from '../components/Navbar'
import Notes from '../components/Notes'
import { AuthContext } from '../contexts/AuthContext'

const Home = () => {
  const { isLoggedIn } = useContext(AuthContext)
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