import { CgNotes } from "react-icons/cg";
import { IoMdAddCircle } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoCaretBack } from "react-icons/io5";
import { FaCaretRight } from "react-icons/fa";




import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { NotesContext } from "../contexts/NotesContext";
import NoteCard from '../components/NoteCard'


const Notes = () => {
  const [allNotes, setAllNotes] = useState([])

  const { getAllNotesFunction } = useContext(NotesContext)
  useEffect(() => {
    const getAllNotes = async () => {
      const allNotes = await getAllNotesFunction()
      console.log(allNotes)
      setAllNotes(allNotes)
    }
    getAllNotes()
  }, [])

  return (
    <div className="border-t-4 border-opacity-65 border-green-700 py-7">
      <div className="flex justify-between flex-col gap-5 w-2/3 mx-auto">
        <div className="flex flex-wrap gap-y-2 justify-between w-full">
          <Link to='/notes/create' className="border border-green-500 px-10 py-3 rounded-md w-full md:w-[47%] text-xl hover:bg-green-200">
            <button className="flex justify-center items-center gap-2 mx-auto">
              <IoMdAddCircle size={25} />
              Add Note
            </button>
          </Link>
          <Link to='/notes/create' className="border border-blue-500 px-6 md:px-10 py-3 rounded-md w-full md:w-[47%] flex justify-center items-center gap-2 text-xl hover:bg-blue-200">
            <button className="flex justify-center items-center gap-2 mx-auto">
              <FaEye size={25} />
              View all (100)
            </button>
          </Link>
        </div>
        <div className="w-full border border-black rounded-lg flex items-center gap-1 py-3 px-2">
          <span className="w-6"><FaSearch size={25} /></span>
          <input type="text" placeholder="search note" className="w-[87%] focus:outline-none px-2 text-xl" />
        </div>
      </div>
      <div className="flex justify-between items-center px-2 2xl:px-16 mt-14 mb-8 sticky top-0 backdrop-blur-md text-xl md:text-2xl lg:w-[96%] lg:mx-auto border-b-2 border-b-slate-500">
        <button className="flex gap-1 items-center border border-slate-400 rounded-3xl pr-1 md:px-3 hover:bg-gray-300">
          <IoCaretBack />
          Back
        </button>
        <h1 className="text-2xl sm:text-3xl 2xl:text-4xl font-serif font-semibold py-4 flex justify-center items-center gap-1 sm:gap-3"><CgNotes />Notes (6)</h1>
        <button className="flex gap-1 items-center border border-slate-400 rounded-3xl pl-1 md:px-3 hover:bg-gray-300">
          Next
          <FaCaretRight />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-y-5 gap-x-2 px-2 mx-auto">
        {allNotes.map((element) => {
          return (
          <NoteCard key={element._id} title={element.title} description={element.description} createdAt={element.createdAt} />
        )
        })}
      </div>
    </div>
  )
}

export default Notes