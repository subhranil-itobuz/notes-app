import { useContext, useEffect } from 'react'
import { UserContext } from '../contexts/UserContext'
import { NotesContext } from '../contexts/NotesContext'



const Profile = () => {

  const { setOpenUserNameUpdateModal, setOpenPasswordUpdateModal, setOpenProfilePhotoUpdateModal } = useContext(UserContext)
  const { setOpenDeleteAllNotesModal, totalResults } = useContext(NotesContext)

  const { user } = useContext(UserContext)

  useEffect(() => { console.log('use effect called') }, [])

  const handleUserNameChange = () => {
    console.log('username change button clicked')
    setOpenUserNameUpdateModal(true)
  }

  const handlePasswordChange = () => {
    console.log('password change button clicked')
    setOpenPasswordUpdateModal(true)
  }

  const handleDeleteAllNotes = () => {
    console.log('delete all notes button clicked')
    setOpenDeleteAllNotesModal(true)
  }

  const handleProfilePictureChange = () => {
    console.log('change handle profile picture btn clicked')
    setOpenProfilePhotoUpdateModal(true)
  }

  return (
    <div className="border border-slate-600 flex flex-col justify-center items-center gap-6 mx-5 md:mx-auto md:max-w-[40%] my-10 pt-10 pb-8 rounded-2xl shadow-sm shadow-fuchsia-300">
      <div className='rounded-full w-40 h-40 bg-gray-200 flex justify-center items-center cursor-pointer' onClick={handleProfilePictureChange}>
        {
          user?.profilePicture ?
            <img src={user?.profilePicture} alt="profile picture" className='bg-white overflow-hidden mx-auto rounded-full w-full h-full' />
            :
            <button className='text-blue-600 hover:font-semibold' onClick={handleProfilePictureChange}>Add Profile photo</button>
        }
      </div>
      <div className='flex justify-center items-center flex-col gap-5 md:gap-10 px-6 text-white'>
        <div className='flex flex-col text-center'>
          <h1 className='mt-2 text-xl 2xl:text-3xl font-bold'>{user?.userName}</h1>
          <div className='mt-2 mb-3 text-lg 2xl:text-xl font-medium break-all'>{user?.email}</div>

        </div>
        <div className='flex flex-col items-center text-sm text-orange-400 gap-3'>
          <button className='hover:text-orange-600' onClick={handleUserNameChange}>Change Username</button>
          <button className='hover:text-orange-600' onClick={handlePasswordChange}>Change Password</button>
          <button className='hover:text-orange-600' onClick={handleProfilePictureChange}>Change Profile picture</button>
        </div>
        <button className='bg-red-500 text-sm lg:text-xl text-white px-6 md:px-10 py-2 rounded-lg mb-5 hover:bg-red-600 disabled:bg-opacity-70 disabled:cursor-not-allowed' onClick={handleDeleteAllNotes} disabled={totalResults === 0 ? true : false}>
          Delete All Notes ({totalResults})
        </button>
      </div>
    </div>
  )
}

export default Profile