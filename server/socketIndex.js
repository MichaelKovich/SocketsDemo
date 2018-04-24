const express = require("express")
const http = require("http")
const cors = require("cors")
const { json } = require("body-parser")
const socketIo = require("socket.io")

const PORT = 1738
const app = express()

app.use(json())
app.use(cors())
const server = http.createServer(app)
const io = socketIo(server)

let interval
io.on("connection", socket => {
  console.log("User connected")
  if (interval) {
    clearInterval(interval)
  }
  intervalId = setInterval(() => getDataAndEmit(socket), 2000)

  socket.on("disconnect", () => {
    console.log("User disconnected")
    clearInterval(intervalId)
  })
})

let message = []
let cat = ["turtle", "snake"]

const getDataAndEmit = async socket => {
  try {
    socket.emit("Message", message)
  } catch (error) {
    console.error(error)
  }
  
}

app.post('/api/sendpost', (req, res, next) => {
    message.push(req.body)
})


server.listen(PORT, () => console.log(`Listening to ${PORT}`))
