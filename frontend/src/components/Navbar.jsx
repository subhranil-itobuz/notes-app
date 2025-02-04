import { Link, useNavigate } from 'react-router-dom';
import hamburger from '../images/hamburger.svg'
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { USER_API_ENDPOINT } from '../utils/endPoints';

const Navbar = () => {
  const navigate = useNavigate()

  const { isLoggedIn,logoutFunction, refreshToken, tokenRemoveFunction } = useContext(AuthContext)
  const user = isLoggedIn || localStorage.getItem('isLoggedIn')
  const userName = 'subhranil11'
  const token = refreshToken || localStorage.getItem('refreshToken')

  const logoutHandler = async () => {
    try {
      console.log('logout start')
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(res)
      if(res.data.success) {
        console.log(res.data.message)
        logoutFunction()
        tokenRemoveFunction()
        navigate('/')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <nav className='bg-slate-600 text-white flex justify-between items-center py-4 px-4 md:px-8 2xl:px-20 w-full h-16 shadow-lg shadow-slate-500 backdrop-blur-sm'>
      <Link to='/'><h1 className='text-xl font-bold italic'>NotesApp</h1></Link>
      <div className={user ? 'hidden' : ''}>
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
      </div>
      <div className={!user ? 'hidden' : 'block'}>
        <div className='md:hidden'>
          <img src={hamburger} alt="hamburger" />
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
    </nav>
  );
}

export default Navbar