const express = require('express')
const app = express()
const socketio = require('socket.io')
const http = require('http')
// const cors = require('cors')
const router = require('./router')

// app.use(cors())

const PORT = process.env.PORT || 3000

const server = http.createServer(app)
const io = socketio(server)


io.on('connection', (socket)=>{
    console.log("we have new connection")
    
    socket.on('discconet',()=>{
        console.log("user has left")
    })
})


app.use(router)
server.listen(PORT,()=>{
    console.log("server connected")
})