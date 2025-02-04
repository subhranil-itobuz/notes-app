import { Link, useNavigate } from "react-router-dom"
import BackToHome from "../components/BackToHome"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { reVerifySchema } from "../validations/userSchemaValidate";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/endPoints";
import { toast } from "react-toastify";

const ReverifyPage = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(reVerifySchema) });

    const handleReverify = async (data, e) => {
        try {
            console.log('inside reverify')
            console.log(data)

            const res = await axios.post(`${USER_API_ENDPOINT}/resendEmail`, data)

            if (res.data.success) {
                console.log(res)
                toast.success(res.data.message)
                e.target.reset()
                navigate('/login')
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response.data.message)
        }
    }
    return (
        <>
            <h1 className="mt-20 text-3xl font-mono text-center px-2">Resend verification link</h1>
            <form action="/" className="relative border border-slate-700 flex flex-col gap-5 mx-5 md:mx-auto mt-10 px-3 py-4 rounded-xl md:w-[70%] 2xl:max-w-[50%]" onSubmit={handleSubmit(handleReverify)}>
                <BackToHome />
                <label htmlFor="email" className="w-full text-xl"><span className='text-red-500'>*</span>Enter your email</label>
                <div>
                    <input type="email" name="email" placeholder="example@example.com" className="px-2 py-3 border border-slate-600 rounded-md w-full p-2 text-xl focus:outline-none" {...register('email', { required: true })} />
                    <p className='text-red-600 font-semibold h-6 mt-2 ps-1'>{errors.email?.message}</p>
                </div>
                <button className='bg-slate-900 hover:bg-slate-700 w-[80%] 2xl:w-[60%] py-2 text-gray-200 outline-0 rounded-lg mx-auto text-xl'>
                    Submit
                </button>
                <div>
                    <div className="mb-2">
                        Already verified? &nbsp;
                        <Link to='/login' className='text-blue-600 hover:text-blue-400'>Login</Link>
                    </div>
                    <div>
                        Don&apos;t have a account?&nbsp;
                        <Link to='/signup' className='text-blue-600 hover:text-blue-400'>Sign up</Link>
                    </div>
                </div>
            </form>
        </>
    )
}

export default ReverifyPage