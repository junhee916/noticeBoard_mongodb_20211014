require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

const userRouter = require('./routes/user')
const boardRouter = require('./routes/board')
const commendRouter = require('./routes/commend')

const connectDB = require('./config/database')
connectDB()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/comm_modules', express.static(__dirname + '/comm_modules'))
app.use('/public', express.static(__dirname + '/public'))

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))

app.use(morgan('dev'))

// connected routes
app.use('/user', userRouter)
app.use('/board', boardRouter)
app.use('/commend', commendRouter)

// connected uploads
app.use('/uploads', express.static('uploads'))

// connected views
app.get('/signup', (req, res) => {

    res.render('./user/signup')
})

app.get('/login', (req, res) => {

    res.render('./user/login')
})

const PORT = process.env.PORT || 7000

app.listen(PORT, console.log("connected server..."))