import { useContext, useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { AdminContext } from "../contexts/AdminContext";
import { useNavigate } from "react-router-dom";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { ChatContext } from "../contexts/ChatContext";

const UsersTable = () => {
  const { getAllUsers, setUserId, setOpenUserDeleteModal, openUserDeleteModal } = useContext(AdminContext)
  const [allUser, setAllUser] = useState([])
  const navigate = useNavigate()
  const { setRoom } = useContext(ChatContext)

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getAllUsers()

      if (res?.data.success) {
        setAllUser(res.data.data)
      }
      else {
        setAllUser([])
      }
    }

    fetchUser()

    // eslint-disable-next-line  
  }, [openUserDeleteModal])

  const handleAddNote = (userId) => {
    setUserId(userId)
    navigate('/notes/create')
  }

  const handleDeleteUser = async (userId) => {
    setUserId(userId)
    setOpenUserDeleteModal(true)
  }

  const handleChatNavigation = (userId) => {
    console.log(userId)
    setRoom(userId)
    navigate('/chat')
  }

  return (
    <div className="px-2 md:px-8 my-5">
      <h1 className="text-3xl text-center font-bold font-mono text-[#eae2b7] my-10">All Users</h1>
      {
        allUser.length === 0 ? <div className="text-3xl font-semibold text-white text-center pt-10">*No User to display</div> :
          <div className="w-full rounded-lg overflow-x-auto no-scrollbar shadow-sm shadow-white text-sm">
            <table className="w-full">
              <thead className="bg-gray-600">
                <tr className="text-white uppercase">
                  <th className="p-2 whitespace-nowrap">User Name</th>
                  <th className="p-2 border-x-2 border-x-white whitespace-nowrap">Email</th>
                  <th className="p-2 border-r-2 border-r-white whitespace-nowrap"> Add note</th>
                  <th className="p-2 border-r-2 border-r-white whitespace-nowrap"> Chat</th>
                  <th className="p-3 whitespace-nowrap">Delete user</th>
                </tr>
              </thead>
              <tbody>
                {
                  allUser.map((user) => {
                    return (
                      <tr key={user._id} className="h-12 border-b-2 border-b-gray-600">
                        <td className="text-center text-yellow-400 bg-slate-800">{user.userName}</td>
                        <td className="text-center text-white bg-slate-800">
                          <a href="mailto:subhranil@itobuz.com" target="_blank">
                            {user.email}
                          </a>
                        </td>
                        <td className="text-center text-white bg-slate-800">
                          <button className="pt-3 hover:scale-105" onClick={() => handleAddNote(user._id)}>
                            <IoIosAddCircleOutline size={25} color="green" />
                          </button>
                        </td>
                        <td className="text-center text-white bg-slate-800">
                          <button className="pt-3 hover:scale-105" onClick={() => handleChatNavigation(user._id)}>
                            <IoChatbubbleEllipsesOutline size={25} color="white" />
                          </button>
                        </td>
                        <td className="text-center text-white bg-slate-800">
                          <button className="pt-3 hover:scale-105" onClick={() => handleDeleteUser(user._id)}>
                            <MdDelete size={25} color="red" />
                          </button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
              <caption className="text-sm py-2 text-white opacity-90">
                Total: {allUser.length}
              </caption>
            </table>
          </div>
      }
    </div >
  )
}

export default UsersTable