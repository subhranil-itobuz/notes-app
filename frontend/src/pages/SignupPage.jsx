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
import { FiInfo } from "react-icons/fi";
import { Popover } from 'react-tiny-popover'




const SignupPage = () => {
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eye);
  const [isUserNamePopoverOpen, setIsUserNamePopoverOpen] = useState(false)
  const [isPasswordPopoverOpen, setIsPasswordPopoverOpen] = useState(false)
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(signupUserSchema)
  });

  const handleRegistration = async (data, e) => {
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/signup`, data)

      if (res.data.success) {
        e.target.reset()
        navigate('/login')
        toast.success(res.data.message)
        toast.warning(res.data.advice)
      }
      else {
        toast.info(res.data.message)
      }

    } catch (error) {
      console.error(error)
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
          <div className='w-full flex items-center gap-2'>
            <input type="text" name='userName' placeholder='Enter Username' className=' border border-[#eae2b7] rounded-md w-[95%]  p-2 text-xl focus:outline-none bg-transparent focus:bg-white text-white focus:text-black placeholder:text-base transition-all ease-in-out duration-300' {...register('userName', { required: true, minLength: 4, maxLength: 15 })} />
            <Popover
              isOpen={isUserNamePopoverOpen}
              positions={['top']}
              content={
                <div className='bg-gray-300 text-sm p-3 rounded-md me-5 opacity-95'>
                  <ol className='flex flex-col gap-1'>
                    <li>Symbols are not allowed</li>
                    <li>One digit is required</li>
                    <li>UPPERCASE character is not allowed</li>
                    <li>lowercase character is required</li>
                    <li>Must be within 4-15 characters</li>
                  </ol>
                </div>
              }
            >
              <button onMouseEnter={() => setIsUserNamePopoverOpen(true)} onMouseLeave={() => setIsUserNamePopoverOpen(false)} ><FiInfo color='cyan' size={30} /></button>
            </Popover>
          </div>
          <p className='text-red-600 text-sm font-semibold h-6 pt-1'>{errors.userName?.message}</p>
        </div>

        <div>
          <input type="email" name='email' placeholder='Enter your email' className='border border-[#eae2b7] rounded-md w-full p-2 text-xl focus:outline-none bg-transparent focus:bg-white text-white focus:text-black placeholder:text-base transition-all ease-in-out duration-300'
            {...register('email', { required: true })} />
          <p className='text-red-600 text-sm font-semibold h-6 pt-1'>{errors.email?.message}</p>
        </div>

        <div>
          <div className='w-full flex items-center gap-2'>
            <div className='relative w-[95%]'>
              <input type={type} name='password' placeholder='Enter password' className='border border-[#eae2b7] rounded-md w-full p-2 text-xl focus:outline-none bg-transparent focus:bg-white text-white focus:text-black placeholder:text-base transition-all ease-in-out duration-300' {...register('password', { required: true, minLength: 5 })} />
              <span className='absolute w-6 top-[10px] right-3 cursor-pointer' onClick={handleTogglePassword}><img src={icon} alt="eye icon" className='filter fill-white' /></span>
            </div>
            <Popover
              isOpen={isPasswordPopoverOpen}
              positions={['top']}
              content={
                <div className='bg-gray-300 text-sm p-3 rounded-md me-5 opacity-95'>
                  <ol className='flex flex-col gap-1'>
                    <li>Atleast one UPPERCASE character is required</li>
                    <li>Atleast one lowercase character is required</li>
                    <li>Atleast one digit (0-9) is required</li>
                    <li>Atleast one special character is required</li>
                    <li>Atleast 5 characters long</li>
                  </ol>
                </div>
              }
            >
              <button onMouseEnter={() => setIsPasswordPopoverOpen(true)} onMouseLeave={() => setIsPasswordPopoverOpen(false)} ><FiInfo color='cyan' size={30} /></button>
            </Popover>
          </div>

          <p className='text-red-600 text-sm font-semibold h-6 pt-1'>{errors.password?.message}</p>
        </div>

        <div>
          <div className='relative'>
            <input type={type} name='confirmPassword' placeholder='Confirm your password' className='border border-[#eae2b7] rounded-md w-full p-2 text-xl focus:outline-none bg-transparent focus:bg-white text-white focus:text-black placeholder:text-base transition-all ease-in-out duration-300'    {...register('confirmPassword', { required: true, minLength: 5 })} />
          </div>
          <p className='text-red-600 text-sm font-semibold h-6 pt-1'>{errors.confirmPassword?.message}</p>
        </div>

        <button className='bg-orange-400 hover:bg-orange-700 font-semibold w-[80%] 2xl:w-[60%] py-2 mt-5 mb-1 text-white outline-0 rounded-lg mx-auto text-xl transition-all duration-500 ease-in-out' >Submit</button>
        <div className='text-white'>
          Already have an account? &nbsp;
          <Link to='/login' className='text-blue-300 hover:text-blue-400'>Login</Link>
        </div>
      </form>
    </>)
}

export default SignupPage


