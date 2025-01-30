console.log('Signup script')

const bodyContainer = document.querySelector('#bodyContainer')
const signupBtn = document.querySelector("#signupBtn")
const signupForm = document.querySelector('#signupForm')
const userName = document.querySelector('#userName')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const confirmPassword = document.querySelector('#confirmPassword')
const eyeBtn = document.querySelectorAll('.eyeBtn')
const strengthIndicator = document.querySelector('#strengthIndicator')
const checkSign = document.querySelector('#checkSign')

const signupBtnChild = signupBtn.children[0]
const alertContainer = document.createElement('div')

const signupApi = 'http://localhost:3000/api/user/signup'

let validData = false

let userData = {}

//show alert function
const showAlert = (message, type) => {
    const alertDiv = document.createElement('div')
    const alertIcon = document.createElement('img')
    const alertText = document.createElement('div')

    alertContainer.setAttribute('class', 'body-container-alert  position-absolute top-0 start-50 translate-middle-x z-2')

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

//function to check the signup form is valid or not
const formValid = () => {
    try {
        if (!userName.value || !email.value || !password.value || !confirmPassword.value) {
            validData = false
            throw new Error("Something is missing");
        }

        if (password.value !== confirmPassword.value) {
            validData = false
            throw new Error("Password is not matched");
        }

        if (userName.value.length < 4 && userName.value.length > 15) {
            validData = false
            throw new Error("Username must be between 4-15 characters");
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
        console.error(error.message)
    }
}

//function to call the signup api
const postRequest = async (data) => {
    try {
        const res = await fetch(signupApi, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:5500"
            },
            withCredentials: true,
        })

        const jsonData = await res.json()
        console.log(jsonData)

        return jsonData

    } catch (error) {
        console.error(error.message)
        showAlert(error.message, 'danger')
    }
}

//function for submit button
const submitHandler = async (e) => {
    e.preventDefault()
    userData = Object.fromEntries(new FormData(e.target).entries())

    const response = await postRequest(userData)

    signupBtnChild.classList.remove('spinner-border')
    signupBtn.classList.remove('disabled')
    signupBtnChild.innerText = 'Signup'
    console.log('loading stop')

    if (response.success) {
        signupForm.reset()
        showAlert(response.message, 'success')
        window.location = '../login.html'
    }
    else {
        showAlert(response.message, 'warning')
    }
}

//function to check the password and confirm password is matched
const passswordMatched = () => {
    if (confirmPassword.value === password.value) {
        confirmPassword.setCustomValidity("")
    } else {
        confirmPassword.setCustomValidity("Invalid field.")
    }
}

//handle signup button funcationality
signupBtn.addEventListener('click', () => {
    try {
        console.log('loading start')
        formValid()
        if (!validData) {
            signupForm.removeEventListener('submit', submitHandler)
        }
        else {
            signupBtnChild.classList.add('spinner-border')
            signupBtn.classList.add('disabled')
            signupBtnChild.innerText = ''
            signupForm.addEventListener('submit', submitHandler)
        }
    } catch (error) {
        console.error(error.message)
    }
})

//handle password field funcationality for password match
password.addEventListener('input', passswordMatched)

//handle confirm password field funcationality for password match
confirmPassword.addEventListener('input', passswordMatched)

//show or hide password functionality
eyeBtn.forEach((element) => {
    element.addEventListener('click', () => {
        const inputElement = element.parentElement.children[0]
        const type = inputElement.getAttribute('type') === 'password' ? 'text' : 'password'

        inputElement.setAttribute('type', type)

        if (element.children[0].src.includes('eyeSlash')) {
            element.children[0].src = './images/eye.svg'
        }
        else {
            element.children[0].src = './images/eyeSlash.svg'
        }
    })
})

//password strength evaluation function event
password.addEventListener('input', () => {
    let point = 0
    const value = password.value

    const rangeObj = {
        value: ['1%', '25%', '50%', '75%', '100%'],
        color: ['#504d4d', '#b94a4a', '#cd712f', '#b7df19', '#29ff03']
    }

    const passwordRegex = [/(?=.*?[A-Z])/, /(?=.*?[a-z])/, /(?=.*?[0-9])/, /(?=.*?[#?!@.$%^&*-])/]

    if (value.length >= 5) {
        passwordRegex.forEach(item => {
            if (item.test(value))
                point += 1
        })
    }

    strengthIndicator.style.width = rangeObj.value[point]
    strengthIndicator.style.backgroundColor = rangeObj.color[point]
})

//adding check sign after check the same password
confirmPassword.addEventListener('input', () => {
    if (password.value === confirmPassword.value) {
        checkSign.classList.remove('d-none')
    }
    else
        checkSign.classList.add('d-none')
})

//redirect to the main page if the user is already logged in
window.addEventListener('load', () => {
    const user = document.cookie.includes('token')
    bodyContainer.prepend(alertContainer)

    if (user) {
        window.location = './index.html'
    }
})