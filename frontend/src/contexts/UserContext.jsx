import React, { useContext, useState } from 'react'
import { AuthContext } from './AuthContext'
import { USER_API_ENDPOINT } from '../utils/endPoints'
import axios from 'axios'
import { toast } from 'react-toastify'

const UserContext = React.createContext()

const UserProvider = (props) => {
    const { refreshToken } = useContext(AuthContext)
    const [user, setUser] = useState()
    const [openUserNameUpdateModal, setOpenUserNameUpdateModal] = useState(false)

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
                return res.data.data
            }
            else toast.info(res.data.message)

        } catch (error) {
            console.log(error)
            toast.error(error)
        }
    }

    const userNameUpdateFunction = async (data) => {
        try {
            console.log('inside username update function context')
            const res = await axios.put(`${USER_API_ENDPOINT}/update/userName`, data, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            })
            console.log(res)

            return res
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    return (
        <UserContext.Provider value={{ getUser, user, openUserNameUpdateModal, setOpenUserNameUpdateModal, userNameUpdateFunction }}>
            {props.children}
        </UserContext.Provider>
    )
}

export { UserProvider, UserContext }