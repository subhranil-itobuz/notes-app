import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/src/yup'
import axios from 'axios'

import { loginUserSchema } from '../validations/userSchemaValidate'
import { USER_API_ENDPOINT } from '../utils/endPoints'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import BackToHome from '../components/BackToHome'
import { toast } from 'react-toastify'


const LoginPage = () => {
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
      console.error(error.response.data.message)
      toast.error(error.response.data.message)
    }
  }

  return (
    <>
      <h1 className='text-3xl text-center mt-14 font-mono font-bold'>Login to NotesApp</h1>
      <form action="/" className='relative flex flex-col gap-2 md:gap-4 mt-10 border border-slate-900 md:w-[70%] 2xl:max-w-[50%] rounded-xl mx-2 md:mx-auto px-4 py-6'
        onSubmit={handleSubmit(handleLogin)}>
        <BackToHome />
        <div>
          <label htmlFor="email" className='w-full text-xl'>Enter your mail:</label>
          <input type="email" name='email' placeholder='example@example.com' className='border border-slate-600 rounded-md w-full mt-2 p-2 text-xl focus:outline-none'
            {...register('email', { required: true })} />
          <p className='text-red-600 font-semibold h-6'>{errors.email?.message}</p>
        </div>
        <div>
          <label htmlFor="password" className='w-full text-xl'>Enter password:</label>
          <input type="password" name='password' placeholder='Enter password' className='border border-slate-600 rounded-md w-full mt-2 p-2 text-xl focus:outline-none' {...register('password', { required: true, minLength: 5 })} />
          <p className='text-red-600 font-semibold h-10 sm:h-9'>{errors.password?.message}</p>
        </div>
        <button className='bg-slate-900 hover:bg-slate-700 w-[80%] 2xl:w-[60%] py-2 text-gray-200 outline-0 rounded-lg mx-auto text-xl'>Submit</button>
        <div>
          Don&apos;t have a account?&nbsp;
          <Link to='/signup' className='text-blue-600 hover:text-blue-400'>Sign up</Link>
        </div>
        <div>
          Didn&apos;t verify your email?&nbsp;
          <Link to='/' className='text-blue-600 hover:text-blue-400'>Verify here</Link>
        </div>
      </form>
    </>
  )
}

export default LoginPage