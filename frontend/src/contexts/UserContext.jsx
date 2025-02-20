import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { USER_API_ENDPOINT } from '../utils/endPoints'
import { userInstance } from '../utils/axiosSetup'

const UserContext = React.createContext()

const UserProvider = (props) => {
    const [user, setUser] = useState()
    const [userId, setUserId] = useState()
    const [openUserNameUpdateModal, setOpenUserNameUpdateModal] = useState(false)
    const [openPasswordUpdateModal, setOpenPasswordUpdateModal] = useState(false)
    const [openProfilePhotoUpdateModal, setOpenProfilePhotoUpdateModal] = useState(false)

    const getUser = async () => {
        try {
            const res = await userInstance.get(`${USER_API_ENDPOINT}/getUser`)

            if (res.data.success) {
                setUser(res.data.data)
                setUserId(res.data.data._id)
                return res.data.data
            }
            else toast.info(res.data.message)

        } catch (error) {
            console.error(error)
            toast.error(error)
        }
    }

    const userNameUpdateFunction = async (data) => {
        try {
            const res = await userInstance.put(`${USER_API_ENDPOINT}/update/userName`, data)

            return res
        } catch (error) {
            console.error(error)
            toast.error(error.response.data.message)
        }
    }

    const passwordUpdateFunction = async (data) => {
        try {
            const res = await userInstance.put(`${USER_API_ENDPOINT}/update/password`, data)

            return res

        } catch (error) {
            console.error(error)
            toast.error(error.response.data.message)
        }
    }

    const profilePictureUpdateFunction = async (data) => {
        try {
            const res = await userInstance.post(`${USER_API_ENDPOINT}/update/profilePicture`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })

            if (res.data.success) {
                return res
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response.data.message)
        }
    }

    return (
        <UserContext.Provider value={{
            getUser,
            user,
            userId,
            setUserId,
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