const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI 
mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex:true })



//create a connection and open it
const connection = mongoose.connection 
connection.once('open', () => {
    console.log("MongoDb database connection established successfully ")
})

//const signupRouter = require('./routes/rsignup')
//const loginRouter  = require('./routes/rlogin')
const userRouter  = require('./routes/users')

//app.use('/signup', signupRouter)
//app.use('/login', loginRouter)
app.use('/users', userRouter)

app.listen(port, ()=>{
    console.log(`Express server listening on port ${port}`)
})


