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
  const [icon, setIcon] = useState(eyeSlash);
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
      setIcon(eye)
      setType('text')
    }
    else {
      setIcon(eyeSlash)
      setType('password')
    }
  }

  return (
    <>
      <h1 className='text-3xl text-center text-[#eae2b7] pt-5 2xl:pt-10 font-mono font-bold'>Create Your NotesApp Account</h1>
      <form className='relative flex flex-col gap-2 md:gap-4 mt-6 border border-white shadow-md shadow-white md:w-[70%] 2xl:max-w-[50%] rounded-xl mx-2 md:mx-auto px-4 py-2 sm:py-4' onSubmit={handleSubmit(handleRegistration)}>
        <BackToHome />
        <div>
          <label htmlFor="username" className='w-full text-xl text-white'>
            <span className='text-red-500'>*</span>
            Enter User name:
          </label>
          <input type="text" name='userName' placeholder='xxxx11' className='border border-slate-600 rounded-md w-full mt-2 p-2 text-xl focus:outline-none' {...register('userName', { required: true, minLength: 4, maxLength: 15 })} />
          <p className='text-red-600 font-semibold h-4'>{errors.userName?.message}</p>
        </div>
        <div>
          <label htmlFor="email" className='w-full text-xl text-white'>
            <span className='text-red-500'>*</span>
            Enter your email:
          </label>
          <input type="email" name='email' placeholder='example@example.com' className='border border-slate-600 rounded-md w-full mt-2 p-2 text-xl focus:outline-none'
            {...register('email', { required: true })} />
          <p className='text-red-600 font-semibold h-4'>{errors.email?.message}</p>
        </div>
        <div>
          <label htmlFor="password" className='w-1/4 text-xl  text-white'>
            <span className='text-red-500'>*</span>
            Enter password:
          </label>
          <div className='relative'>
            <input type={type} name='password' placeholder='Enter password' className='border border-slate-600 rounded-md w-full mt-2 p-2 text-xl focus:outline-none' {...register('password', { required: true, minLength: 5 })} />
            <span className='absolute w-6 top-1/3 right-3 cursor-pointer' onClick={handleTogglePassword}><img src={icon} alt="eye icon" /></span>
          </div>
          <p className='text-red-600 font-semibold h-10 sm:h-4'>{errors.password?.message}</p>
        </div>
        <div>
          <label htmlFor="confirmassword" className='w-full text-xl text-white'>
            <span className='text-red-500'>*</span>
            Confirm password:
          </label>
          <div className='relative'>
            <input type={type} name='confirmPassword' placeholder='Confirm your password' className='border border-slate-600 rounded-md w-full mt-2 p-2 text-xl focus:outline-none' {...register('confirmPassword', { required: true, minLength: 5 })} />
          </div>
          <p className='text-red-600 font-semibold h-4'>{errors.confirmPassword?.message}</p>
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


