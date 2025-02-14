import { useContext } from "react"
import { toast } from "react-toastify"
import { MdCancel, MdDelete } from "react-icons/md"

import { NotesContext } from "../contexts/NotesContext"
import Modal from "./Modal"


const FileDeleteModal = () => {
    const { setOpenFileDeleteModal, deleteFileFunction } = useContext(NotesContext)

    const handleFileDeleteConfirmation = async () => {
        const res = await deleteFileFunction()

        if (res.data.success) {
            toast.success(res.data.message)
            setOpenFileDeleteModal(false)
        }
    }

    const handleCancelation = () => {
        setOpenFileDeleteModal(false)
    }
    return (
        <Modal onClose={() => setOpenFileDeleteModal(false)} width={'w-full max-w-[700px]'}>
            <div className='w-[90%] mx-auto pt-5'>
                <h2 className='text-xl md:text-2xl font-serif font-bold text-center'>Are you sure you want to delete this file from note?</h2>
                <div className='text-sm md:text-xl flex flex-wrap-reverse mt-10 items-center justify-center gap-y-4 gap-x-5 sm:w-[300px] mx-auto'>
                    <button className='rounded-full flex items-center justify-center gap-2 mx-auto px-5 py-2 font-bold border border-green-600 hover:bg-green-600 hover:text-white transition-all ease-in-out duration-500' onClick={handleCancelation}><MdCancel size={25} />Cancel</button>
                    <button className='flex items-center justify-center gap-2 mx-auto border border-red-600 px-5 py-2 rounded-full  font-bold hover:bg-red-600 hover:text-white transition-all ease-in-out duration-500' onClick={handleFileDeleteConfirmation}>
                        <MdDelete size={25} />
                        Delete
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default FileDeleteModal