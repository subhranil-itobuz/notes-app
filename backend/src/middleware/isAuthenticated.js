import jwt from 'jsonwebtoken'

const isAuthenticated = async (req, res, next) => {
    try {
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export default isAuthenticated