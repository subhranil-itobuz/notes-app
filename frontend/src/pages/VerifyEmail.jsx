import { useEffect, useState } from "react";
import { USER_API_ENDPOINT } from "../utils/endPoints";
import { Link, useParams } from 'react-router-dom'


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
                    setMessage('Email verified successfully! You can Login now');
                    setVerified(true)
                }
            } catch (error) {
                setMessage('Verification failed. The link may have expired.');
                setVerified(false)
            }
        };
        verify();
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center gap-10 w-full">
            <h2 className="text-4xl text-center mt-20 font-mono italic">Email Verification</h2>
            <p className="text-2xl text-center w-[90%]">{message}</p>
            {verified &&
                <Link to='/login'>
                    <button className="bg-slate-800 hover:bg-slate-500 px-6 py-2 rounded-lg text-white text-xl">Login</button>
                </Link>
            }
        </div>
    );
};

export default VerifyEmail