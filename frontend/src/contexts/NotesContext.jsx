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
  const [debouncedQuary, setDebouncedQuary] = useState('')
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


  const createNotes = async (data) => {
    try {
      console.log('inside create note func')
      const res = await notesInstance.post(`${NOTES_API_ENDPOINT}/create`, data)
      console.log(res)
      if (res.data.success) {
        console.log(res.data.message)
        setNote(res.data.data)
        setTotalResults(res.data.totalResults)
        console.log(totalResults)
        return res
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  const getAllNotesFunction = async (keyword, page, limit) => {
    try {
      console.log('inside get all notes')
      console.log(page, limit)
      const res = await notesInstance.get(`${NOTES_API_ENDPOINT}/getAllNotes?keyword=${debouncedQuary}&page=${page}&limit=${limit}`)

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

  const getAllUserNotesFunction = async () => {
    try {
      console.log('inside all userNotes function in context')
      console.log(allUserNotes)

      const res = await notesInstance.get(`${NOTES_API_ENDPOINT}/getAllNotes?keyword=${debouncedQuary}&sortBy=${sortBy}&order=${order}&page=0&limit=0`)

      return res
    } catch (error) {
      console.log(error)
    }
  }

  const deleteNoteFunction = async () => {
    try {
      console.log('inside context delete function')
      const res = await notesInstance.delete(`${NOTES_API_ENDPOINT}/delete/${noteId}`)

      if (res.data.success) {
        console.log(res.data.message)
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
      console.log('inside conteext update function')
      console.log(noteId)
      const res = await notesInstance.put(`${NOTES_API_ENDPOINT}/update/${noteId}`, updatedData)

      if (res.data.success) {
        console.log(res)
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
      console.log('inside file upload function')
      console.log(noteId)
      const res = await notesInstance.post(`${NOTES_API_ENDPOINT}/file/upload/${noteId}`, data, {
        headers: {
          // 'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data'
        },
      })

      if (res.data.success) {
        console.log(res)
        setNoteId()
        return res
      }

    } catch (error) {
      console.log(error)
      toast.error(error.response?.data.message)
    }
  }

  const upateFileFunction = async (data) => {
    try {
      console.log('inside file update function')

      const res = await notesInstance.put(`${NOTES_API_ENDPOINT}/file/update/${noteId}`, data, {
        headers: {
          // 'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data'
        }
      })

      if (res.data.success) {
        console.log(res)
        setNoteId()
        return res
      }

    } catch (error) {
      console.log(error)
      toast.error(error.response?.data.message)
    }
  }

  const deleteFileFunction = async () => {
    try {
      console.log('inside file delete function')
      const res = await notesInstance.delete(`${NOTES_API_ENDPOINT}/file/delete/${noteId}`)

      if (res.data.success) {
        console.log(res)
        setNoteId()
        return res
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data.message)
    }
  }

  const deleteAllNotesFunction = async () => {
    try {
      console.log('inside context delete all notes func')
      const res = await notesInstance.delete(`${NOTES_API_ENDPOINT}/deleteAll`)

      return res

    } catch (error) {
      console.log(error)
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
      debouncedQuary,
      setDebouncedQuary,
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
      upateFileFunction,
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
