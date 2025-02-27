import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { USER_API_ENDPOINT } from '../utils/endPoints';
import { AuthContext } from '../contexts/AuthContext';
import hamburger from '../assets/hamburger.svg'
import cross from '../assets/cross.svg'
import { UserContext } from '../contexts/UserContext';
import { userInstance } from '../utils/axiosSetup';
import { ChatContext } from '../contexts/ChatContext';


const Navbar = () => {
  const navigate = useNavigate()
  const [expandNav, setExpandNav] = useState(false)

  const { isLoggedIn, logoutFunction, tokenRemoveFunction, role } = useContext(AuthContext)
  const isUser = isLoggedIn || localStorage.getItem('isLoggedIn')

  const { user } = useContext(UserContext)
  const { setRoom } = useContext(ChatContext)
  const userName = user?.userName || 'Username'

  const logoutHandler = async () => {
    try {
      const res = await userInstance.get(`${USER_API_ENDPOINT}/logout`)

      if (res.data.success) {
        logoutFunction()
        tokenRemoveFunction()
        navigate('/')
        toast.success(res.data.message)
      }
      else toast.info(res.data.message)
    } catch (error) {
      console.error(error)
      toast.error(error.response.data.message)
    }
  }

  const handleRoomSet = () => {
    setRoom(user._id)
  }

  return (
    <>
      <nav className={`bg-[#16425b] text-white flex justify-between items-center py-4 px-4 h-16 md:px-8 2xl:px-20 md:py-2 w-full`}>
        <Link to='/'><h1 className='text-xl md:text-2xl font-bold italic hover:scale-105'>&lt;NotesApp/&gt;</h1></Link>
        {
          !isUser ?
            <div className='flex items-center gap-4'>
              <Link to='/login'>
                <button className='rounded-md px-2 md:px-4 py-1 md:py-2 font-semibold hover:bg-[#fbf8cc] hover:text-black transition-all duration-500 ease-in-out'>
                  Login
                </button>
              </Link>
              <Link to='/signup'>
                <button className='rounded-md px-2 md:px-4 py-1 md:py-2 font-semibold hover:bg-[#98f5e1] hover:text-black transition-all duration-500 ease-in-out'>
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
                  {
                    role === 'user' ?
                      <ul className='flex justify-center items-center gap-10'>
                        <li>
                          <Link to='/' className='hover:text-blue-400'>Home</Link>
                        </li>
                        <li>
                          <Link to='/profile' className='hover:text-blue-400'>Profile</Link>
                        </li>
                        <li>
                          <Link to='/notes/view' className='hover:text-blue-400'>Notes</Link>
                        </li>
                        <li>
                          <Link to='/chat' className='hover:text-blue-400'>
                            <button onClick={handleRoomSet}>Chat</button>
                          </Link>
                        </li>
                      </ul>
                      :
                      <ul className='flex justify-center items-center gap-10'>
                        <li>
                          <Link to='/admin' className='hover:text-blue-400'>Home</Link>
                        </li>
                        <li>
                          <Link to='/users' className='hover:text-blue-400'>Users</Link>
                        </li>
                      </ul>
                  }
                  <div className='flex justify-center items-center gap-8'>
                    <p>Hello,<span className='text-yellow-300 cursor-pointer'> {userName}</span></p>
                    <button className='border border-white rounded-md font-medium px-2 py-2 hover:bg-red-500 transition-colors ease-in-out' onClick={logoutHandler}>Logout</button>
                  </div>
                </div>
              </div>
            </div>
        }
      </nav >
      {
        expandNav &&
        <div className={`bg-slate-600 backdrop-blur-3xl backdrop-opacity-10 w-52 h-auto text-white absolute right-0 z-30 pt-5 pb-10 text-xl shadow-lg shadow-slate-500 rounded-l-xl md:hidden ${!isUser && 'hidden'}`}>
          <div className='flex flex-col items-center justify-between gap-12'>
            {
              role === 'admin' ?
                <ul className='flex flex-col justify-center items-center gap-10'>
                  <li>
                    <Link to='/admin' className='hover:text-blue-400'>Home</Link>
                  </li>
                  <li>
                    <Link to='/users' className='hover:text-blue-400'>Users</Link>
                  </li>
                </ul>
                :
                <ul className='flex flex-col justify-center items-center gap-10'>
                  <li>
                    <Link to='/' className='hover:text-blue-400'>Home</Link>
                  </li>
                  <li>
                    <Link to='/profile' className='hover:text-blue-400'>profile</Link>
                  </li>
                  <li>
                    <Link to='/notes/view' className='hover:text-blue-400'>Notes</Link>
                  </li>
                  <li>
                    <Link to='/chat' className='hover:text-blue-400'>
                      <button onClick={handleRoomSet}>Chat</button>
                    </Link>
                  </li>
                </ul>
            }

            <div className='flex flex-wrap justify-center items-center gap-8'>
              <p>Hello, <span className='text-green-300 cursor-pointer font-medium'>{userName}</span></p>
              <button className='border border-white rounded-md px-2 py-2 hover:bg-red-500 transition-colors ease-in-out' onClick={logoutHandler}>Logout</button>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default Navbar