import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup/src/yup'
import { signupUserSchema } from '../validations/userSchemaValidate'

const SignupPage = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(signupUserSchema)
  });

  const handleRegistration = async (data, e) => {
    console.log('inside registration func')
    console.log(data)

    const res = await fetch('http://localhost:3000/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data),
    })

    const jsonData = await res.json()

    if(jsonData.success) {
      console.log(jsonData)
      e.target.reset()
      navigate('/login')
    }
  }

  return (
    <>
      <h1 className='text-3xl text-center mt-16 font-mono font-bold'>Sign up here</h1>
      <form className='flex flex-col gap-2 md:gap-4 mt-6 border border-slate-900 md:w-[70%] 2xl:max-w-[50%] rounded-xl mx-2 md:mx-auto px-4 py-6'
        onSubmit={handleSubmit(handleRegistration)}>
        <div>
          <label htmlFor="username" className='w-full text-xl'>
            <span className='text-red-500'>*</span>
            Enter User name:
          </label>
          <input type="text" name='userName' placeholder='xxxx11' className='border border-slate-600 rounded-md w-full mt-2 p-2 text-xl focus:outline-none' {...register('userName', { required: true, minLength: 4, maxLength: 15 })} />
          <p className='text-red-600 font-semibold h-4'>{errors.userName?.message}</p>
        </div>
        <div>
          <label htmlFor="email" className='w-full text-xl'>
            <span className='text-red-500'>*</span>
            Enter your email:
          </label>
          <input type="email" name='email' placeholder='example@example.com' className='border border-slate-600 rounded-md w-full mt-2 p-2 text-xl focus:outline-none'
            {...register('email', { required: true })} />
          <p className='text-red-600 font-semibold h-4'>{errors.email?.message}</p>
        </div>
        <div>
          <label htmlFor="password" className='w-full text-xl'>
            <span className='text-red-500'>*</span>
            Enter password:
          </label>
          <input type="password" name='password' placeholder='Enter password' className='border border-slate-600 rounded-md w-full mt-2 p-2 text-xl focus:outline-none' {...register('password', { required: true, minLength: 5 })} />
          <p className='text-red-600 font-semibold h-4'>{errors.password?.message}</p>
        </div>
        <div>
          <label htmlFor="confirmassword" className='w-full text-xl'>
            <span className='text-red-500'>*</span>
            Retype password:
          </label>
          <input type="password" name='confirmPassword' placeholder='Retype your password' className='border border-slate-600 rounded-md w-full mt-2 p-2 text-xl focus:outline-none' {...register('confirmPassword', { required: true, minLength: 5 })} />
          <p className='text-red-600 font-semibold h-4'>{errors.confirmPassword?.message}</p>
        </div>
        <div>
          Already have an account? &nbsp;
          <Link to='/login' className='text-blue-600 hover:text-blue-400'>Login</Link>
        </div>
        <button className='bg-slate-900 hover:bg-slate-700 w-[80%] 2xl:w-[60%] py-2 mt-2 text-gray-200 outline-0 rounded-lg mx-auto text-xl'>Submit</button>
      </form>
    </>)
}

export default SignupPage


