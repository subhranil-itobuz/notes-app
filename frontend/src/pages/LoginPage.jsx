import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/src/yup'
import axios from 'axios'

import { loginUserSchema } from '../validations/userSchemaValidate'
import { USER_API_ENDPOINT } from '../utils/endPoints'
import { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import BackToHome from '../components/BackToHome'
import { toast } from 'react-toastify'
import eye from '../assets/eye.svg'
import eyeSlash from '../assets/eyeSlash.svg'


const LoginPage = () => {
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeSlash);
  const { loginFunction, tokenSetFunction } = useContext(AuthContext)

  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(loginUserSchema) });

  const handleLogin = async (data, e) => {
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, data)

      if (res.data.success) {
        console.log(res.data.message)
        e.target.reset()
        loginFunction()
        tokenSetFunction(res.data.accessToken, res.data.refreshToken)
        navigate('/')
        toast.success(res.data.message)
      }
      else toast.info(res.data.message)
    }
    catch (error) {
      console.error(error)
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
      <h1 className='text-3xl text-center pt-14 text-[#eae2b7] font-mono font-bold'>Login to NotesApp</h1>
      <form className='relative flex flex-col gap-2 md:gap-4 mt-10 border border-white shadow-md shadow-white md:w-[70%] 2xl:max-w-[50%] rounded-xl mx-2 md:mx-auto px-4 py-6'
        onSubmit={handleSubmit(handleLogin)}>
        <BackToHome />
        <div>
          <label htmlFor="email" className='w-full text-xl text-white'><span className='text-red-500'>*</span>Enter your mail:</label>
          <input type="email" name='email' placeholder='example@example.com' className='border border-slate-600 rounded-md w-full mt-2 p-2 text-xl focus:outline-none'
            {...register('email', { required: true })} />
          <p className='text-red-600 font-semibold h-6'>{errors.email?.message}</p>
        </div>
        <div className='relative'>
          <label htmlFor="password" className='w-full text-xl text-white'><span className='text-red-500'>*</span>Enter password:</label>
          <div>
            <input type={type} name='password' placeholder='Enter password' className='border border-slate-600 rounded-md w-full mt-2 p-2 text-xl focus:outline-none' {...register('password', { required: true, minLength: 5 })} />
            <span className='absolute w-6 top-[39%] right-3 cursor-pointer' onClick={handleTogglePassword}><img src={icon} alt="eye icon" /></span>
          </div>
          <p className='text-red-600 font-semibold h-10 sm:h-9'>{errors.password?.message}</p>
        </div>
        <button className='bg-orange-400 hover:bg-orange-700 w-[80%] 2xl:w-[60%] py-2 text-white font-semibold outline-0 rounded-lg mx-auto text-xl transition-all duration-500 ease-in-out'>Submit</button>
        <div className='text-white'>
          Don&apos;t have a account?&nbsp;
          <Link to='/signup' className='text-blue-600 hover:text-blue-400'>Sign up</Link>
        </div>
        <div className='text-white'>
          Didn&apos;t verify your email?&nbsp;
          <Link to='/reverify' className='text-blue-600 hover:text-blue-400'>Verify here</Link>
        </div>
      </form>
    </>
  )
}

export default LoginPage