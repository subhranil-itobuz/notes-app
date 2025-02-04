import React, { useContext, useState } from 'react'
import { AuthContext } from './AuthContext'
import { USER_API_ENDPOINT } from '../utils/endPoints'
import axios from 'axios'
import { toast } from 'react-toastify'

const UserContext = React.createContext()

const UserProvider = (props) => {
    const [user, setUser] = useState()
    const { refreshToken } = useContext(AuthContext)

    const getUser = async () => {
        try {
            const res = await axios.get(`${USER_API_ENDPOINT}/getUser`, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            })

            if (res.data.success) {
                console.log(res)
                console.log(res.data.message)
                setUser(res.data.data)
                return user
            }
            else toast.info(res.data.message)

        } catch (error) {
            console.log(error)
            toast.error(error)
        }
    }

    return (
        <UserContext.Provider value={{ getUser, user }}>
            {props.children}
        </UserContext.Provider>
    )
}

export { UserProvider, UserContext }