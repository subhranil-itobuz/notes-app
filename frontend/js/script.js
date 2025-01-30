console.log('js loaded');

const bodyContainer = document.querySelector('#bodyContainer')
const authBtn = document.querySelector('#authBtn')
const searchBtn = document.querySelector('#searchBtn')
const profileName = document.querySelector('#profileName')
const navProfile = document.querySelector('#navProfile')
const navNotes = document.querySelector('#navNotes')
const navTag = document.querySelector('#navTag')
const userNameCard = document.querySelector('#userNameCard')
const inputForm = document.querySelector('#inputForm')
const submitBtn = document.querySelector('#submitBtn')
const title = document.querySelector('#title')
const description = document.querySelector('#description')
const tag = document.querySelector('#tag')
const noteFormInput = document.querySelectorAll('.noteFormInput')
const resultSection = document.querySelector('#resultSection')
const resultSectionHeader = document.querySelector('#resultSectionHeader')
const resultContainer = document.querySelector('#resultContainer')
const prevBtn = document.querySelector('#prevBtn')
const nextBtn = document.querySelector('#nextBtn')
const updateForm = document.querySelector('#updateForm')
const modalTitle = document.querySelector('#modalTitle')
const modalTag = document.querySelector('#modalTag')
const modalDescription = document.querySelector('#modalDescription')
const modalCloseBtn = document.querySelector('#modalCloseBtn')
const updateBtn = document.querySelector('#updateBtn')
const logoutBtn = document.querySelector('#logoutBtn')
const deleteAllBtn = document.querySelector('#deleteAllBtn')
const deleteModalCloseBtn = document.querySelector('#deleteModalCloseBtn')
const searchBar = document.querySelector('#searchBar')

const alertContainer = document.createElement('div')

const submitBtnChild = submitBtn.children[0]


const userEndPoint = 'http://localhost:3000/api/user'
const notesEndPoint = 'http://localhost:3000/api/notes'

let userDetails = {}

let userAlive = false

let validData = false
const notesRegex = /[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/

let allNotes = []
let note = {}

let keyword = ''
let page = 1

let currentResults = 0
let totalResults = 0

let updateNoteId = ''

let wantNotesAlert = true
let wantUserAlert = true

//days ago calculation function
const daysAgoFunction = (mongoDbTime) => {
    const createdAt = new Date(mongoDbTime)
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60))
}

//alert on page funtion
const showAlert = (message, type) => {
    const alertDiv = document.createElement('div')
    const alertIcon = document.createElement('img')
    const alertText = document.createElement('div')

    alertContainer.setAttribute('class', 'body-container-alert  position-absolute top-0 start-50 translate-middle-x z-2 pt-1')

    alertDiv.setAttribute('class', ` alert alert-${type} alert-dismissible d-flex align-items-center justify-content-center gap-3 fw-medium shadow`)
    alertDiv.setAttribute('role', 'alert')

    alertIcon.setAttribute('src', `./images/${type}.svg`)

    alertText.setAttribute('class', 'body-container-alert-text overflow-auto')
    alertText.innerHTML = message

    alertDiv.append(alertIcon, alertText)
    alertContainer.append(alertDiv)

    setTimeout(() => {
        alertDiv.remove()
    }, 3500);
}

//get active user function
const getUserHandler = async (wantAlert) => {
    try {
        const res = await fetch(`${userEndPoint}/getUser`, {
            method: "GET",
            credentials: 'include',
        })

        const jsonData = await res.json()
        console.log(jsonData)
        userDetails = jsonData

        if (jsonData.success) {
            userNameCard.innerHTML = `Hello, ${jsonData.data.userName}`

            // wantAlert ? showAlert(jsonData.message, 'success') : ''
            wantAlert ? showAlert(`Welcome, ${jsonData.data.userName}`, 'success') : ''
        }
        else {
            wantAlert ? showAlert(jsonData.message, 'danger') : ''
        }

    } catch (error) {
        console.error(error.message)
        wantAlert ? showAlert(error.message, 'warning') : ''
    }
}

//get all notes of the active user function
const getAllNoteHandler = async (keyword, page, wantAlert) => {
    try {
        const res = await fetch(`${notesEndPoint}/getAllNotes?keyword=${keyword}&page=${page}`, {
            method: "GET",
            credentials: 'include'
        })

        const jsonData = await res.json()

        if (jsonData.success) {
            allNotes = jsonData.data
            currentResults = jsonData.currentResults
            totalResults = jsonData.totalResults
            page = jsonData.pageNo

            console.log(allNotes)

            wantAlert ? showAlert(jsonData.message, 'success') : ''

        }
        else {
            allNotes = []
            wantAlert ? showAlert(jsonData.message, 'warning') : ''
        }

        return jsonData

    } catch (error) {
        console.error(error.message)
        showAlert(error.message, 'danger')
    }
}

