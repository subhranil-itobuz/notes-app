import { useContext } from 'react'
import Modal from './Modal'
import { UserContext } from '../contexts/UserContext'
import { toast } from 'react-toastify'

const ProfilePictureUpdateModal = () => {
  const { setOpenProfilePhotoUpdateModal, profilePictureUpdateFunction } = useContext(UserContext)

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('profilePicture', file)

    const res = await profilePictureUpdateFunction(formData)

    if (res.data.success) {
      toast.success(res.data.message)
      setOpenProfilePhotoUpdateModal(false)
    }

  }
  return (
    <Modal onClose={() => setOpenProfilePhotoUpdateModal(false)} height={'max-h-[550px]'} width={'maax-w-[728px]'}>
      <h1 className="text-xl md:text-2xl text-center font-mono font-bold pt-8 mb-10">
        Update Profile Picture
      </h1>
      <div className='mb-10 h-10 rounded-xl hover:bg-blue-200 ms-3 transition-all duration-200 ease-in-out'>
        <input className="pt-2 cursor-pointer w-full h-full mx-auto text-sm file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium " name="file" type="file" accept=".png, .jpg, .jpeg, .pdf" onChange={handleProfilePictureChange} />
      </div>
    </Modal>
  )
}

export default ProfilePictureUpdateModal