require('dotenv').config()

const express = require('express')
const cors = require('cors')
const errorMiddleware=require('./middlwares/error-middleware')
const cityRouter = require("./routes/city.router");
const masterRouter = require("./routes/master.router");

const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json())

app.use(cors({
    credentials:true,
    origin: process.env.CLIENT_URL
}))
app.use('/api',cityRouter)
app.use('/api',masterRouter)
app.use(errorMiddleware)

const start = async () => {
    try {
        app.listen(PORT, () => console.log("Server started on port: " + PORT))
    } catch (e) {
        console.log(e)
    }
}
start()