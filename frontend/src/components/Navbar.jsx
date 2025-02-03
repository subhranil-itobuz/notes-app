import React from 'react'
import { Link } from 'react-router-dom';
import hamburger from '../images/hamburger.svg'

const Navbar = () => {
  const user = false
  const userName = 'subhranil11'
  return (
    <nav className='bg-slate-600 text-white flex justify-between items-center py-4 px-4 w-full h-16'>
      <h1 className='text-xl font-bold italic'>NotesApp</h1>
      <div className={user ? 'hidden' : ''}>
        <div className='flex items-center gap-4'>
          <Link to='/login'>
            <button className='border border-gray-400 rounded-xl px-2 py-2 hover:bg-slate-400'>
              Login
            </button>
          </Link>
          <Link to='/signup'>
            <button className='border border-gray-400 rounded-xl px-2 py-2 hover:bg-slate-400'>
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
          <div className='flex items-center justify-between gap-16'>
            <ul className='flex justify-center items-center gap-14'>
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
            <div className={`flex justify-center items-center gap-10 `}>
              <p>Hello, <span className='text-green-300 cursor-pointer'>{userName}</span></p>
              <button className='border border-gray-400 rounded-xl px-2 py-2 hover:bg-slate-400'>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar