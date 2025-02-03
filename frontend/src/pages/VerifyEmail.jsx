import { useEffect, useState } from "react";
import { USER_API_ENDPOINT } from "../utils/endPoints";
import { useParams } from 'react-router-dom'


const VerifyEmail = () => {
    const [message, setMessage] = useState('Verifying...');
    const params = useParams()
    const token = params.token

    useEffect(() => {
        const verify = async () => {
            try {
                console.log(token)
                const res = await fetch(`${USER_API_ENDPOINT}/verify/${token}`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const jsonData = await res.json()
                console.log(jsonData)
                setMessage('Email verified successfully!\nYou can Login now');
            } catch (error) {
                console.log(error)
                setMessage('Verification failed. The link may have expired.');
            }
        };
        verify();
    }, [token]);

    return (
        <div>
            <h2>Email Verification</h2>
            <pre>{message}</pre>
        </div>
    );
};

export default VerifyEmail