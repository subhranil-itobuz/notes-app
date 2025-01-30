console.log('Login script')

const bodyContainer = document.querySelector('#bodyContainer')
const loginBtn = document.querySelector("#loginBtn")
const loginForm = document.querySelector("#loginForm")
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const eyeBtn = document.querySelector('.eyeBtn')

const loginBtnChild = loginBtn.children[0]

const loginApi = 'http://localhost:3000/api/user/login'

const alertContainer = document.createElement('div')

let validData = false
let userData = {}

const showAlert = (message, type) => {
    const alertDiv = document.createElement('div')
    const alertIcon = document.createElement('img')
    const alertText = document.createElement('div')

    alertContainer.setAttribute('class', 'body-container-alert  position-absolute top-0 start-50 translate-middle-x pt-2 z-2')

    alertDiv.setAttribute('class', ` alert alert-${type} alert-dismissible d-flex align-items-center justify-content-start gap-3 fw-medium shadow`)
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

//check the login form data is valid or not
const formValid = () => {
    try {
        if (!email.value || !password.value) {
            validData = false
            throw new Error("Something is missing");
        }

        if (!email.checkValidity()) {
            validData = false
            throw new Error("Email is not valid");
        }

        if (password.value.length <= 4) {
            validData = false
            throw new Error("Password is too small");
        }

        validData = true
    } catch (error) {
        console.log(error.message)
    }
}

//handle the login api call 
const postRequest = async (data) => {
    try {
        const res = await fetch(loginApi, {
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
    }
}

//handle the functionalities of submit button
const submitHandler = async (e) => {
    e.preventDefault()
    userData = Object.fromEntries(new FormData(e.target).entries())

    const response = await postRequest(userData)

    loginBtnChild.classList.remove('spinner-border')
    loginBtn.classList.remove('disabled')
    loginBtnChild.innerText = 'Login'
    console.log('loading stop')

    if (response.success) {
        loginForm.reset()
        showAlert(response.message, 'success')
        window.location = '../index.html'
    }
    else {
        showAlert(response.message, 'danger')
    }
}

//handle login btn funcationality
loginBtn.addEventListener('click', () => {
    try {
        console.log('loading start')
        formValid()
        if (!validData) {
            loginForm.removeEventListener('submit', submitHandler)
        }
        else {
            loginBtnChild.classList.add('spinner-border')
            loginBtn.classList.add('disabled')
            loginBtnChild.innerText = ''
            loginForm.addEventListener('submit', submitHandler)
        }
    } catch (error) {
        console.error(error.message)
    }
})

//view or hide the password functionality
eyeBtn.addEventListener('click', () => {
    const inputElement = eyeBtn.parentElement.children[0]
    const type = inputElement.getAttribute('type') === 'password' ? 'text' : 'password'

    inputElement.setAttribute('type', type)

    if (eyeBtn.children[0].src.includes('eyeSlash')) {
        eyeBtn.children[0].src = './images/eye.svg'
    }
    else {
        eyeBtn.children[0].src = './images/eyeSlash.svg'
    }
})

//rediret to the main page if the user is already  presentt
window.addEventListener('load', () => {
    const user = document.cookie.includes('token')
    bodyContainer.prepend(alertContainer)

    if (user) {
        window.location = './index.html'
    }
})