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
  const [updatingNote, setUpdatingNote] = useState({})
  const [pageNotes, setPageNotes] = useState([])
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(6)

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

  const updateNoteFunction = async (updatedData) => {
    try {
      console.log('inside conteext update function')
      console.log(noteId)
      const res = await axios.put(`${NOTES_API_ENDPOINT}/update/${noteId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      })

      console.log(res)
      return res

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
      pageNotes,
      setPageNotes,
      keyword,
      setKeyword,
      page,
      setPage,
      limit,
      setLimit,
      deleteNoteFunction,
      noteId,
      setNoteId,
      updateNoteFunction,
      updatingNote,
      setUpdatingNote
    }}>
      {props.children}
    </NotesContext.Provider>
  )
}

export { NotesProvider, NotesContext }
