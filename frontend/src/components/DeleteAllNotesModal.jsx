import { useContext } from 'react'
import { MdCancel, MdDelete } from 'react-icons/md'
import Modal from './Modal'
import { NotesContext } from '../contexts/NotesContext'
import { toast } from 'react-toastify'

const DeleteAllNotesModal = () => {
  const { setOpenDeleteAllNotesModal, deleteAllNotesFunction } = useContext(NotesContext)

  const handleDeleteAllConfirmation = async () => {
    console.log('inside delete confirm func in modal')
    const res = await deleteAllNotesFunction()

    if (res?.data.success) {
      console.log(res)
      setOpenDeleteAllNotesModal(false)
      toast.success(res.data.message)
    }
    else {
      console.log('else part of all delete')
      setOpenDeleteAllNotesModal(false)
    }
  }

  const handleCancelation = () => setOpenDeleteAllNotesModal(false)

  return (
    <Modal onClose={() => setOpenDeleteAllNotesModal(false)} width={'w-full max-w-[700px]'}>
      <div className='w-[90%] mx-auto pt-5'>
        <h2 className='text-xl md:text-2xl font-serif font-bold text-center'>
          Are you sure you want to delete all of your notes?
        </h2>
        <div className='text-sm md:text-xl flex flex-wrap-reverse mt-10 items-center justify-center gap-y-4 gap-x-5 sm:w-[300px] mx-auto'>
          <button className='rounded-full flex items-center justify-center gap-2 mx-auto px-5 py-2 font-bold border border-green-600 hover:bg-green-600 hover:text-white transition-all ease-in-out duration-500' onClick={handleCancelation}><MdCancel size={25} />Cancel</button>
          <button className='flex items-center justify-center gap-2 mx-auto border border-red-600 px-5 py-2 rounded-full  font-bold hover:bg-red-600 hover:text-white transition-all ease-in-out duration-500' onClick={handleDeleteAllConfirmation}>
            <MdDelete size={25} />
            Delete
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteAllNotesModal