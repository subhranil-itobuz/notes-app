import { useContext } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { NotesContext } from "../contexts/NotesContext";
import { toast } from "react-toastify";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaEye } from "react-icons/fa";



const NoteCard = ({ noteId, title, description, tag, fileUrl, createdAt, setOpenDeleteModal, setOpenUpdateModal }) => {

  const { setNoteId, setUpdatingNote, setFile, uploadFileFunction, setFileUrl, setOpenFileViewModal, originalFileName, setCurrentFileUrl } = useContext(NotesContext)

  const daysAgoFunction = (mongoDbTime) => {
    const createdAt = new Date(mongoDbTime)
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60))
  }

  const handleDeletion = () => {
    console.log('deleteIcon clicked')
    setOpenDeleteModal(true)
    setNoteId(noteId)
  }

  const handleUpdation = () => {
    console.log('edit icon clicked')
    setNoteId(noteId)
    setOpenUpdateModal(true)
    setUpdatingNote({
      title: title,
      description: description,
      tag: tag
    })
    console.log(title, description, tag)
  }

  const handleFileUpload = async (e) => {
    console.log('file upload icon clicked')
    const file = e.target.files[0]
    console.log(e.target.files)
    console.log(file)
    console.log(file?.name)
    setFile(file)
    setNoteId(noteId)

    const res = await uploadFileFunction()

    if (res?.data.success) {
      console.log(res)
      toast.success(res.data.message)
      setFileUrl(res.data.fileUrl)
    }
  }

  const handleFileView = () => {
    console.log('file view clicked')
    console.log(originalFileName)
    setOpenFileViewModal(true)
    setCurrentFileUrl(fileUrl)
  }

  return (
    <div className="border border-black rounded-2xl w-full lg:w-full h-72 bg-[#f2e9e4] hover:scale-105 transition-all delay-150 duration-300 ease-in-out cursor-pointer hover:shadow-2xl shadow-black">
      <div className="text-2xl text-center h-[14%] font-bold font-serif px-5">
        <h3 className="overflow-x-scroll no-scrollbar pt-1">{title}</h3>
      </div>
      <p className="text-justify text-xl px-5 h-[63%] border-y-2 border-y-red-400 py-2 overflow-y-auto font-serif">{description}</p>
      <div className="h-[13%] flex justify-between px-10 border-b border-b-gray-600">
        {
          fileUrl ? <div className="flex items-center" onClick={handleFileView} title="view file"><FaEye size={25} /></div> :
            <label htmlFor='fileUpload' className="hover:scale-105 flex justify-center items-center cursor-pointer" title="upload the file" >
              <MdOutlineFileUpload size={25} />
              <input type="file" accept=".png, .jpg, .jpeg, .pdf" name="fileUpload" id="fileUpload" className="hidden" onChange={handleFileUpload} />
            </label>
        }
        <div className="flex gap-6">
          <button className="hover:scale-105" onClick={handleUpdation}><MdModeEdit size={25} /></button>
          <button className="hover:scale-105" onClick={handleDeletion}><MdDelete size={25} /></button>
        </div>
      </div>
      <div className="flex justify-between items-center px-8 pt-1">
        <div className="text-sm capitalize">{tag}</div>
        <div className="text-right font-mono font-thin text-gray-600 text-sm">{daysAgoFunction(createdAt)} days ago</div>
      </div>
    </div>
  )
}

export default NoteCard