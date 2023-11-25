const express = require('express')
const app = express()
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors')
const router = require('./router')

app.use(cors())

const PORT = process.env.PORT || 3000

const server = http.createServer(app)
const io = socketio(server,{cors:{origin:'http://localhost:5173'}})



io.on('connection', (socket)=>{
    console.log("we have new connection")
    
    socket.on('join',({name,room},callback)=>{
        console.log(name,room)
        
    })

    socket.on('disconnect',()=>{
        console.log("user has left")
    })
})


app.use(router)
server.listen(PORT,()=>{
    console.log("server connected")
})