import { useContext } from 'react'
import { MdCancel, MdDelete } from 'react-icons/md'
import Modal from './Modal'
import { AdminContext } from '../contexts/AdminContext'
import { toast } from 'react-toastify'

const UserDeleteModal = () => {
  const { setOpenUserDeleteModal, deleteUser } = useContext(AdminContext)


  const handleDeleteUserConfirmation = async () => {
    const res = await deleteUser()

    if (res.data.success) {
      toast.success(res.data.message)
      setOpenUserDeleteModal(false)
    }
  }

  const handleCancellation = () => setOpenUserDeleteModal(false)

  return (
    <Modal onClose={() => setOpenUserDeleteModal(false)} width={'w-full max-w-[700px]'}>
      <div className='w-[90%] mx-auto pt-5'>
        <h2 className='text-xl md:text-2xl font-serif font-bold text-center'>Are you sure you want to delete this user?</h2>
        <div className='text-sm md:text-xl flex flex-wrap-reverse mt-10 items-center justify-center gap-y-4 gap-x-5 sm:w-[300px] mx-auto'>
          <button className='rounded-full flex items-center justify-center gap-2 mx-auto px-5 py-2 font-bold border border-green-600 hover:bg-green-600 hover:text-white transition-all ease-in-out duration-500' onClick={handleCancellation}><MdCancel size={25} />Cancel</button>
          <button className='flex items-center justify-center gap-2 mx-auto border border-red-600 px-5 py-2 rounded-full  font-bold hover:bg-red-600 hover:text-white transition-all ease-in-out duration-500' onClick={handleDeleteUserConfirmation}>
            <MdDelete size={25} />
            Delete
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default UserDeleteModal