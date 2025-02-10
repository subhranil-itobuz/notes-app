import React, { useContext, useState } from 'react'
import { AuthContext } from './AuthContext'
import { USER_API_ENDPOINT } from '../utils/endPoints'
import axios from 'axios'
import { toast } from 'react-toastify'

const UserContext = React.createContext()

const UserProvider = (props) => {
    const { accessToken } = useContext(AuthContext)
    const [user, setUser] = useState()
    const [openUserNameUpdateModal, setOpenUserNameUpdateModal] = useState(false)
    const [openPasswordUpdateModal, setOpenPasswordUpdateModal] = useState(false)
    const [openProfilePhotoUpdateModal, setOpenProfilePhotoUpdateModal] = useState(false)


    const getUser = async () => {
        try {
            const res = await axios.get(`${USER_API_ENDPOINT}/getUser`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
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
                    Authorization: `Bearer ${accessToken}`
                }
            })
            console.log(res)

            return res
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    const passwordUpdateFunction = async (data) => {
        try {
            console.log('inside pasword change function context')
            const res = await axios.put(`${USER_API_ENDPOINT}/update/password`, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            return res

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    const profilePictureUpdateFunction = async (data) => {
        try {
            console.log('inside profile picture update function in context')
            const res = await axios.post(`${USER_API_ENDPOINT}/update/profilePicture`, data, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data'
                },
            })

            if (res.data.success) {
                console.log(res)
                return res
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    return (
        <UserContext.Provider value={{
            getUser,
            user,
            openUserNameUpdateModal,
            setOpenUserNameUpdateModal,
            userNameUpdateFunction,
            openPasswordUpdateModal,
            setOpenPasswordUpdateModal,
            passwordUpdateFunction,
            openProfilePhotoUpdateModal,
            setOpenProfilePhotoUpdateModal,
            profilePictureUpdateFunction
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export { UserProvider, UserContext }