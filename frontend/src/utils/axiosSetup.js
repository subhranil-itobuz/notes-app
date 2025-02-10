import axios from 'axios'
import { NOTES_API_ENDPOINT, USER_API_ENDPOINT } from './endPoints'

const userInstance = axios.create({
    baseURL: USER_API_ENDPOINT
})

const notesInstance = axios.create({
    baseURL: NOTES_API_ENDPOINT
})

notesInstance.interceptors.request.use((req) => {
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) req.headers['Authorization'] = `Bearer ${accessToken}`

    return req

}, (error) => error)

notesInstance.interceptors.response.use((res) => res,
    async (error) => {
        if (error.res?.status === 401) {
            const originalRequest = error.config;
            if (!originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const refreshToken = localStorage.getItem("refreshToken");
                    if (!refreshToken) {
                        throw new Error("No refresh token available");
                    }

                    const res = await axios.get(`${USER_API_ENDPOINT}/regenerateAccessToken`, {
                        headers: {
                            Authorization: `Bearer ${refreshToken}`
                        },
                    });

                    if (res.data.success) {
                        localStorage.setItem("accessToken", res.data.accessToken);
                        notesInstance.defaults.headers.common["Authorization"] = `Bearer ${res.data.accessToken}`;
                        originalRequest.headers["Authorization"] = `Bearer ${res.data.accessToken}`;
                        return notesInstance(originalRequest);
                    }
                } catch (refreshError) {
                    console.error("Token refresh failed", refreshError);
                }
            }
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("isLoggedIn");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    })

// notesInstance.interceptors.response.use(async (res) => {
//     console.log(res)
//     if (res.data.status === 401) {
//         console.log('inside instance interceptor if part')
//         const refreshToken = localStorage.getItem('refreshToken')
//         try {
//             const res = await axios.get(`${USER_API_ENDPOINT}/regenerateAccessToken`, {
//                 headers: `Bearer ${refreshToken}`
//             })

//             if (res.data.success) {
//                 console.log(res)
//                 const { accessToken } = res.data.accessToken
//                 localStorage.setItem('accessToken', accessToken)
//                 notesInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
//                 return notesInstance(res.config)
//             }
//             else {
//                 localStorage.removeItem('accessToken')
//                 localStorage.removeItem('refreshToken')
//                 localStorage.removeItem('isLoggedIn')
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     else return res

// })

export { userInstance, notesInstance }