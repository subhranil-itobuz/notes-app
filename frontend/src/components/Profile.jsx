import { useContext } from 'react'
import profilePicture from '../assets/profilePicture.jpg'
import { UserContext } from '../contexts/UserContext'
import { FaEdit } from "react-icons/fa";


const Profile = () => {

  const { user } = useContext(UserContext)

  return (
    <div className="border border-slate-600 flex flex-wrap justify-center items-center gap-6 w-[90%] 2xl:w-[50%] mx-auto my-5 py-4 rounded-2xl">
      <div className='px-10 md:px-5'>
        <img src={profilePicture} alt="profile picture" className='rounded-full w-36 h-36 bg-black overflow-hidden mx-auto' />
      </div>
      <div className='flex justify-center items-center flex-wrap gap-5 md:gap-10 px-6'>
        <div className='flex flex-col text-center md:text-left'>
          <h1 className='mt-2 text-xl 2xl:text-3xl font-bold'>{user?.userName}</h1>
          <div className='mt-2 mb-3 text-lg 2xl:text-xl font-medium break-all'>{user?.email}</div>
        </div>
        <button className='border border-black py-2 px-4 text-center rounded-lg hover:bg-slate-100 transition-all ease-in-out'>
          <FaEdit size={20} />
        </button>
      </div>
    </div>
  )
}

export default Profile