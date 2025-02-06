import { FaSearch } from "react-icons/fa";
import NoteCard from '../components/NoteCard'
import BackToHome from '../components/BackToHome'


const ViewAllNotesPage = () => {
    return (
        <div className="w-full px-5 py-10">
            <BackToHome/>
            <h1 className="text-3xl text-center font-bold font-mono">View Your All Notes Here</h1>
            <div className="flex items-center max-w-[900px] mx-auto gap-3 my-10 border border-blue-500 rounded-full px-5 py-3">
                <span className="w-10"><FaSearch size={30}/></span>
                <input type="search" placeholder="Search note" className="w-full h-full focus:outline-none text-2xl" />
            </div>
            <section className="w-full text-lg flex flex-wrap justify-center gap-y-4 gap-x-10 md:gap-x-5 md:px-10">
                <div className="border border-blue-600 rounded-full px-10 py-3">
                    <select className="focus:outline-none w-full">
                        <option value="">Select a tag</option>
                        <option value="general">General</option> 
                        <option value="study">Study</option>
                        <option value="personal">Personal</option>
                    </select>
                </div>
                <div className="border border-blue-600 rounded-full px-9 py-3">
                    <select className="focus:outline-none w-full">
                        <option value="">Sort By</option>
                        <option value="title">Title</option>
                        <option value="tag">Tag</option>
                        <option value="createdAt">Created time</option>
                    </select>
                </div>
                <div className="border border-blue-600 rounded-full px-10 py-3">
                    <select className="focus:outline-none w-full">
                        <option value="">Order</option>
                        <option value="asc">New to Old</option>
                        <option value="dsc">Old to New</option>
                    </select>
                </div>
            </section>
            <h3 className="text-2xl my-8 text-center font-mono font-semibold border-y-2 border-y-slate-700 py-5 text-sky-800">Notes (100)</h3>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
                <NoteCard />
                <NoteCard />
                <NoteCard />
                <NoteCard />
                <NoteCard />
                <NoteCard />
                <NoteCard />
                <NoteCard />
                <NoteCard />
                <NoteCard />
                <NoteCard />
                <NoteCard />
                <NoteCard />
                <NoteCard />
                <NoteCard />
            </section>
        </div>
    )
}

export default ViewAllNotesPage