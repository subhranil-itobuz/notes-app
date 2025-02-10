import { useContext, useEffect } from "react"
import Navbar from "../components/Navbar"
import Profile from "../components/Profile"
import { UserContext } from "../contexts/UserContext"
import UserNameChangeModal from "../components/UserNameChangeModal"

const ProfilePage = () => {
  const { openUserNameUpdateModal, getUser } = useContext(UserContext)

  useEffect(() => {
    const getUserDetails = async () => {
      const user = await getUser()
      console.log(user)
    }

    getUserDetails()

    // eslint-disable-next-line  
  }, [openUserNameUpdateModal])

  return (
    <div>
      <Navbar />
      <Profile />

      {openUserNameUpdateModal && <UserNameChangeModal />}

    </div>
  )
}

export default ProfilePage