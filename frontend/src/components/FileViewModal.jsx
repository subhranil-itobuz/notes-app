import { useContext } from "react"
import Modal from "./Modal"
import { NotesContext } from "../contexts/NotesContext"

const FileViewModal = () => {
    const { setOpenFileViewModal, currentFileUrl } = useContext(NotesContext)
    return (
        <Modal onClose={() => setOpenFileViewModal(false)} height={'max-h-[550px]'} width={'maax-w-[728px]'}>
            <h1 className="text-xl md:text-2xl text-center font-mono font-bold pt-8 mb-10">Notes : File viewer</h1>
            <div className="max-w-[345px] mx-auto">
                <img src={currentFileUrl} alt="file image" />
            </div>
        </Modal>
    )
}

export default FileViewModal