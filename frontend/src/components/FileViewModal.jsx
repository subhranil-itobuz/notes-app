import { useContext } from "react"
import Modal from "./Modal"
import { NotesContext } from "../contexts/NotesContext"

const FileViewModal = () => {
    const { setOpenFileViewModal, currentFileUrl } = useContext(NotesContext)
    return (
        <Modal onClose={() => setOpenFileViewModal(false)} height={'h-[80%]'} width={'w-[70%]'}>
            <h1 className="text-xl md:text-2xl 2xl:text-3xl text-center font-mono font-bold pt-8 mb-10 border-b-2 border-b-slate-800 pb-3">Notes : File viewer</h1>
            <div className=" object-fill mx-auto">
                <img src={currentFileUrl} alt="file image" className="w-full h-full" />
            </div>
        </Modal>
    )
}

export default FileViewModal