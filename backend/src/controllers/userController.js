import { mailSender } from "../mail/transporter.js"
import userModel from "../models/userModel.js"
import { loginCredValidation, userSchemaValidation } from "../validator/userValidate.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//signup function
export const signUp = async (req, res) => {
  try {
    const { userName, email, password, confirmPassword } = req.body

    if (Object.keys(req.body).length > 4)
      throw new Error("Extra fields");

    const userDetails = { userName, email, password }
    const validUser = userSchemaValidation.safeParse(userDetails)

    if (!validUser.success) {
      return res.status(400).json({
        success: false,
        message: validUser.error
      })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'password is not maching'
      })
    }

    const oldUser = await userModel.findOne({
      email: email.toLowerCase()
    })

    if (oldUser) {
      return res.status(400).json({
        success: false,
        message: 'Account is already exists with this email'
      })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const token = jwt.sign({ data: email }, process.env.SECRET_KEY, { expiresIn: '10m' })

    mailSender(token, email)

    const user = await userModel.create({
      userName,
      email: email.toLowerCase(),
      password: hashedPassword,
      verified: false,
      token: token
    })

    return res.status(200).json({
      success: true,
      message: 'Account created successfully. Please verify your email at earliest',
      data: user
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

//email verify function
export const verifyUser = async (req, res) => {
  const { token } = req.params

  jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
    if (error) {
      console.log(error)
      res.send('"Email verification failed, possibly the link is invalid or expired"')
    }
    else {
      const email = decoded.data
      const user = await userModel.findOne({
        email: email.toLowerCase()
      })

      user.verified = true
      user.token = ''

      await user.save()

      res.send(`Email verified successfully, ${user.userName}`)
    }
  })
}

//resend verification link function
export const resendVerificationLink = async (req, res) => {
  try {
    const { email } = req.body;

    if (Object.keys(req.body).length > 1)
      throw new Error("Extra fields");

    const user = await userModel.findOne({
      email: email.toLowerCase()
    })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Please register yourself."
      })
    }

    if (user.verified) {
      return res.status(400).json({
        success: false,
        message: "Your are already verified. Please Log in to your account"
      })
    }

    const token = jwt.sign({ data: email }, process.env.SECRET_KEY, { expiresIn: '10m' })
    mailSender(token, email)

    return res.status(200).json({
      success: true,
      message: "Email send successfully"
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

//login function
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (Object.keys(req.body).length > 2)
      throw new Error("Extra fields");

    const validCred = loginCredValidation.safeParse({ email, password })

    if (!validCred.success) {
      return res.status(400).json({
        success: false,
        message: validCred.error
      })
    }

    const user = await userModel.findOne({
      email: email.toLowerCase()
    })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(400).json({
        success: false,
        message: "Password is not matching"
      })
    }

    if (!user.verified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your email first"
      })
    }

    const tokenData = { userId: user._id }
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' })

    return res.status(200)
      .cookie('token', token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' })
      .json({
        success: true,
        message: `Welcome ${user.userName}`
      })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

//logout function
export const logout = async (req, res) => {
  try {
    return res.status(200)
      .cookie('token', '', { maxAge: 0 })
      .json({
        success: true,
        message: 'Logout Successfully'
      })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}