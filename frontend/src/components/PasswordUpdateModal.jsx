import { useContext, useState } from 'react'
import Modal from './Modal'
import { UserContext } from '../contexts/UserContext'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { updatePasswordSchema } from '../validations/userSchemaValidate'
import { toast } from 'react-toastify'

const PasswordUpdateModal = () => {
  const [type, setType] = useState('password')

  const { setOpenPasswordUpdateModal, passwordUpdateFunction } = useContext(UserContext)

  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(updatePasswordSchema)
  });

  const handlePasswordUpdation = async (data, e) => {
    console.log('handle updation in modal clicked')
    console.log(data)

    const res = await passwordUpdateFunction(data)

    if (res?.data.success) {
      console.log(res)
      e.target.reset()
      setOpenPasswordUpdateModal(false)
      toast.success(res.data.message)
    }
  }

  const handleShowPassword = () => type === 'password' ? setType('text') : setType('password')


  return (
    <Modal onClose={() => setOpenPasswordUpdateModal(false)} height={'max-h-[800px]'} width={'w-[95%] md:w-[700px]'}>
      <h1 className="text-xl md:text-2xl text-center font-mono font-bold pt-8 mb-5">
        Update Password
      </h1>
      <form className='flex flex-col gap-2 w-full  text-base md:text-xl' onSubmit={handleSubmit(handlePasswordUpdation)}>

        <label htmlFor="oldPassword" className='font-bold'>Enter Old Password:</label>
        <div>
          <input type={type} name='oldPassword' placeholder='old password' className='border border-slate-600 rounded-md w-full p-2 text-xl focus:outline-none' {...register('oldPassword', { required: true, minLength: 5 })} />
          <p className='text-red-600 text-sm font-semibold mt-1 h-10 md:h-6'>{errors.oldPassword?.message}</p>
        </div>

        <label htmlFor="newPassword" className='font-bold'>Enter New password</label>
        <div>
          <input type={type} name='newPassword' placeholder='new password' className='border border-slate-600 rounded-md w-full p-2 text-xl focus:outline-none' {...register('newPassword', { required: true, minLength: 5 })} />
          <p className='text-red-600 text-sm font-semibold mt-1 h-10 md:h-6'>{errors.newPassword?.message}</p>
        </div>

        <label htmlFor="confirmNewPassword" className='font-bold'>Confirm new password</label>
        <div>
          <input type={type} name='confirmNewPassword' placeholder='confirm new password' className='border border-slate-600 rounded-md w-full p-2 text-xl focus:outline-none' {...register('confirmNewPassword', { required: true, minLength: 5 })} />
          <p className='text-red-600 text-sm font-semibold mt-1 h-10 md:h-6'>{errors.confirmNewPassword?.message}</p>
        </div>

        <div className='flex items-center gap-3'>
          <label htmlFor="showPassword" className='text-slate-600'>Show Password</label>
          <input type="checkbox" name="showPassword" id='showPassword' className='checked:accent-red-500' onInput={handleShowPassword} />
        </div>

        <button className='bg-orange-400 hover:bg-orange-700 font-semibold w-[80%] 2xl:w-[60%] py-2 mt-2 mb-1 text-white outline-0 rounded-lg mx-auto text-xl transition-all duration-500 ease-in-out'>Submit</button>
      </form>
    </Modal>
  )
}

export default PasswordUpdateModal