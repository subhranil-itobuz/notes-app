import React, { useState } from 'react'
import { NOTES_API_ENDPOINT } from '../utils/endPoints'
import { toast } from 'react-toastify'
import { notesInstance } from '../utils/axiosSetup'

const NotesContext = React.createContext()

const NotesProvider = (props) => {
  const [note, setNote] = useState()
  const [allNotes, setAllNotes] = useState([])
  const [noteId, setNoteId] = useState()
  const [totalResults, setTotalResults] = useState(0)
  const [updatingNote, setUpdatingNote] = useState({})
  const [pageNotes, setPageNotes] = useState([])
  const [keyword, setKeyword] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(6)
  const [allUserNotes, setAllUserNotes] = useState([])
  const [sortBy, setSortBy] = useState('')
  const [order, sortOrder] = useState('asc')
  const [openDeleteModal, setOpenDeleteModal] = useState()
  const [openUpdateModal, setOpenUpdateModal] = useState()
  const [openFileViewModal, setOpenFileViewModal] = useState()
  const [openFileUpdateModal, setOpenFileUpdateModal] = useState()
  const [openFileDeleteModal, setOpenFileDeleteModal] = useState()
  const [openDeleteAllNotesModal, setOpenDeleteAllNotesModal] = useState(false)
  const [fileUrl, setFileUrl] = useState('')
  const [currentFileUrl, setCurrentFileUrl] = useState('')


  const createNotes = async (data, targetUser) => {
    try {
      const res = await notesInstance.post(`${NOTES_API_ENDPOINT}/create/${targetUser}`, data)

      if (res.data.success) {
        setNote(res.data.data)
        setTotalResults(res.data.totalResults)
        return res
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response.data.message)
    }
  }

  const getAllNotesFunction = async (keyword, page, limit) => {
    try {
      const res = await notesInstance.get(`/getAllNotes?keyword=${debouncedQuery}&page=${page}&limit=${limit}`)

      if (res?.data.success) {
        setAllNotes(res?.data.data)
        setTotalResults(res?.data.totalResults)
        return res
      }
      else {
        setAllNotes([])
      }
    } catch (error) {
      console.error(error)
      setAllNotes([])
    }
  }

  const getAllUserNotesFunction = async () => {
    try {
      const res = await notesInstance.get(`/getAllNotes?keyword=${debouncedQuery}&sortBy=${sortBy}&order=${order}&page=0&limit=0`)

      return res
    } catch (error) {
      console.error(error)
    }
  }

  const deleteNoteFunction = async () => {
    try {
      const res = await notesInstance.delete(`${NOTES_API_ENDPOINT}/delete/${noteId}`)

      if (res.data.success) {
        setNoteId()
        return res
      }

    } catch (error) {
      console.error(error)
      toast.error(error.response.data.message)
    }
  }

  const updateNoteFunction = async (updatedData) => {
    try {
      const res = await notesInstance.put(`${NOTES_API_ENDPOINT}/update/${noteId}`, updatedData)

      if (res.data.success) {
        setNoteId()
        return res
      }

    } catch (error) {
      console.error(error)
      toast.error(error.response.data.message)
    }
  }

  const uploadFileFunction = async (data) => {
    try {
      const res = await notesInstance.post(`${NOTES_API_ENDPOINT}/file/upload/${noteId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })

      if (res.data.success) {
        setNoteId()
        return res
      }

    } catch (error) {
      console.error(error)
      toast.error(error.response?.data.message)
    }
  }

  const updateFileFunction = async (data) => {
    try {
      const res = await notesInstance.put(`${NOTES_API_ENDPOINT}/file/update/${noteId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (res.data.success) {
        setNoteId()
        return res
      }

    } catch (error) {
      console.error(error)
      toast.error(error.response?.data.message)
    }
  }

  const deleteFileFunction = async () => {
    try {
      const res = await notesInstance.delete(`${NOTES_API_ENDPOINT}/file/delete/${noteId}`)

      if (res.data.success) {
        setNoteId()
        return res
      }
    } catch (error) {
      toast.error(error.response?.data.message)
    }
  }

  const deleteAllNotesFunction = async () => {
    try {
      const res = await notesInstance.delete(`${NOTES_API_ENDPOINT}/deleteAll`)

      return res

    } catch (error) {
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
      getAllUserNotesFunction,
      allUserNotes,
      setAllUserNotes,
      keyword,
      setKeyword,
      debouncedQuery,
      setDebouncedQuery,
      page,
      setPage,
      limit,
      setLimit,
      sortBy,
      setSortBy,
      order,
      sortOrder,
      deleteNoteFunction,
      noteId,
      setNoteId,
      updateNoteFunction,
      updatingNote,
      setUpdatingNote,
      openDeleteModal,
      setOpenDeleteModal,
      openUpdateModal,
      setOpenUpdateModal,
      openFileViewModal,
      setOpenFileViewModal,
      openFileUpdateModal,
      setOpenFileUpdateModal,
      openFileDeleteModal,
      setOpenFileDeleteModal,
      openDeleteAllNotesModal,
      setOpenDeleteAllNotesModal,
      uploadFileFunction,
      updateFileFunction,
      deleteFileFunction,
      deleteAllNotesFunction,
      fileUrl,
      setFileUrl,
      currentFileUrl,
      setCurrentFileUrl
    }}>
      {props.children}
    </NotesContext.Provider>
  )
}

export { NotesProvider, NotesContext }
