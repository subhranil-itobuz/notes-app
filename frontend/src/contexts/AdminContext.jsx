import axios from 'axios'
import React, { useContext, useState } from 'react'
import { ADMIN_API_ENDPOINT } from '../utils/endPoints'
import { AuthContext } from './AuthContext'
import { toast } from 'react-toastify'

const AdminContext = React.createContext()

const AdminProvider = (props) => {

  const { accessToken } = useContext(AuthContext)
  const [userId, setUserId] = useState()
  const [openUserDeleteModal, setOpenUserDeleteModal] = useState(false)

  const getAllUsers = async () => {
    try {
      const res = await axios.get(`${ADMIN_API_ENDPOINT}/getAllUser`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (res.data.success) {
        return res
      }

    } catch (error) {
      console.error(error)
      toast.error(error.response.data.message)
    }
  }

  const deleteUser = async () => {
    try {
      const res = await axios.delete(`${ADMIN_API_ENDPOINT}/delete/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      if (res.data.success) {
        return res
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <AdminContext.Provider value={{
      getAllUsers,
      userId,
      setUserId,
      deleteUser,
      openUserDeleteModal,
      setOpenUserDeleteModal
    }}>
      {props.children}
    </AdminContext.Provider>
  )
}

export { AdminContext, AdminProvider }