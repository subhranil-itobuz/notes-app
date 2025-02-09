import { useContext } from 'react'
import profilePicture from '../assets/profilePicture.jpg'
import { UserContext } from '../contexts/UserContext'


const Profile = () => {

  const { user } = useContext(UserContext)

  return (
    <div className="border border-slate-600 flex flex-col justify-center items-center gap-6 mx-10 md:mx-auto md:max-w-[40%] my-5 py-5 rounded-2xl shadow-sm shadow-fuchsia-300">
      <div className='px-10 md:px-5'>
        <img src={profilePicture} alt="profile picture" className='rounded-full w-36 h-36 bg-black overflow-hidden mx-auto' />
      </div>
      <div className='flex justify-center items-center flex-col gap-5 md:gap-10 px-6 text-white'>
        <div className='flex flex-col text-center'>
          <h1 className='mt-2 text-xl 2xl:text-3xl font-bold'>{user?.userName}</h1>
          <div className='mt-2 mb-3 text-lg 2xl:text-xl font-medium break-all'>{user?.email}</div>

        </div>
        <div className='flex flex-col items-start text-sm text-start text-orange-400 gap-3'>
          <button className='hover:text-orange-600'>Change Username</button>
          <button className='hover:text-orange-600'>Change Password</button>
        </div>
        <button className='bg-red-500 text-sm lg:text-xl text-white px-10 py-2 rounded-lg mb-5 hover:bg-red-600'>
          Delete All Notes
        </button>
      </div>
    </div>
  )
}

export default Profile