//create a note req api call function
const createNoteRequest = async (data) => {
    try {
        const res = await fetch(`${notesEndPoint}/create`, {
            method: "POST",
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Credentials': "true",
                "Access-Control-Expose-Headers": "Set-Cookie"
            },
        })

        const jsonData = await res.json()
        console.log(jsonData)

        return jsonData

    } catch (error) {
        console.error(error.message)
        showAlert(error.message, 'danger')
    }
}

//buttons change with respect to the user login or not function
const btnChange = () => {
    const user = document.cookie.includes('token') && userDetails?.data.verified

    if (user) {
        authBtn.classList.add('d-none')
        searchBtn.classList.remove('d-none')
        profileName.classList.remove('d-none')
        navProfile.classList.remove('d-none')
        navNotes.classList.remove('d-none')
        navTag.classList.remove('d-none')
        inputForm.classList.remove('d-none')
        prevBtn.classList.remove('d-none')
        nextBtn.classList.remove('d-none')
        resultContainer.classList.remove('d-none')
    }
    else {
        authBtn.classList.remove('d-none')
        searchBtn.classList.add('d-none')
        profileName.classList.add('d-none')
        navProfile.classList.add('d-none')
        navNotes.classList.add('d-none')
        navTag.classList.add('d-none')
    }

    userAlive = user
}

//check the note form data is valid or not function
const formValid = () => {
    try {
        if (!title.value || !description.value) {
            validData = false
            throw new Error("Something is missing");
        }

        else if (title.value.length < 4 || title.value.length > 15) {
            validData = false
            throw new Error("Title must be 4-15 characters long");
        }

        else if (tag?.value.length > 8) {
            validData = false
            throw new Error("Tag must be 3-8 character long");
        }

        else if (description.value.length < 4) {
            validData = false
            throw new Error("Description is too small");
        }

        else if (notesRegex.test(title.value) || notesRegex.test(tag?.value)) {
            validData = false
            throw new Error("Special character is not allowed");
        }
        else {
            validData = true
        }

    } catch (error) {
        console.error(error.message)
        showAlert(error.message, 'danger')
    }
}

console.log(notesRegex.test(title.value))

//submit btn function to add a note
const submitHandler = async (e) => {
    console.log('inside submit function')
    e.preventDefault()

    const formData = {
        title: note.title,
        tag: note?.tag || 'general',
        description: note.description
    }

    console.log('Creating form data')
    console.log(formData)

    const response = await createNoteRequest(formData)

    submitBtnChild.classList.remove('spinner-border')
    submitBtn.classList.remove('disabled')
    submitBtnChild.innerText = 'Add Note'
    console.log('Loading stop')

    if (response.success) {
        inputForm.reset()
        note = {}
        await getAllNoteHandler(keyword, page)
        resultContainer.innerHTML = ''
        totalResults > 6 ? nextBtn.classList.remove('disabled') : nextBtn.classList.add('disabled')

        allNotes?.forEach((item, index) => {
            resultContainer.append(cardCreateHandler(item.title, item.description, item.tag, item.createdAt, index))
        })

        resultSectionHeader.innerHTML = `Notes (${currentResults})`

        showAlert(response.message, 'success')
    }
    else {
        console.log('response came here inside else')
        // note = {}
        console.log('note cleaned')
        showAlert(response.message, 'warning')
    }
}

//function to handle delete of a note and call delete api
const deleteHandler = async (index) => {
    try {
        console.log('delete ' + index)
        const note = allNotes[index]
        console.log(note)
        const res = await fetch(`${notesEndPoint}/delete/${note._id}`, {
            method: "DELETE",
            credentials: 'include'
        })

        const jsondata = await res.json()
        console.log(jsondata)

        if (jsondata.success) {
            await getAllNoteHandler(keyword, page)
            resultContainer.innerHTML = ''
            allNotes?.forEach((item, index) => {
                resultContainer.append(cardCreateHandler(item.title, item.description, item.tag, item.createdAt, index))
            })
            resultSectionHeader.innerHTML = allNotes?.length === 0 || allNotes === undefined ? '*Add your 1st note' : `Notes (${currentResults})`

            totalResults > 6 ? nextBtn.classList.remove('disabled') : nextBtn.classList.add('disabled')
            page === Math.ceil(totalResults / 6) ? nextBtn.classList.add('disabled') : ''

            if (allNotes.length === 0 && page !== 0) {
                page = page - 1
                await getAllNoteHandler(keyword, page)
                resultContainer.innerHTML = ''
                resultSectionHeader.innerHTML = allNotes?.length === 0 || allNotes === undefined ? '*Add your 1st note' : `Notes (${currentResults})`
                allNotes?.forEach((item, index) => {
                    resultContainer.append(cardCreateHandler(item.title, item.description, item.tag, item.createdAt, index))
                })

                page === Math.ceil(totalResults / 6) ? nextBtn.classList.add('disabled') : ''
                page === 1 ? prevBtn.classList.add('disabled') : ''
            }

            console.log('last note to be deleted')
            console.log('Delete done')
            showAlert(jsondata.message, 'success')
            console.log(allNotes)
        } else {
            showAlert(jsondata.message, 'warning')
        }
    } catch (error) {
        console.error(error.message)
        showAlert(error.message, 'danger')
    }
}

