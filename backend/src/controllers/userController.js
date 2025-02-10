import { mailSender } from "../mail/transporter.js"
import sessionsModel from "../models/sessionSchema.js"
import userModel from "../models/userModel.js"
import { passwordRegexValidation, userNameRegexValidation } from "../utils/regexMatch.js"
import { loginCredValidation, userSchemaValidation } from "../validator/userValidate.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import fs from 'fs'

//signup function
export const signUp = async (req, res) => {
  try {
    const { userName, email, password, confirmPassword } = req.body

    if (Object.keys(req.body).length > 4)
      throw new Error("Extra fields");

    const userDetails = {
      userName: userName.replace(/\s/g, '').trim(),
      email,
      password: password.replace(/\s/g, '').trim()
    }

    const validUser = userSchemaValidation.safeParse(userDetails)

    if (!validUser.success) {
      return res.status(400).json({
        success: false,
        message: `${validUser.error.issues[0].message} --> ${validUser.error.issues[0].path}`
      })
    }

    userNameRegexValidation(userName.replace(/\s/g, '').trim())
    passwordRegexValidation(password.replace(/\s/g, '').trim())

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

    await mailSender(token, email)

    const user = await userModel.create({
      userName: userName.replace(/\s/g, '').trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
      verified: false,
      token: token
    })

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      advice: 'Please verify your email at earliest, you have 10 minuits to verify yourself',
      token,
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
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(404).json({
      success: false,
      message: "Authorization header not found"
    })
  }

  const token = authorization.split(' ')[1]

  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Token not found"
    })
  }

  jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
    if (error) {
      return res.status(400).json({
        success: false,
        message: `${error.name} => ${error.message}`,
      }).send('Email verification problem')
    }
    else {
      const email = decoded.data
      const user = await userModel.findOne({
        email: email.toLowerCase()
      })

      user.verified = true
      user.token = ''

      await user.save()

      res.status(200).json({
        success: true,
        message: "Email verified successfully"
      })
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
        message: `${validCred.error.issues[0].message} --> ${validCred.error.issues[0].path}`
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

    const userId = user._id

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

    const accessToken = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '15m' })
    const refreshToken = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '7d' })

    await sessionsModel.create({ userId })

    user.status = 'online'
    await user.save()

    return res.status(200).json({
      success: true,
      message: `Welcome ${user.userName}`,
      accessToken,
      refreshToken
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

//regenerate access token function
export const regenerateAccessToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization
    const refreshToken = authHeader.split(' ')[1]

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized access."
      })
    }

    jwt.verify(refreshToken, process.env.SECRET_KEY, async (error, decoded) => {
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.message
        })
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

        const accessToken = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '15m' })

        return res.status(201).json({
          success: true,
          message: "Access token regenerated",
          accessToken
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

//logout function
export const logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(404).json({
        success: false,
        message: "Authorization header not found"
      })
    }

    const refreshToken = authHeader.split(' ')[1]

    if (!refreshToken) {
      return res.status(404).json({
        success: false,
        message: "Token not found"
      })
    }

    jwt.verify(refreshToken, process.env.SECRET_KEY, async (error, decoded) => {
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.message
        })
      }
      else {
        const { userId } = decoded

        await sessionsModel.deleteMany({ userId })

        return res.status(200).json({
          success: true,
          message: 'Logout successfully'
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

//get user details
export const getUserDetails = async (req, res) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(400).json({
        success: false,
        message: 'Auth header not found'
      })
    }

    const refreshToken = authHeader.split(' ')[1]

    if (!refreshToken) {
      return res.status(404).json({
        success: false,
        message: "Token not found"
      })
    }

    jwt.verify(refreshToken, process.env.SECRET_KEY, async (error, decoded) => {
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

//update password function
export const updatePassword = async (req, res) => {
  try {
    const userId = req.id
    const { oldPassword, newPassword, confirmNewPassword } = req.body

    if (Object.keys(req.body).length > 3)
      throw new Error("Extra fields");

    const user = await userModel.findById(userId)

    const comparePassword = await bcrypt.compare(oldPassword?.replace(/\s/g, '').trim(), user.password);

    if (!comparePassword) {
      return res.status(400).json({
        success: false,
        message: "Old Password is not matching"
      })
    }

    const userDetails = {
      userName: user.userName,
      email: user.email,
      password: newPassword?.replace(/\s/g, '').trim()
    }

    const validUser = userSchemaValidation.safeParse(userDetails)

    if (!validUser.success) {
      return res.status(400).json({
        success: false,
        message: `${validUser.error.issues[0].message} --> ${validUser.error.issues[0].path}`
      })
    }

    passwordRegexValidation(newPassword?.replace(/\s/g, '').trim())

    if (newPassword?.replace(/\s/g, '').trim() !== confirmNewPassword?.replace(/\s/g, '').trim()) {
      return res.status(400).json({
        success: false,
        message: "New password is not matching with confirm passowrd"
      })
    }

    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword?.replace(/\s/g, '').trim(), salt);

    user.password = newHashedPassword
    await user.save()

    return res.status(200).json({
      success: true,
      message: "Password updated successfully"
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

//update userName function
export const updateUserName = async (req, res) => {
  try {
    const userId = req.id
    const { newUserName } = req.body

    if (Object.keys(req.body).length > 1)
      throw new Error("Extra fields");

    const user = await userModel.findById(userId)

    const userDetails = {
      userName: newUserName.replace(/\s/g, '').trim(),
      email: user.email,
      password: user.password
    }

    const validUser = userSchemaValidation.safeParse(userDetails)

    if (!validUser.success) {
      return res.status(400).json({
        success: false,
        message: `${validUser.error.issues[0].message} --> ${validUser.error.issues[0].path}`
      })
    }

    userNameRegexValidation(newUserName?.replace(/\s/g, '').trim())

    user.userName = newUserName.replace(/\s/g, '').trim()
    await user.save()

    return res.status(200).json({
      success: true,
      message: 'Username updated successfully'
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

//update profilePicture function
export const updateProfilePicture = async (req, res) => {
  try {
    const file = req.file
    const userId = req.id

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      })
    }

    const user = await userModel.findById(userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    const existingProfilePicture = user.profilePicture.split('/').slice(-3).join('/')

    if (existingProfilePicture !== '') {
      fs.unlink(existingProfilePicture, async (error) => {
        if (error) {
          throw new Error(error.message);
        }
        else {
          return
        }
      })
    }

    user.profilePicture = `http://localhost:3000/uploads/profilePicture/${file.filename}`

    await user.save()

    return res.status(201).json({
      success: true,
      message: `File uploaded successfully`,
      profilePicture: user.profilePicture
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}