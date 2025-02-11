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

export const multerErrorHandling = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(500).send("Multer error: " + err.message);
  } else {
    next();
  }
};

export const uploadNotesFile = multer({
  storage: notesFileStorage,
  limits: {
    fileSize: 1024 * 1024 * 10,
    files: 1
  },
  fileFilter: validateFile(fileExtention)
})

export const uploadProfilePicture = multer({
  storage: profilePictureStorage,
  limits: {
    fileSize: 1024 * 1024 * 10,
    files: 1
  },
  fileFilter: validateFile(profilePictureExtension)
})

// const upload = multer({ storage })

// export const uploadNotesFile = (req, res, next) => {
//   try {

//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       message: error.message
//     })
//   }
// }

// const storage = multer.diskStorage({
//   destination: function(req , file , cb){
//       cb(null , 'uploads/')
//   },
//   filename: function (req , file ,cb){
//       cb(null,`${Date.now()}${file.originalname}`)
//   },
// })
// const upload = multer({ storage })

// function uploadMiddleware(req, res, next) {
//   try {
//       upload.single('photos')(req, res, function(err) {
//           if(err) res.status(400).json({status: 'error', message: err.message})
//           else next()
//       })
//   } catch (error) {
//       console.log('errorrororororororoor');
//   }
// }

// app.post('/file', uploadMiddleware, (req, res) => {
//   res.end();
// })