//function to handle update request api call
const updateRequest = async (noteId, data) => {
    try {
        const res = await fetch(`${notesEndPoint}/update/${noteId}`, {
            method: "PUT",
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Credentials': "true",
                "Access-Control-Expose-Headers": "Set-Cookie"
            },
        })

        const jsonData = await res.json()
        console.log(jsonData)
        return jsonData
    } catch (error) {
        console.error(error.message)
        showAlert(error.message, 'danger')
    }
}

//function to handle the edit button click
const editHandler = async (index) => {
    console.log('edit at' + index)
    const note = allNotes[index]
    updateNoteId = note._id

    console.log(note)

    modalTitle.value = note.title
    modalTag.value = note.tag
    modalDescription.value = note.description
}

//create a note card function
const cardCreateHandler = (title, description, tag, timestamp, index) => {
    const noteCard = document.createElement('div')
    const cardHead = document.createElement('div')
    const cardBody = document.createElement('div')
    const cardFooter = document.createElement('div')
    const tagDiv = document.createElement('div')
    const timeDiv = document.createElement('div')
    const cardHeadTitle = document.createElement('span')
    const deleteIcon = document.createElement('img')
    const editIcon = document.createElement('img')

    deleteIcon.setAttribute('src', './images/delete.svg')
    editIcon.setAttribute('src', './images/edit.svg')
    cardHeadTitle.innerHTML = title

    deleteIcon.setAttribute('class', 'btn px-0')
    editIcon.setAttribute('class', 'btn px-0')

    deleteIcon.setAttribute('onClick', `deleteHandler(${index})`)
    editIcon.setAttribute('onClick', `editHandler(${index})`)
    editIcon.setAttribute("data-bs-toggle", "modal")
    editIcon.setAttribute("data-bs-target", "#staticBackdropUpdate")

    cardHead.setAttribute('class', 'card-header text-center result-container-card-header text-warning fw-bold d-flex justify-content-between align-items-center')

    cardBody.setAttribute('class', 'card-body result-container-card-body')
    cardBody.innerHTML = description

    cardFooter.setAttribute('class', 'card-footer py-1 d-flex justify-content-between result-container-card-footer')

    tagDiv.setAttribute('class', 'result-container-card-footer-tag text-primary fw-lighter')
    tagDiv.innerHTML = tag

    timeDiv.setAttribute('class', 'text-secondary fw-lighter')
    timeDiv.innerHTML = `${daysAgoFunction(timestamp)} days ago`

    noteCard.setAttribute('class', 'card result-container-card')
    noteCard.setAttribute('data-bs-theme', 'dark')

    cardHead.append(deleteIcon, cardHeadTitle, editIcon)
    cardFooter.append(tagDiv, timeDiv)
    noteCard.append(cardHead, cardBody, cardFooter)

    return noteCard
}

//update button funcationality handle
updateBtn.addEventListener('click', async () => {

    console.log('update btn clicked')

    const updatedNote = {
        title: modalTitle.value,
        description: modalDescription.value,
        tag: modalTag.value
    }

    const res = await updateRequest(updateNoteId, updatedNote)

    if (res.success) {
        console.log('update done')
        modalCloseBtn.click()

        await getAllNoteHandler(keyword, page)
        resultContainer.innerHTML = ''
        resultSectionHeader.innerHTML = `Notes (${currentResults})`
        allNotes?.forEach((item, index) => {
            resultContainer.append(cardCreateHandler(item.title, item.description, item.tag, item.createdAt, index))
        })

        showAlert(res.message, 'success')
    }
    else {
        showAlert(res.message, 'warning')
    }
})

//set note based on input change
noteFormInput.forEach((item) => {
    item.addEventListener('input', (e) => {
        note = { ...note, [e.target.name]: e.target.value.replace(/\s+/g, ' ').trim() }
        console.log('after input change')
        console.log(note)
    })
})

//submit button functionality handle
submitBtn.addEventListener('click', async (e) => {
    try {
        // e.preventDefault()
        console.log('loading start')
        formValid()

        if (validData) {
            console.log('insde valid')

            submitBtnChild.classList.add('spinner-border')
            submitBtn.classList.add('disabled')
            submitBtnChild.innerText = ''
            console.log('before invoke event')
            inputForm.addEventListener('submit', submitHandler)
            console.log('after invoke event')
        }
        else {
            console.log('inside else part of submitbtn')
            // submitBtn.removeEventListener('click', submitFunction)
            inputForm.removeEventListener('submit', submitHandler)
        }
    } catch (error) {
        console.error(error.message)
        showAlert(error.message, 'danger')
    }
})

