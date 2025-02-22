import express from 'express'
import env from 'dotenv'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'

import { dbConnect } from './src/utils/dbConnect.js'
import userRoute from './src/routes/userRoute.js'
import notesRoute from './src/routes/notesRoute.js'
import adminRoute from './src/routes/adminRoute.js'
import chatRoute from './src/routes/chatRoute.js'

env.config({})

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5173/chat'],
  credentials: true,
  optionSuccessStatus: 200,
}

const app = express()
const server = http.createServer(app)
app.use(cors(corsOptions))

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.json())
app.use('/uploads', express.static('uploads'))

const port = process.env.PORT || 5000

//all api
app.use('/api/admin', adminRoute)
app.use('/api/user', userRoute)
app.use('/api/notes', notesRoute)
app.use('/api/chat', chatRoute)

dbConnect()

//chat socket io implemented
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("joinRoom", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("sendMessage", (data) => {
    console.log("sending message:", data);

    socket.to(data.room).emit("receive_message", data);

    console.log("message sent to room:", data.room);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});


server.listen(port, () => {
  console.log(`server is running in port ${port}`)
})
