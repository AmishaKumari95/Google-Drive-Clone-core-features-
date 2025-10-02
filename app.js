const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const userRouter = require('./routes/user.routes')
const connectToDB = require('./config/db')
connectToDB();
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index.routes')
const path = require('path');


const app = express();



app.set('view engine', 'ejs');
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', indexRouter)
app.use('/user', userRouter)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.listen(3000,() => {
    console.log('server is running on port 3000');
})