deleteAllBtn.addEventListener('click', async () => {
    try {
        const res = await fetch(`${notesEndPoint}/deleteAll`, {
            method: "DELETE",
            credentials: 'include'
        })

        const jsonData = await res.json()
        console.log(jsonData)

        if (jsonData.success) {
            console.log(jsonData.message)
            resultSectionHeader.innerHTML = '*Add your 1st note'
            resultContainer.innerHTML = ''
            prevBtn.classList.add('disabled')
            nextBtn.classList.add('disabled')
            showAlert(jsonData.message, 'success')
        }
        else {
            console.log(jsonData.message)
            showAlert(jsonData.message, 'warning')
        }

        deleteModalCloseBtn.click()
    } catch (error) {
        console.log(error.message)
        showAlert(error.message, 'danger')
        deleteModalCloseBtn.click()
    }
})

//logout button functionality handle
logoutBtn.addEventListener('click', async () => {
    try {
        const res = await fetch(`${userEndPoint}/logout`, {
            method: "GET",
            credentials: 'include',
        })
        const jsonData = await res.json()
        console.log(jsonData)
        window.location = '../index.html'
        // showAlert(jsonData.message, 'success')

    } catch (error) {
        console.error(error.message)
        // showAlert(error.message, 'warning')
    }
})

//previous button functionality handle
prevBtn.addEventListener('click', async () => {
    if (page !== 1) {
        page = page - 1
        await getAllNoteHandler(keyword, page, false)
        resultContainer.innerHTML = ''
        resultSectionHeader.innerHTML = `Notes (${currentResults})`
        allNotes?.forEach((item, index) => {
            resultContainer.append(cardCreateHandler(item.title, item.description, item.tag, item.createdAt, index))
        })

        page === 1 ? prevBtn.classList.add('disabled') : ''
        page !== Math.floor(totalResults / 6) + 1 ? nextBtn.classList.remove('disabled') : nextBtn.classList.add('disabled')
    }
})

//next button functionality handle
nextBtn.addEventListener('click', async () => {
    if (page !== Math.floor(totalResults / 6) + 1) {
        page = page + 1
        await getAllNoteHandler(keyword, page, false)
        resultContainer.innerHTML = ''
        resultSectionHeader.innerHTML = `Notes (${currentResults})`
        allNotes?.forEach((item, index) => {
            resultContainer.append(cardCreateHandler(item.title, item.description, item.tag, item.createdAt, index))
        })

        page === Math.ceil(totalResults / 6) ? nextBtn.classList.add('disabled') : ''

        page > 1 ? prevBtn.classList.remove('disabled') : ''
        console.log(page)
    }
})

//search functionality
searchBar.addEventListener('input', async () => {
    keyword = searchBar.value.trim().replace(/\s+/g, ' ')
    const res = await getAllNoteHandler(keyword, page, false)
    console.log(allNotes)

    if (res.success) {
        resultContainer.innerHTML = ''
        resultSectionHeader.innerHTML = keyword.length !== 0 ? `Search Result (${currentResults})` : `Notes (${currentResults})`
        allNotes?.forEach((item, index) => {
            resultContainer.append(cardCreateHandler(item.title, item.description, item.tag, item.createdAt, index))
        })

        console.log('total result:' + currentResults)

        currentResults < 6 ? nextBtn.classList.add('disabled') : nextBtn.classList.remove('disabled')
    }
    else {
        console.log('no notes to display')
        resultContainer.innerHTML = ''
        resultSectionHeader.innerHTML = 'No notes to Display'
    }
})

//handle funcationality on load of the window
window.addEventListener('load', async () => {

    resultSectionHeader.innerHTML = 'Loading....'

    !document.cookie.includes('token') ? wantNotesAlert = wantUserAlert = false : ''

    await getUserHandler(wantUserAlert)
    await getAllNoteHandler(keyword, page, wantNotesAlert)
    btnChange()

    resultSectionHeader.innerHTML = !userAlive ? "*Please login or signup first to add note" : allNotes?.length === 0 || allNotes === undefined ? '*Add your 1st note' : `Notes (${currentResults})`

    allNotes?.forEach((item, index) => {
        resultContainer.append(cardCreateHandler(item.title, item.description, item.tag, item.createdAt, index))
    })

    totalResults > 6 ? nextBtn.classList.remove('disabled') : nextBtn.classList.add('disabled')
    page === Math.ceil(totalResults / 6) ? nextBtn.classList.add('disabled') : ''

    console.log('totalResults = ' + totalResults)

    bodyContainer.prepend(alertContainer)
})