import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import { USER_API_ENDPOINT } from '../utils/endPoints';
import { AuthContext } from '../contexts/AuthContext';
import hamburger from '../assets/hamburger.svg'
import cross from '../assets/cross.svg'
import { UserContext } from '../contexts/UserContext';

const Navbar = () => {
  const navigate = useNavigate()
  const [expandNav, setExpandNav] = useState(false)

  const { isLoggedIn, logoutFunction, refreshToken, tokenRemoveFunction } = useContext(AuthContext)
  const isUser = isLoggedIn || localStorage.getItem('isLoggedIn')

  const { user } = useContext(UserContext)
  const userName = user?.userName || 'Username'

  const token = refreshToken || localStorage.getItem('refreshToken')

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (res.data.success) {
        console.log(res.data.message)
        logoutFunction()
        tokenRemoveFunction()
        navigate('/')
        toast.success(res.data.message)
      }
      else toast.info(res.data.message)
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  return (
    <>
      <nav className={`bg-slate-600 text-white flex justify-between items-center py-4 px-4 h-16 md:px-8 2xl:px-20 w-full`}>
        <Link to='/'><h1 className='text-xl font-bold italic'>NotesApp</h1></Link>
        {
          !isUser ?
            <div className='flex items-center gap-4'>
              <Link to='/login'>
                <button className='border border-gray-400 rounded-xl px-2 md:px-4 py-2 hover:bg-green-800 transition-colors ease-in-out'>
                  Login
                </button>
              </Link>
              <Link to='/signup'>
                <button className='border border-gray-400 rounded-xl px-2 md:px-4 py-2 hover:bg-slate-400 transition-colors ease-in-ou'>
                  Sign up
                </button>
              </Link>
            </div>
            :
            <div className={!isUser ? 'hidden' : 'block'}>
              <div className='md:hidden'>
                <button>
                  {
                    !expandNav ?
                      <img src={hamburger} alt="hamburger" onClick={() => setExpandNav(true)} />
                      :
                      <img src={cross} alt="cross icon" onClick={() => setExpandNav(false)} />
                  }
                </button>
              </div>
              <div className='hidden md:block'>
                <div className='flex items-center justify-between gap-12'>
                  <ul className='flex justify-center items-center gap-10'>
                    <li>
                      <Link to='/' className='hover:text-blue-400'>Home</Link>
                    </li>
                    <li>
                      <Link to='/' className='hover:text-blue-400'>Profile</Link>
                    </li>
                    <li>
                      <Link to='/' className='hover:text-blue-400'>Notes</Link>
                    </li>
                  </ul>
                  <div className='flex justify-center items-center gap-8'>
                    <p>Hello, <span className='text-green-300 cursor-pointer'>{userName}</span></p>
                    <button className='border border-gray-400 rounded-xl px-2 py-2 hover:bg-red-500 transition-colors ease-in-out' onClick={logoutHandler}>Logout</button>
                  </div>
                </div>
              </div>
            </div>
        }
      </nav >
      {
        expandNav &&
        <div className={`bg-slate-600 backdrop-blur-3xl backdrop-opacity-10 w-52 h-auto text-white absolute right-0 z-10 pt-5 pb-10 text-xl shadow-lg shadow-slate-500 rounded-bl-lg md:hidden ${!isUser && 'hidden'}`}>
          <div className='flex flex-col items-center justify-between gap-12'>
            <ul className='flex flex-col justify-center items-center gap-10'>
              <li>
                <Link to='/' className='hover:text-blue-400'>Home</Link>
              </li>
              <li>
                <Link to='/profile' className='hover:text-blue-400'>Profile</Link>
              </li>
              <li>
                <Link to='/notes' className='hover:text-blue-400'>Notes</Link>
              </li>
            </ul>
            <div className='flex flex-wrap justify-center items-center gap-8'>
              <p>Hello, <span className='text-green-300 cursor-pointer'>{userName}</span></p>
              <button className='border border-gray-400 rounded-xl px-2 py-2 hover:bg-red-500 transition-colors ease-in-out' onClick={logoutHandler}>Logout</button>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default Navbar