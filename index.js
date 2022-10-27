require('dotenv').config({ path: __dirname + '/config/.env' })
const express = require('express')
const cookieParser = require('cookie-parser')
require('./config/db')

// Routes

const userRouter = require('./router/user')
const taskRouter = require('./router/task')


const app = express()
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))

const port = process.env.PORT || 7795
// app.use(cors())

app.use(function (req, res, next) {
    const allowedOrigins = ["http://localhost:4200", "http://localhost:4300"];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next();
})


app.use(userRouter)
app.use(taskRouter)

const server = app.listen(port, () => {
    console.log("TODO Running on : localhost", process.env.PORT);
})

process.on('unhandledRejection', (err, Promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});