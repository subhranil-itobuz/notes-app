import { useContext } from 'react'
import Modal from './Modal'
import { UserContext } from '../contexts/UserContext'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { updateUserNameSchema } from '../validations/userSchemaValidate'
import { toast } from 'react-toastify'

const UserNameChangeModal = () => {
  const { setOpenUserNameUpdateModal, userNameUpdateFunction } = useContext(UserContext)
  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(updateUserNameSchema)
  });

  const handleUserNameUpdation = async (data, e) => {
    console.log('handle updation in modal clicked')
    console.log(data)

    const res = await userNameUpdateFunction(data)

    if (res?.data.success) {
      console.log(res)
      e.target.reset()
      setOpenUserNameUpdateModal(false)
      toast.success(res.data.message)
    }
  }

  return (
    <Modal onClose={() => setOpenUserNameUpdateModal(false)} height={'max-h-[550px]'} width={'w-[95%] md:w-[700px]'}>
      <h1 className="text-xl md:text-2xl text-center font-mono font-bold pt-8 mb-10">
        Update Username
      </h1>
      <form className='flex flex-col gap-3 w-full text-xl' onSubmit={handleSubmit(handleUserNameUpdation)}>
        <label htmlFor="userName" className='font-bold'>Enter new Username:</label>
        <div>
          <input type="text" name='newUserName' placeholder='xxxx11' className='border border-slate-600 rounded-md w-full mt-2 p-2 text-xl focus:outline-none' {...register('newUserName', { required: true, minLength: 4, maxLength: 15 })} />
          <p className='text-red-600 text-base font-semibold mt-1 h-12'>{errors.newUserName?.message}</p>
        </div>
        <button className='bg-orange-400 hover:bg-orange-700 font-semibold w-[80%] 2xl:w-[60%] py-2 mt-2 mb-1 text-white outline-0 rounded-lg mx-auto text-xl transition-all duration-500 ease-in-out' >Submit</button>
      </form>
    </Modal>
  )
}

export default UserNameChangeModal