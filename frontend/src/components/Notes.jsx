import { useContext, useEffect, useRef } from "react";
import { CgNotes } from "react-icons/cg";
import { IoMdAddCircle } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoCaretBack } from "react-icons/io5";
import { FaCaretRight } from "react-icons/fa";
import { Link } from "react-router-dom";


import { NotesContext } from "../contexts/NotesContext";
import NoteCard from '../components/NoteCard'
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";
import FileViewModal from "./FileViewModal";
import FileUpdateModal from "./FileUpdateModal";
import FileDeleteModal from "./FileDeleteModal";



const Notes = () => {
  const paginationRef = useRef(null)
  const backBtnRef = useRef(null)
  const nextBtnRef = useRef(null)

  const { getAllNotesFunction, totalResults, pageNotes, setPageNotes, keyword, setKeyword, page, setPage, limit, setLimit, openDeleteModal, setOpenDeleteModal, openUpdateModal, setOpenUpdateModal, openFileViewModal, openFileUpdateModal, openFileDeleteModal, setOpenFileDeleteModal, fileUrl } = useContext(NotesContext)

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
  }, [page, keyword, limit, openDeleteModal, openUpdateModal, openFileUpdateModal, openFileDeleteModal, fileUrl])

  const increasePageNumber = () => {
    setPage(page + 1)
  }

  const decreasePageNumber = () => {
    setPage(page - 1)
  }

  const handleSearch = (e) => {
    setKeyword(e.target.value.trim())
    setPage(0)
    setLimit(0)
    paginationRef.current.style.visibility = 'hidden'
    backBtnRef.current.style.visibility = 'hidden'
    nextBtnRef.current.style.visibility = 'hidden'

    if (e.target.value === '') {
      setLimit(6)
      setPage(1)
      paginationRef.current.style.visibility = 'visible'
      backBtnRef.current.style.visibility = 'visible'
      nextBtnRef.current.style.visibility = 'visible'
    }
  }

  return (
    <div className="py-10">
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
        <div className="w-full h-14 border border-black rounded-lg flex items-center gap-1 px-2">
          <span className="w-6"><FaSearch size={25} /></span>
          <input type="search" placeholder="search note" className="w-[95%] h-full focus:outline-none px-2 text-xl disabled:opacity-50" disabled={totalResults === 0 ? true : false} onInput={handleSearch} defaultValue={keyword} />
        </div>
      </div>

      <div className="flex justify-between items-center px-2 2xl:px-16 my-4 sticky top-0 z-10 backdrop-blur-md text-xl md:text-2xl lg:w-[96%] lg:mx-auto border-b-2 border-b-slate-500">
        <button className="flex gap-1 items-center border border-slate-400 rounded-3xl pr-1 md:px-3 bg-green-200 hover:bg-green-300 disabled:opacity-25 disabled:cursor-not-allowed" disabled={page <= 1 || pageNotes.length > 6 ? true : false} onClick={decreasePageNumber} ref={backBtnRef}>
          <IoCaretBack />
          Back
        </button>

        <div className="flex flex-col items-center gap-3 py-2">
          <h1 className="text-2xl sm:text-3xl 2xl:text-4xl font-serif font-semibold flex justify-center items-center gap-1 sm:gap-3"><CgNotes /><span>Notes ({pageNotes.length})</span></h1>
          <span className="text-slate-400 border-y border-y-red-200 px-4 text-base font-mono font-thin bg-white rounded-full" ref={paginationRef}>
            Page {page} of {totalResults === 0 ? 1 : Math.ceil(totalResults / 6)}
          </span>
        </div>

        <button className="flex gap-1 items-center border border-slate-400 rounded-3xl pl-1 md:px-3 bg-sky-200 hover:bg-sky-300 disabled:opacity-25 disabled:cursor-not-allowed" disabled={page === Math.ceil(totalResults / 6) || pageNotes.length === totalResults || pageNotes.length < 6 || totalResults === 6 ? true : false} onClick={increasePageNumber} ref={nextBtnRef}>
          Next
          <FaCaretRight />
        </button>
      </div>
      {
        pageNotes.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-y-7 lg:gap-y-9 gap-x-2 sm:gap-x-7 px-6 sm:px-8 lg:px-10 mx-auto">
          {pageNotes?.map((element) => {
            return (
              <NoteCard
                key={element._id}
                id={element._id}
                title={element.title}
                description={element.description}
                tag={element.tag}
                fileUrl={element.fileUrl}
                createdAt={element.createdAt}
                openDeleteModal={openDeleteModal}
                setOpenDeleteModal={setOpenDeleteModal}
                openUpdateModal={openUpdateModal}
                setOpenUpdateModal={setOpenUpdateModal} />
            )
          })
          }
        </div> :
          <div className="text-center text-2xl font-bold text-red-400 font-mono px-5">No Notes to display</div>
      }
      {
        openDeleteModal && <DeleteModal openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal} />
      }
      {
        openUpdateModal && <UpdateModal openUpdateModal={openUpdateModal} setOpenUpdateModal={setOpenUpdateModal} />
      }
      {
        openFileViewModal && <FileViewModal />
      }
      {
        openFileUpdateModal && <FileUpdateModal />
      }
      {
        openFileDeleteModal && <FileDeleteModal openFileDeleteModal={openFileDeleteModal} setOpenFileDeleteModal={setOpenFileDeleteModal} />
      }
    </div >
  )
}

export default Notes