import { GrUpdate } from "react-icons/gr"
import Modal from "./Modal"
import { useContext } from "react"
import { NotesContext } from "../contexts/NotesContext"
import { useForm } from "react-hook-form"
import { updateNoteSchema } from "../validations/notesSchemaValidate"
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from "react-toastify"

const UpdateModal = ({ setOpenUpdateModal }) => {
  const { updatingNote, updateNoteFunction } = useContext(NotesContext)
  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(updateNoteSchema)
  });

  const handleNoteUpdation = async (data) => {
    console.log('this is data of form', data)

    const res = await updateNoteFunction(data)

    if (res?.data.success) {
      console.log('inside update if')
      console.log(res)
      toast.success(res.data.message)
      setOpenUpdateModal(false)
    }
  }

  return (
    <Modal onClose={() => setOpenUpdateModal(false)} height={'h-[87%]'} width={'w-full md:w-3/4 lg:w-2/3 2xl:w-[80%]'}>
      <div className='w-full mx-auto pt-5'>
        <h2 className='text-xl md:text-2xl font-serif font-bold text-center mb-5 md:mb-4'>Update Note Here</h2>
        <form className="flex flex-col gap-2 2xl:gap-10 w-full relative" onSubmit={handleSubmit(handleNoteUpdation)}>
          <div className="flex flex-col gap-1 text-lg 2xl:text-2xl">
            <div className="w-full">
              <input type="text" name="title" placeholder="Enter title" className="px-4 py-2 rounded-lg w-full focus:outline-none" {...register('title', { maxLength: 15 })} defaultValue={updatingNote.title} />
              <p className="text-sm text-red-600 px-2 h-8 font-semibold w-full">{errors.title?.message}</p>
            </div>

            <div className="w-full">
              <textarea name="description" id="" rows="7" placeholder="Enter Description" className="focus:outline-none px-4 py-2 rounded-lg w-full" {...register('description')} defaultValue={updatingNote.description}></textarea>
              <p className="text-sm text-red-600 px-2 h-8 -mt-2 font-semibold w-full">{errors.description?.message}</p>
            </div>

            <div className="w-full">
              <input type="text" placeholder="Default:'General'" className="focus:outline-none px-4 py-2 rounded-lg w-full" {...register('tag', { maxLength: 8 })} defaultValue={updatingNote.tag} />
              <p className="text-sm text-red-600 px-2 h-8 w-full font-semibold">{errors.tag?.message}</p>
            </div>
          </div>
          <div className="w-full">
            <button className="bg-green-500 text-white py-3 rounded-full flex justify-center items-center gap-4 text-xl hover:bg-green-400 hover:text-black transition-all ease-in-out duration-300 w-full"><GrUpdate size={23} /> Update</button>
            <div className="text-sm mt-2 text-center font-thin text-red-600">*Blank field indicates no updation</div>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default UpdateModal