import { useContext } from 'react'
import { toast } from 'react-toastify'
import { NotesContext } from '../contexts/NotesContext'
import { MdDelete } from 'react-icons/md'
import Modal from './Modal'

const DeleteModal = ({openDeleteModal,setOpenDeleteModal}) => {

  const {allNotes,totalResults,setTotalResults,page,setPage,setNoteId,deleteNoteFunction} = useContext(NotesContext)

  const handleDeleteConfirmation = async () => {
    console.log('deleteConfirmBtn clicked')
    const res = await deleteNoteFunction()

    if (res.data.success) {
      toast.success(res.data.message)
      console.log('open modal value=>', openDeleteModal)
      setOpenDeleteModal(false)
      console.log(allNotes.length)

      totalResults % 6 === 1 && page > 1 ? setPage(page - 1) : ''
      totalResults === 1 ? setTotalResults(0) : ''
      setNoteId('')
    }
    else {
      toast.error(res.data.message)
    }

  }
  return (
    <Modal onClose={() => setOpenDeleteModal(false)} width={'w-full max-w-[700px]'}>
            <div className='w-[90%] mx-auto pt-5'>
              <h2 className='text-xl md:text-2xl font-serif font-bold text-center'>Are you sure you want to delete this note?</h2>
              <button className='flex items-center justify-center gap-2 mx-auto border border-red-600 px-5 py-2 rounded-full text-sm md:text-xl font-bold mt-10 hover:bg-red-500 hover:text-white transition-all ease-in-out duration-500' onClick={handleDeleteConfirmation}>
                <MdDelete size={25} />
                Delete
              </button>
            </div>
          </Modal>
  )
}

export default DeleteModal