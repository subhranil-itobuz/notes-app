import { MdDelete, MdModeEdit, MdOutlineAttachFile } from "react-icons/md";

const NoteCard = ({ title, description, tag, createdAt, openModal, setOpenModal }) => {

  const daysAgoFunction = (mongoDbTime) => {
    const createdAt = new Date(mongoDbTime)
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60))
  }

  const handleDeletion = () => {
    console.log('inside delete')
    setOpenModal(true)
    console.log(openModal)
  }

  return (
    <div className="border border-black rounded-2xl w-full lg:w-full h-72 bg-[#f2e9e4] hover:scale-105 transition-all delay-150 duration-300 ease-in-out cursor-pointer hover:shadow-2xl shadow-black">
      <div className="text-2xl text-center h-[14%] font-bold font-serif px-5">
        <h3 className="overflow-x-scroll no-scrollbar pt-1">{title}</h3>
      </div>
      <p className="text-justify text-xl px-5 h-[63%] border-y-2 border-y-red-400 py-2 overflow-y-auto font-serif">{description}</p>
      <div className="h-[13%] flex justify-between px-10 border-b border-b-gray-600">
        <button className="hover:scale-105"><MdOutlineAttachFile size={25} /></button>
        <div className="flex gap-6">
          <button className="hover:scale-105"><MdModeEdit size={25} /></button>
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