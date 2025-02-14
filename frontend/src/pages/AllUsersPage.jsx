import { useContext } from "react"
import Navbar from "../components/Navbar"
import UserDeleteModal from "../components/UserDeleteModal"
import UsersTable from "../components/UsersTable"
import { AdminContext } from "../contexts/AdminContext"
import { UserContext } from "../contexts/UserContext"

const AllUsersPage = () => {
  const { openUserDeleteModal, setOpenUserDeleteModal } = useContext(AdminContext)
  const { user } = useContext(UserContext)

  return (
    <>
      <Navbar user={user} />
      <UsersTable />
      {
        openUserDeleteModal && <UserDeleteModal openUserDeleteModal={openUserDeleteModal} setOpenUserDeleteModal={setOpenUserDeleteModal} />
      }
    </>
  )
}

export default AllUsersPage