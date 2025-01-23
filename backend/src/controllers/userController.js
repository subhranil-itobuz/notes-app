import userModel from "../models/userModel.js"
import userSchemaValidation from "../validator/zodValidate.js"

//signup function
export const signUp = async (req, res) => {
  try {
    const { userName, email, password, confirmPassword } = req.body

    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Something is missing"
      })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'password is not maching'
      })
    }

    const oldUser = await userModel.findOne({ email })

    if (oldUser) {
      return res.status(400).json({
        success: false,
        message: 'Account is already exists with this email'
      })
    }

    const user = {
      userName ,
      email,
      password
    }

    const validUser = userSchemaValidation.safeParse(user)

    if (validUser.success) {
      await userModel.create(user)

      return res.status(200).json({
        success: true,
        message: 'Account created successfully',
        data: user
      })
    }
    else {
      console.log(validUser.success)
      return res.status(400).json({
        success: false,
        message: validUser.error
      })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Something is missing"
      })
    }

    const user = await userModel.findOne({ email })
    console.log(user.userName)

    return res.status(200).json({
      success: true,
      message: `Wellcome ${user.userName}`
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    })
  }
}