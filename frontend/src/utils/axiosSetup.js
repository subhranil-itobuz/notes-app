import axios from 'axios'
import { CHAT_API_ENDPOINT, NOTES_API_ENDPOINT, USER_API_ENDPOINT } from './endPoints'

const userInstance = axios.create({
    baseURL: USER_API_ENDPOINT
})

const notesInstance = axios.create({
    baseURL: NOTES_API_ENDPOINT
})

const chatInstance = axios.create({
    baseURL: CHAT_API_ENDPOINT
})

notesInstance.interceptors.request.use((req) => {
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) req.headers['Authorization'] = `Bearer ${accessToken}`

    return req

}, (error) => error)

userInstance.interceptors.request.use(req => {
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) req.headers['Authorization'] = `Bearer ${accessToken}`

    return req

}, error => error)

chatInstance.interceptors.request.use(req => {
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) req.headers['Authorization'] = `Bearer ${accessToken}`

    return req

}, error => error)

notesInstance.interceptors.response.use(res => res, async (error) => {
    const originalReq = error.config
    if (error.status === 401 && !originalReq._retry) {
        originalReq._retry = true

        try {
            const refreshToken = localStorage.getItem('refreshToken')
            const res = await axios.get(`${USER_API_ENDPOINT}/regenerateAccessToken`, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            })

            const accessToken = res.data.accessToken
            localStorage.setItem('accessToken', accessToken)

            originalReq.headers.Authorization = `Bearer ${accessToken}`
            return axios(originalReq)

        } catch (error) {
            console.error(error)
        }
    }

    return Promise.reject(error)
})

userInstance.interceptors.response.use(res => res, async (error) => {
    const originalReq = error.config
    if (error.status === 401 && !originalReq._retry) {
        originalReq._retry = true

        try {
            const refreshToken = localStorage.getItem('refreshToken')
            const res = await axios.get(`${USER_API_ENDPOINT}/regenerateAccessToken`, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            })

            const accessToken = res.data.accessToken
            localStorage.setItem('accessToken', accessToken)

            originalReq.headers.Authorization = `Bearer ${accessToken}`

            return axios(originalReq)

        } catch (error) {
            console.error(error)
        }
    }

    return Promise.reject(error)
})

chatInstance.interceptors.response.use(res => res, async (error) => {
    const originalReq = error.config
    if (error.status === 401 && !originalReq._retry) {
        originalReq._retry = true

        try {
            const refreshToken = localStorage.getItem('refreshToken')
            const res = await axios.get(`${USER_API_ENDPOINT}/regenerateAccessToken`, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            })

            const accessToken = res.data.accessToken
            localStorage.setItem('accessToken', accessToken)

            originalReq.headers.Authorization = `Bearer ${accessToken}`

            return axios(originalReq)

        } catch (error) {
            console.error(error)
        }
    }

    return Promise.reject(error)
})

export { userInstance, notesInstance, chatInstance }