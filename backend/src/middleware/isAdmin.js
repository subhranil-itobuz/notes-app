import userModel from "../models/userModel.js"

const isAdmin = async (req, res, next) => {
  try {
    const userId = req.id

    const user = await userModel.findById(userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User Not Found'
      })
    }

    if (user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: "Unauthorize access. Not a admin"
      })
    }

    next()
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export default isAdmin