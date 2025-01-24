import jwt from 'jsonwebtoken'

const isAuthenticated = async (req, res, next) => {
    try {
        const token = await req.cookies.token

        if (!token) {
            return res.status(404).json({
                success: false,
                message: "User is not authenticated"
            })
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY)

        if (!decode) {
            return res.status(400).json({
                success: false,
                message: "Invalid token"
            })
        }

        req.id = decode.userId
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export default isAuthenticated