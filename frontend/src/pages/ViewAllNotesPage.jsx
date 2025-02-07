import { FaSearch } from "react-icons/fa";
import NoteCard from '../components/NoteCard'
import { useContext, useEffect, } from "react";
import { NotesContext } from "../contexts/NotesContext";
import { CgNotes } from "react-icons/cg";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import DeleteModal from "../components/DeleteModal";
import UpdateModal from "../components/UpdateModal";



const ViewAllNotesPage = () => {
    const { getAllUserNotesFunction, allUserNotes, setAllUserNotes, keyword, setKeyword, sortBy, setSortBy, order, sortOrder, openDeleteModal, setOpenDeleteModal, openUpdateModal, setOpenUpdateModal } = useContext(NotesContext)

    useEffect(() => {
        const getAllUserNotes = async () => {
            const res = await getAllUserNotesFunction()

            if (res?.data.success) {
                console.log(res)
                setAllUserNotes(res.data.data)
            }
            else {
                console.log('inside useeffect else')
                setAllUserNotes([])
            }
        }

        getAllUserNotes()

        // eslint-disable-next-line  
    }, [keyword, sortBy, order, openDeleteModal, openUpdateModal])

    const handleSearch = (e) => {
        console.log(e.target.value)
        setKeyword(e.target.value)
    }

    const handleSortingBy = (e) => {
        console.log('inside sorting type function')
        console.log(e.target.value)
        setSortBy(e.target.value)
    }

    const handleSortOrder = async (e) => {
        console.log('inside sort order func')
        console.log(e.target.value)
        sortOrder(e.target.value)
    }

    return (
        <div>
            <Navbar />
            <div className="w-full relative pt-10 px-4">
                <Link to='/notes/create' className="fixed bottom-5 right-5 z-20">
                    <div className="rounded-full p-4 bg-blue-300 hover:bg-blue-500 hover:text-white hover:scale-105 transition-all duration-300 ease-in-out">
                        <button className="flex items-center">
                            <RiStickyNoteAddLine size={33} />
                        </button>
                    </div>
                </Link>
                <h1 className="text-3xl text-center font-bold font-mono">View Your All Notes Here</h1>

                <div className="flex items-center max-w-[900px] mx-auto gap-3 my-10 border border-blue-500 rounded-full px-5 py-3">
                    <span className="w-10"><FaSearch size={30} /></span>
                    <input type="search" placeholder="Search note" className="w-full h-full focus:outline-none text-2xl" onInput={handleSearch} defaultValue={keyword} />
                </div>

                <section className="w-full text-lg flex flex-wrap justify-center gap-y-4 gap-x-10 md:gap-x-5 md:px-10">
                    <div className="border border-blue-600 rounded-xl px-5 py-2">
                        <select className="focus:outline-none w-full cursor-pointer" onChange={handleSortingBy}>
                            <option value="" title="default">Sort By</option>
                            <option value="title">Title</option>
                            <option value="tag">Tag</option>
                            <option value="createdAt">Created time</option>
                        </select>
                    </div>
                    <div className="border border-blue-600 rounded-xl px-5 py-2">
                        <select className="focus:outline-none w-full cursor-pointer" onChange={handleSortOrder}>
                            <option value="" title="default">Order</option>
                            <option value="dsc">Asc to Dsc</option>
                            <option value="asc">Dsc to Asc</option>
                        </select>
                    </div>
                </section>

                <h3 className="text-2xl 2xl:text-3xl my-8 text-center font-mono font-semibold border-y-2 border-y-slate-700 py-5 text-sky-800 flex justify-center items-center gap-1 sm:gap-3 sticky top-0 backdrop-blur-lg z-20">
                    <CgNotes /><span>Notes ({allUserNotes.length})</span>
                </h3>

                {
                    allUserNotes?.length > 0 ? <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
                        {
                            allUserNotes?.map((element) => {
                                return (
                                    <NoteCard
                                        key={element._id}
                                        noteId={element._id}
                                        title={element.title}
                                        description={element.description}
                                        tag={element.tag}
                                        createdAt={element.createdAt}
                                        openDeleteModal={openDeleteModal}
                                        setOpenDeleteModal={setOpenDeleteModal}
                                        openUpdateModal={openUpdateModal}
                                        setOpenUpdateModal={setOpenUpdateModal}
                                    />
                                )
                            })
                        }
                    </section> :
                        <div className="text-2xl px-2 my-16 text-orange-700 font-mono font-bold text-center">No notes to display</div>
                }

            </div>
            {
                openDeleteModal && <DeleteModal openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal} />
            }
            {
                openUpdateModal && <UpdateModal openUpdateModal={openUpdateModal} setOpenUpdateModal={setOpenUpdateModal} />
            }
        </div>
    )
}

export default ViewAllNotesPage