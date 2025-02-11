import multer from 'multer'
import path from 'path'

const fileExtention = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
const profilePictureExtension = ['image/jpeg', 'image/jpg', 'image/png']

const notesFileStorage = multer.diskStorage({
  destination: './uploads/notesFile',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const profilePictureStorage = multer.diskStorage({
  destination: './uploads/profilePicture',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const validateFile = (extentions) => {
  return (req, file, cb) => {
    extentions.includes(file.mimetype) ? cb(null, true) : cb(new Error('Invalid file type'), false)
  }
}

const notesFileUpload = multer({
  storage: notesFileStorage,
  limits: {
    fileSize: 1024 * 1024 * 10,
    files: 1
  },
  fileFilter: validateFile(fileExtention)
})

const profilePictureUpload = multer({
  storage: profilePictureStorage,
  limits: {
    fileSize: 1024 * 1024 * 10,
    files: 1
  },
  fileFilter: validateFile(profilePictureExtension)
})

export const uploadNotesFile = (req, res, next) => {
  try {
    notesFileUpload.single('file')(req, res, (error) => {
      if (error) return res.status(400).json({
        success: false,
        message: error.message
      })
      else next()
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

export const uploadProfilePicture = (req, res, next) => {
  try {
    profilePictureUpload.single('profilePicture')(req, res, (error) => {
      if (error) return res.status(400).json({
        success: false,
        message: error.message
      })
      else next()
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    })
  }
}