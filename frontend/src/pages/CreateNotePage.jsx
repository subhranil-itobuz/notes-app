import { MdCancel } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createNoteSchema } from "../validations/notesSchemaValidate";
import { useContext } from "react";
import { NotesContext } from "../contexts/NotesContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const CreateNotePage = () => {
  const navigate = useNavigate()
  const { createNotes, note } = useContext(NotesContext)

  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(createNoteSchema)
  });

  const handleNotesCreate = async (data, e) => {
    const res = await createNotes(data)
    console.log(res)
    if (res.data.success) {
      console.log(note)
      e.target.reset()
      toast.success(res.data.message)
      navigate('/')
    }
    else {
      toast.warning(res.data.message)
    }
  }

  const handleBack = () => {
    console.log('back button')
    navigate('/')
  }

  return (
    <div className="bg-[#16425b] py-5">
      <h1 className="text-[#eae2b7] text-3xl 2xl:text-5xl font-mono font-semibold px-1 py-8 2xl:my-5 text-center ">Create a new note</h1>
      <form className="border border-white shadow-md shadow-white mx-4 px-3 2xl:px-10 py-5 2xl:py-10 text-2xl rounded-xl lg:max-w-[900px] lg:mx-auto" onSubmit={handleSubmit(handleNotesCreate)}>
        <div className="w-full">
          <label htmlFor="title" className="font-serif text-white">
            <span className="text-red-500">*</span>
            Enter title:
          </label>
          <div>
            <input type="text" name="title" placeholder="Write your title here" minLength={4} maxLength={15} className="w-full focus:outline-none rounded-lg px-3 py-1 mt-1 text-xl" {...register('title', { required: true, minLength: 4, maxLength: 15 })} />
            <p className="text-base text-red-600 px-2 h-10 font-semibold">{errors.title?.message}</p>
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="description" className="font-serif text-white">
            <span className="text-red-500">*</span>
            Enter description:
          </label>
          <div>
            <textarea name="description" id="description" minLength={4} placeholder="Write your notes description" className="focus:outline-none w-full rounded-lg px-3 py-1 mt-1 text-xl" {...register('description', { required: true, minLength: 4 })}></textarea>
            <p className="text-base text-red-600 px-2 h-10 -mt-2 font-semibold">{errors.description?.message}</p>
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="tag" className="font-serif text-white">Enter tag:</label>
          <div>
            <input type="text" name="tag" placeholder="Default:'General'" maxLength={8} className="w-full focus:outline-none rounded-lg px-3 py-1 mt-1 text-xl" {...register('tag', { maxLength: 8 })} />
            <p className="text-base text-red-600 px-2 h-10 font-semibold">{errors.tag?.message}</p>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row-reverse md:justify-between gap-3 font-medium text-xl 2xl:text-2xl mt-5">
          <button className="bg-green-500 hover:bg-green-600 hover:text-white rounded-xl w-full md:w-[46%] py-2 flex justify-center items-center gap-1 transition-all ease-in-out duration-300">
            <IoMdAddCircle size={30} />
            Add
          </button>
          <button type="button" className="bg-red-500 hover:bg-red-600 hover:text-white rounded-xl w-full md:w-[46%] py-2 flex justify-center items-center gap-1 transition-all ease-in-out duration-300" onClick={handleBack}>
            <MdCancel size={30} />
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateNotePage