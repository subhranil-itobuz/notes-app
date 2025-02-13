import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom'

import { USER_API_ENDPOINT } from "../utils/endPoints";


const VerifyEmail = () => {
    const [message, setMessage] = useState('Verifying...');
    const [verified, setVerified] = useState(false)
    const params = useParams()
    const token = params.token

    useEffect(() => {
        const verify = async () => {
            try {
                const res = await fetch(`${USER_API_ENDPOINT}/verify/${token}`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const jsonData = await res.json()

                if (jsonData.success) {
                    setMessage(jsonData.message);
                    setVerified(true)
                }
                else
                    setMessage(jsonData.message)

            } catch (error) {
                console.log(error)
                setMessage('Verification failed. The link may have expired.');
                setVerified(false)
                toast.error(error)
            }
        };
        verify();
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center gap-10 w-full">
            <h2 className="text-4xl text-center mt-20 font-mono italic text-white">Email Verification</h2>
            <p className="text-2xl text-center w-[90%] text-green-300 opacity-80">{message}</p>
            {verified &&
                <Link to='/login'>
                    <button className="bg-slate-400 text-black hover:bg-slate-700 px-6 py-2 rounded-lg hover:text-white text-xl transition-all duration-300 ease-in-out">Login</button>
                </Link>
            }
        </div>
    );
};

export default VerifyEmail