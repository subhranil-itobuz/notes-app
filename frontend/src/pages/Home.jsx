import { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { AuthContext } from '../contexts/AuthContext'
import { UserContext } from '../contexts/UserContext'
import Notes from '../components/Notes'
import { Link } from 'react-router-dom'
import noteIcon from '../assets/noteIcon.png'

const Home = () => {
  const { isLoggedIn, role } = useContext(AuthContext)
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
        isLoggedIn && role === 'user' ? <Notes />
          :
          <section className='flex flex-col justify-center items-center gap-3 lg:gap-10'>
            <img src={noteIcon} alt="note icon" />
            <h1 className='text-5xl px-2 font-mono text-center text-[#f77f00] font-bold'>
              What will you <span className='font-serif text-green-500'>achieve</span> today?
            </h1>
            <p className='text-white font-mono px-2 text-center max-w-[500px]'>Remember everything and tackle any project with your notes, tasks, and schedule all in one place.</p>
            <Link to='/login' className=''>
              <button className='mt-9 bg-[#2ec4b6] hover:bg-[#b9fbc0] px-10 py-5 rounded-lg text-xl font-serif font-semibold transition-all duration-500 ease-in-out'>
                Get Started
              </button>
            </Link>
          </section>
      }
    </div>
  )
}

export default Home