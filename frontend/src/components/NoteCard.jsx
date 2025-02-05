import { MdDelete, MdModeEdit, MdOutlineAttachFile } from "react-icons/md";

const NoteCard = ({ title, description, createdAt }) => {
  return (
    <div className="border border-black rounded-2xl w-full lg:w-[300px] h-64 bg-[#f2e9e4] hover:scale-105 transition-all delay-150 duration-300 ease-in-out cursor-pointer">
      <h3 className="text-2xl text-center h-[16%] font-bold font-serif">{title}</h3>
      <p className="text-justify text-xl px-5 h-[60%] border-y-2 border-y-red-400 pt-2  overflow-hidden text-ellipsis font-serif">
        {description}      </p>
      <div className="h-[15%] flex justify-between px-10 border-b border-b-gray-600">
        <button className="hover:scale-105"><MdOutlineAttachFile size={25} /></button>
        <div className="flex gap-6">
          <button className="hover:scale-105"><MdModeEdit size={25} /></button>
          <button className="hover:scale-105"><MdDelete size={25} /></button>
        </div>
      </div>
      <div className="text-center font-mono font-thin text-gray-600">{createdAt}
      </div>
    </div>
  )
}

export default NoteCard