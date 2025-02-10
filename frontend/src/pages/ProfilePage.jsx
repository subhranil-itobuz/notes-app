import { useContext, useEffect } from "react"
import Navbar from "../components/Navbar"
import Profile from "../components/Profile"
import { UserContext } from "../contexts/UserContext"
import UserNameChangeModal from "../components/UserNameChangeModal"
import PasswordUpdateModal from "../components/PasswordUpdateModal"
import DeleteAllNotesModal from "../components/DeleteAllNotesModal"
import { NotesContext } from "../contexts/NotesContext"
import ProfilePictureUpdateModal from "../components/ProfilePictureUpdateModal"

const ProfilePage = () => {
  const { openUserNameUpdateModal, getUser, openPasswordUpdateModal, openProfilePhotoUpdateModal } = useContext(UserContext)
  const { openDeleteAllNotesModal } = useContext(NotesContext)

  useEffect(() => {
    const getUserDetails = async () => {
      const user = await getUser()
      console.log(user)
    }

    getUserDetails()

    // eslint-disable-next-line  
  }, [openUserNameUpdateModal, openProfilePhotoUpdateModal])

  return (
    <div>
      <Navbar />
      <Profile />

      {openUserNameUpdateModal && <UserNameChangeModal />}
      {openPasswordUpdateModal && <PasswordUpdateModal />}
      {openDeleteAllNotesModal && <DeleteAllNotesModal />}
      {openProfilePhotoUpdateModal && <ProfilePictureUpdateModal />}
    </div>
  )
}

export default ProfilePage