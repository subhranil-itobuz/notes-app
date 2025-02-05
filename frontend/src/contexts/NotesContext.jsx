import axios from 'axios'
import React, { useContext, useState } from 'react'
import { NOTES_API_ENDPOINT } from '../utils/endPoints'
import { AuthContext } from './AuthContext'
import { toast } from 'react-toastify'

const NotesContext = React.createContext()

const NotesProvider = (props) => {
  const [note, setNote] = useState()
  const[allNotes, setAllNotes] = useState([])
  const{refreshToken} = useContext(AuthContext)

  const createNotes = async (data) => {
    try {
      console.log('inside create note func')
      const res = await axios.post(`${NOTES_API_ENDPOINT}/create`, data, {
        headers:{
          Authorization:`Bearer ${refreshToken}`
        }
      })
      if(res.data.success) {
        console.log(res.data.message)
        setNote(res.data.data)
        return res
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response.data.message)
    }
  }

  const getAllNotesFunction = async () => {
    try {
      console.log('inside get all notes')
      const res = await axios.get(`${NOTES_API_ENDPOINT}/getAllNotes`, {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      })

      console.log(res)
      setAllNotes(res.data.data)
      return res.data.data
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <NotesContext.Provider value={{ createNotes, note, getAllNotesFunction, allNotes }}>
      {props.children}
    </NotesContext.Provider>
  )
}

export { NotesProvider, NotesContext }
