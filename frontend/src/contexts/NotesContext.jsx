import axios from 'axios'
import React, { useContext, useState } from 'react'
import { NOTES_API_ENDPOINT } from '../utils/endPoints'
import { AuthContext } from './AuthContext'
import { toast } from 'react-toastify'

const NotesContext = React.createContext()

const NotesProvider = (props) => {
  const [note, setNote] = useState()
  const [allNotes, setAllNotes] = useState([])
  const [noteId, setNoteId] = useState()
  const [totalResults, setTotalResults] = useState(0)

  const { refreshToken } = useContext(AuthContext)

  const createNotes = async (data) => {
    try {
      console.log('inside create note func')
      const res = await axios.post(`${NOTES_API_ENDPOINT}/create`, data, {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      })
      if (res.data.success) {
        console.log(res.data.message)
        setNote(res.data.data)
        setTotalResults(res.data.totalResults)
        console.log(totalResults)
        return res
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response.data.message)
    }
  }

  const getAllNotesFunction = async (keyword, page, limit) => {
    try {
      console.log('inside get all notes')
      const res = await axios.get(`${NOTES_API_ENDPOINT}/getAllNotes?keyword=${keyword}&page=${page}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      })

      if (res?.data.success) {
        console.log(res)
        setAllNotes(res?.data.data)
        setTotalResults(res?.data.totalResults)
        console.log(totalResults)
        return res
      }
      else {
        setAllNotes([])
      }
    } catch (error) {
      console.log('inside error of get all notes')
      setAllNotes([])
      console.log(error)
    }
  }

  const deleteNoteFunction = async () => {
    try {
      console.log('inside context delete function')
      const res = await axios.delete(`${NOTES_API_ENDPOINT}/delete/${noteId}`, {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      })

      if (res.data.success) {
        console.log(res.data.message)
        return res
      }

    } catch (error) {
      console.error(error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <NotesContext.Provider value={{
      createNotes,
      totalResults,
      setTotalResults,
      note,
      getAllNotesFunction,
      allNotes,
      deleteNoteFunction,
      noteId,
      setNoteId
    }}>
      {props.children}
    </NotesContext.Provider>
  )
}

export { NotesProvider, NotesContext }
