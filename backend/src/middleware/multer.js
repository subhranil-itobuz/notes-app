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

export const uploadNotesFile = multer({
  storage: notesFileStorage,
  limits: {
    fileSize: 1000000
  },
  fileFilter: validateFile(fileExtention)
})

export const uploadProfilePicture = multer({
  storage: profilePictureStorage,
  limits: {
    fileSize: 1000000
  },
  fileFilter: validateFile(profilePictureExtension)
})