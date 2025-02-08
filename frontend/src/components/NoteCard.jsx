import { useContext } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { NotesContext } from "../contexts/NotesContext";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { Link } from "react-router-dom";
import { GrDocumentUpdate } from "react-icons/gr";





const NoteCard = ({ id, title, description, tag, fileUrl, createdAt, setOpenDeleteModal, setOpenUpdateModal }) => {

  const { setNoteId, setUpdatingNote, uploadFileFunction, setFileUrl, setOpenFileViewModal, setOpenFileUpdateModal, setOpenFileDeleteModal, setCurrentFileUrl } = useContext(NotesContext)

  const daysAgoFunction = (mongoDbTime) => {
    const createdAt = new Date(mongoDbTime)
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60))
  }

  const handleDeletion = () => {
    console.log('deleteIcon clicked')
    setOpenDeleteModal(true)
    setNoteId(id)
  }

  const handleUpdation = () => {
    console.log('edit icon clicked')
    console.log('note id = ', id, title)
    setNoteId(id)
    setOpenUpdateModal(true)
    setUpdatingNote({
      title: title,
      description: description,
      tag: tag
    })
    console.log(title, description, tag)
  }

  const settingId = () => {
    console.log('note id set to = ', id)
    setNoteId(id)
  }

  const handleFileUpload = async (e) => {
    console.log('file upload change')

    const file = e.target.files[0]

    console.log(e.target.files)
    console.log(file)
    console.log(file?.name)

    const formData = new FormData()
    formData.append('file', file)

    const res = await uploadFileFunction(formData)

    if (res?.data.success) {
      console.log(res)
      toast.success(res.data.message)
      setFileUrl(res.data.fileUrl)
      setNoteId()
    }
  }

  const handleFileView = () => {
    console.log('file view clicked')
    setOpenFileViewModal(true)
    setCurrentFileUrl(fileUrl)
  }

  const handleFileUploadModal = () => {
    console.log('file update button clicked', id)
    setOpenFileUpdateModal(true)
    setNoteId(id)
  }

  const handleFileDelete = () => {
    console.log('file delete icon clicked')
    setNoteId(id)
    setOpenFileDeleteModal(true)
  }

  return (
    <div className="border border-black rounded-2xl w-full lg:w-full h-72 bg-[#f2e9e4] hover:scale-105 transition-all delay-150 duration-300 ease-in-out cursor-pointer hover:shadow-2xl shadow-black">
      <div className="text-2xl text-center h-[14%] font-bold font-serif flex justify-between items-center">
        <button className="hover:scale-105 ps-2" title="Edit Note" onClick={handleUpdation}><MdModeEdit size={25} /></button>

        <h3 className="overflow-x-scroll no-scrollbar pt-1 px-1">{title}</h3>

        <button className="hover:scale-105 pe-2" title="Delete Note" onClick={handleDeletion}><MdDelete size={25} /></button>
      </div>
      <p className="text-justify text-xl px-5 h-[63%] border-y-2 border-y-red-400 py-2 overflow-y-auto no-scrollbar  font-serif break-words">{description}</p>
      <div className="h-[13%] w-full flex justify-center border-b border-b-gray-600">
        {
          fileUrl ?
            <div className="flex items-center justify-center gap-10">
              {
                fileUrl.includes('.pdf')
                  ? <Link to={fileUrl} target="_blank"><span title="view file"><FaEye size={25} /></span></Link>
                  : <span title="view file" onClick={handleFileView}><FaEye size={25} /></span>
              }
              <span title="Download file">
                <Link to={fileUrl} target="_blank" download >
                  <IoMdDownload size={25} />
                </Link>
              </span>
              <span title="Update file">
                <GrDocumentUpdate size={25} onClick={handleFileUploadModal} />
              </span>
              <span><MdDelete size={25} onClick={handleFileDelete} /></span>
            </div>
            :
            <input className="cursor-pointer w-full mx-auto px-6 text-sm pt-1 transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium " name="file" type="file" accept=".png, .jpg, .jpeg, .pdf" onClick={settingId} onChange={handleFileUpload} />

        }
      </div>
      <div className="flex justify-between items-center px-8 pt-1">
        <div className="text-sm capitalize">{tag}</div>
        <div className="text-right font-mono font-thin text-gray-600 text-sm">{daysAgoFunction(createdAt)} days ago</div>
      </div>
    </div >
  )
}

export default NoteCard