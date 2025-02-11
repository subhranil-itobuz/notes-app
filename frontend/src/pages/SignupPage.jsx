import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup/src/yup'
import axios from 'axios'

import { USER_API_ENDPOINT } from '../utils/endPoints'
import { signupUserSchema } from '../validations/userSchemaValidate'
import BackToHome from '../components/BackToHome'
import eye from '../assets/eye.svg'
import { useState } from 'react'
import eyeSlash from '../assets/eyeSlash.svg'


const SignupPage = () => {
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eye);
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(signupUserSchema)
  });

  const handleRegistration = async (data, e) => {
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/signup`, data)

      if (res.data.success) {
        console.log(res)
        e.target.reset()
        navigate('/login')
        toast.success(res.data.message)
        toast.warning(res.data.advice)
      }
      else {
        console.log(res)
        toast.info(res.data.message)
      }

    } catch (error) {
      console.log(error)
      console.error(error.response.data.message)
      toast.error(error.response.data.message)
    }
  }

  const handleTogglePassword = () => {
    if (type === 'password') {
      setIcon(eyeSlash)
      setType('text')
    }
    else {
      setIcon(eye)
      setType('password')
    }
  }

  return (
    <>
      <h1 className='text-3xl text-center text-[#eae2b7] pt-5 2xl:pt-10 font-mono font-bold'>Create Your NotesApp Account</h1>
      <form className='relative flex flex-col gap-3 my-5 lg:mt-10 border border-white shadow-md shadow-white md:w-[70%] 2xl:max-w-[50%] rounded-xl mx-2 md:mx-auto px-4 pt-9 pb-6 sm:py-10' onSubmit={handleSubmit(handleRegistration)}>
        <BackToHome />

        <div>
          <input type="text" name='userName' placeholder='Enter Username' className='border border-[#eae2b7] rounded-md w-full p-2 text-xl focus:outline-none bg-transparent focus:bg-white text-white focus:text-black placeholder:text-base transition-all ease-in-out duration-300' {...register('userName', { required: true, minLength: 4, maxLength: 15 })} />
          <p className='text-red-600 text-sm font-semibold h-6 pt-1'>{errors.userName?.message}</p>
        </div>

        <div>
          <input type="email" name='email' placeholder='Enter your email' className='border border-[#eae2b7] rounded-md w-full p-2 text-xl focus:outline-none bg-transparent focus:bg-white text-white focus:text-black placeholder:text-base transition-all ease-in-out duration-300'
            {...register('email', { required: true })} />
          <p className='text-red-600 text-sm font-semibold h-6 pt-1'>{errors.email?.message}</p>
        </div>

        <div>
          <div className='relative'>
            <input type={type} name='password' placeholder='Enter password' className='border border-[#eae2b7] rounded-md w-full p-2 text-xl focus:outline-none bg-transparent focus:bg-white text-white focus:text-black placeholder:text-base transition-all ease-in-out duration-300' {...register('password', { required: true, minLength: 5 })} />
            <span className='absolute w-6 top-[10px] right-3 cursor-pointer' onClick={handleTogglePassword}><img src={icon} alt="eye icon" className='filter fill-white' /></span>
          </div>
          <p className='text-red-600 text-sm font-semibold h-6 pt-1'>{errors.password?.message}</p>
        </div>

        <div>
          <div className='relative'>
            <input type={type} name='confirmPassword' placeholder='Confirm your password' className='border border-[#eae2b7] rounded-md w-full p-2 text-xl focus:outline-none bg-transparent focus:bg-white text-white focus:text-black placeholder:text-base transition-all ease-in-out duration-300'    {...register('confirmPassword', { required: true, minLength: 5 })} />
          </div>
          <p className='text-red-600 text-sm font-semibold h-6 pt-1'>{errors.confirmPassword?.message}</p>
        </div>
        <div>
          <div className='flex items-center gap-3'>
            <label className='text-white font-medium 2xl:text-base'>
              <span className='text-red-500'>*</span>
              Enter Your Role:
            </label>
            <div className='flex items-center justify-start gap-3 font-semibold'>
              <div>
                <input type="radio" name="role" id="user" value='user' className='accent-pink-600 cursor-pointer' {...register('role', { required: true })} />
                <label htmlFor="user" className='ms-1 text-[#eae2b7] cursor-pointer'>User</label>
              </div>
              <div>
                <input type="radio" name="role" id="admin" value='admin' className='accent-pink-600 cursor-pointer' {...register('role', { required: true })} />
                <label htmlFor="admin" className='ms-1 text-[#eae2b7] cursor-pointer'>Admin</label>
              </div>
            </div>
          </div>
          <p className='text-red-600 ps-2 text-sm font-semibold h-6 pt-1'>{errors.role?.message}</p>
        </div>

        <button className='bg-orange-400 hover:bg-orange-700 font-semibold w-[80%] 2xl:w-[60%] py-2 mt-2 mb-1 text-white outline-0 rounded-lg mx-auto text-xl transition-all duration-500 ease-in-out' >Submit</button>
        <div className='text-white'>
          Already have an account? &nbsp;
          <Link to='/login' className='text-blue-300 hover:text-blue-400'>Login</Link>
        </div>
      </form>
    </>)
}

export default SignupPage


