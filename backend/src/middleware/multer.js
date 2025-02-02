import multer from 'multer'
import path from 'path'

const fileExtention = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const validateFile = (extentions) => {
  return (req, file, cb) => {
    extentions.includes(file.mimetype) ? cb(null, true) : cb(new Error('Invalid file type'), false)
  }
}

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000
  },
  fileFilter: validateFile(fileExtention)
})