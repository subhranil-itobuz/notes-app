import jwt from 'jsonwebtoken'

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(404).json({
                success: false,
                message: "User is not authenticated"
            })
        }

        jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
            if (error) {
                throw new Error(error.message);
            }
            else {
                const userId = decoded.userId

                if (!decoded) {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid token"
                    })
                }

                req.id = userId
                next()
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export default isAuthenticated