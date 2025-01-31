import { mailSender } from "../mail/transporter.js"
import userModel from "../models/userModel.js"
import { passwordRegexValidation, userNameRegexValidation } from "../utils/regexMatch.js"
import { loginCredValidation, userSchemaValidation } from "../validator/userValidate.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//signup function
export const signUp = async (req, res) => {
  try {
    const { userName, email, password, confirmPassword } = req.body

    if (Object.keys(req.body).length > 4)
      throw new Error("Extra fields");

    userNameRegexValidation(userName.replace(/\s/g, '').trim())
    passwordRegexValidation(password.replace(/\s/g, '').trim())

    const userDetails = {
      userName: userName.replace(/\s/g, '').trim(),
      email,
      password: password.replace(/\s/g, '').trim()
    }

    const validUser = userSchemaValidation.safeParse(userDetails)

    if (!validUser.success) {
      return res.status(400).json({
        success: false,
        message: `${validNotes.error.issues[0].message} --> ${validNotes.error.issues[0].path}`
      })
    }

    if (password.replace(/\s/g, '').trim() !== confirmPassword.replace(/\s/g, '').trim()) {
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
    const hashedPassword = await bcrypt.hash(password.replace(/\s/g, '').trim(), salt);

    const token = jwt.sign({ data: email }, process.env.SECRET_KEY, { expiresIn: '10m' })

    const error = mailSender(token, email)

    console.log(error);

    const user = await userModel.create({
      userName: userName.replace(/\s/g, '').trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
      verified: false,
      token: token
    })

    return res.status(200).json({
      success: true,
      message: 'Account created successfully',
      advice: 'Please verify your email at earliest, you have 10 minuits to verify yourself',
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

    const validCred = loginCredValidation.safeParse({
      email,
      password: password.replace(/\s/g, '').trim()
    })

    if (!validCred.success) {
      return res.status(400).json({
        success: false,
        message: `${validNotes.error.issues[0].message} --> ${validNotes.error.issues[0].path}`
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

    const comparePassword = await bcrypt.compare(password.replace(/\s/g, '').trim(), user.password);

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
      .cookie('token', token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        secure: false,
        sameSite: "strict"
      })
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
      .clearCookie('token', {
        path: '/',
        httpOnly: true
      })
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

export const getUserDetails = async (req, res) => {
  try {
    const token = req.cookies.token

    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Token not found"
      })
    }

    jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
      if (error) {
        throw new Error(error.message);
      }
      else {
        const userId = decoded.userId

        const user = await userModel.findById(userId)

        if (!user) {
          return res.status(404).json({
            success: false,
            message: "User not found"
          })
        }

        return res.status(200).json({
          success: true,
          message: "User fetched successfully",
          data: user
        })
      }
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}