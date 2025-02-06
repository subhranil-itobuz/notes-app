import { useContext, useEffect, useRef, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { IoMdAddCircle } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoCaretBack } from "react-icons/io5";
import { FaCaretRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";


import { NotesContext } from "../contexts/NotesContext";
import NoteCard from '../components/NoteCard'
import Modal from './Modal'
import { toast } from "react-toastify";


const Notes = () => {
  const backBtnRef = useRef(null)
  const nextBtnRef = useRef(null)
  const [openModal, setOpenModal] = useState()
  const [pageNotes, setPageNotes] = useState([])
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(6)

  const { getAllNotesFunction, totalResults, setTotalResults, deleteNoteFunction, allNotes } = useContext(NotesContext)

  useEffect(() => {
    const getAllNotes = async () => {
      const res = await getAllNotesFunction(keyword, page, limit)
      if (res?.data.success) {
        console.log(res)
        setPageNotes(res?.data.data)
      }
      else {
        console.log('useeffect else')
        setPageNotes([])
      }
    }
    getAllNotes()

    // eslint-disable-next-line  
  }, [page, keyword, limit, openModal])

  const increasePageNumber = () => {
    setPage(page + 1)
  }

  const decreasePageNumber = () => {
    setPage(page - 1)
  }

  const handleSearch = (e) => {
    setKeyword(e.target.value)
    setPage(0)
    setLimit(0)
    backBtnRef.current.style.visibility = 'hidden'
    nextBtnRef.current.style.visibility = 'hidden'

    if (e.target.value === '') {
      setLimit(6)
      setPage(1)
      backBtnRef.current.style.visibility = 'visible'
      nextBtnRef.current.style.visibility = 'visible'
    }
  }

  const handleDeleteConfirmations = async () => {
    console.log('deleteConfirmBtn clicked')
    const res = await deleteNoteFunction()

    if (res.data.success) {
      toast.success(res.data.message)
      console.log('open modal value=>', openModal)
      setOpenModal(false)
      console.log(allNotes.length)

      totalResults % 6 === 1 && page > 1 ? setPage(page - 1) : ''
      totalResults === 1 ? setTotalResults(0) : ''
    }
    else {
      toast.error(res.data.message)
    }

  }

  return (
    <div className="border-t-4 border-opacity-65 border-green-700 py-7">
      <div className="flex justify-between flex-col gap-5 w-2/3 mx-auto">
        <div className="flex flex-wrap gap-y-2 justify-between w-full">
          <Link to='/notes/create' className="border border-green-500 rounded-md w-full md:w-[47%] h-12 text-xl hover:bg-green-200">
            <button className="flex justify-center items-center gap-2 mx-auto w-full h-full">
              <IoMdAddCircle size={25} />
              Add Note
            </button>
          </Link>
          <Link to='/notes/view' className="border border-blue-500 rounded-md w-full md:w-[47%] h-12 flex justify-center items-center gap-2 text-xl hover:bg-blue-200">
            <button className="w-full h-full flex justify-center items-center gap-2 mx-auto disabled:opacity-25 disabled:cursor-not-allowed" disabled={totalResults === 0 ? true : false}>
              <FaEye size={25} />
              View all ({totalResults})
            </button>
          </Link>
        </div>
        <div className="w-full border border-black rounded-lg flex items-center gap-1 py-3 px-2">
          <span className="w-6"><FaSearch size={25} /></span>
          <input type="search" placeholder="search note" className="w-[95%] h-full focus:outline-none px-2 text-xl disabled:opacity-50" disabled={totalResults === 0 ? true : false} onInput={handleSearch} />
        </div>
      </div>
      <div className="flex justify-between items-center px-2 2xl:px-16 mt-14 mb-8 sticky top-0 z-10 backdrop-blur-md text-xl md:text-2xl lg:w-[96%] lg:mx-auto border-b-2 border-b-slate-500">
        <button className="flex gap-1 items-center border border-slate-400 rounded-3xl pr-1 md:px-3 bg-green-200 hover:bg-green-300 disabled:opacity-25 disabled:cursor-not-allowed" disabled={page === 1 || pageNotes.length > 6 ? true : false} onClick={decreasePageNumber} ref={backBtnRef}>
          <IoCaretBack />
          Back
        </button>

        <h1 className="text-2xl sm:text-3xl 2xl:text-4xl font-serif font-semibold py-4 flex justify-center items-center gap-1 sm:gap-3"><CgNotes /><span>Notes ({pageNotes.length})</span></h1>

        <button className="flex gap-1 items-center border border-slate-400 rounded-3xl pl-1 md:px-3 bg-sky-200 hover:bg-sky-300 disabled:opacity-25 disabled:cursor-not-allowed" disabled={page === Math.ceil(totalResults / 6) || pageNotes.length === totalResults || pageNotes.length < 6 || totalResults === 6 ? true : false} onClick={increasePageNumber} ref={nextBtnRef}>
          Next
          <FaCaretRight />
        </button>
      </div>
      {
        pageNotes.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-y-7 lg:gap-y-9 gap-x-2 sm:gap-x-7 px-6 sm:px-8 lg:px-10 mx-auto">
          {pageNotes?.map((element) => {
            return (
              <NoteCard key={element._id} noteId={element._id} title={element.title} description={element.description} tag={element.tag} createdAt={element.createdAt} openModal={openModal} setOpenModal={setOpenModal} />
            )
          })
          }
        </div> :
          <div className="text-center text-2xl font-bold text-red-400 font-mono px-5">No Notes to display</div>
      }
      {
        openModal && (
          <Modal onClose={() => setOpenModal(false)}>
            <div className='w-[90%] mx-auto pt-5'>
              <h2 className='text-xl md:text-2xl font-serif font-bold text-center'>Are you sure you want to delete this note?</h2>
              <button className='flex items-center justify-center gap-2 mx-auto border border-red-600 px-5 py-2 rounded-full text-sm md:text-xl font-bold mt-10 hover:bg-red-500 hover:text-white transition-all ease-in-out duration-500' onClick={handleDeleteConfirmations}>
                <MdDelete size={25} />
                Delete
              </button>
            </div>
          </Modal>
        )
      }
    </div >
  )
}

export default Notes