import { useContext } from 'react'
import Modal from './Modal'
import { NotesContext } from '../contexts/NotesContext'
import { toast } from 'react-toastify'

const FileUpdateModal = () => {
    const { setOpenFileUpdateModal, upateFileFunction } = useContext(NotesContext)

    const handleFileUpdate = async (e) => {
        console.log('inside update modal on change')
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('file', file)

        const res = await upateFileFunction(formData)

        if (res.data.success) {
            console.log(res)
            toast.success(res.data.message)
            setOpenFileUpdateModal(false)
        }
    }
    return (
        <Modal onClose={() => setOpenFileUpdateModal(false)} height={'max-h-[550px]'} width={'maax-w-[728px]'}>
            <h1 className="text-xl md:text-2xl text-center font-mono font-bold pt-8 mb-10">
                Notes : File update
            </h1>
            <div className='mb-10 h-10 rounded-xl hover:bg-blue-200 ms-3 transition-all duration-200 ease-in-out'>
                <input className="pt-2 cursor-pointer w-full h-full mx-auto text-sm file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium " name="file" type="file" accept=".png, .jpg, .jpeg, .pdf" onChange={handleFileUpdate} />
            </div>
        </Modal>
    )
}

export default FileUpdateModal