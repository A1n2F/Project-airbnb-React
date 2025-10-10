const express = require("express")
const cors = require("cors")
const { default: mongoose } = require("mongoose")
const bcrypt = require("bcryptjs") 
const jwt = require("jsonwebtoken")
const User = require("./models/User.js")
const cookieParser = require("cookie-parser")
require("dotenv").config()

const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = "ioams9idajdjs9a0dja0990daj"

const app = express()

app.use(express.json())

app.use(cookieParser())

app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))

mongoose.connect(process.env.MONGO_URL)

app.get("/test", (request, response) => {
    response.json("test ok")
})

app.post("/register", async (request, response) => {
    const {name, email, password} = request.body

    try {
        const userDoc = await User.create({
        name,
        email,
            password: bcrypt.hashSync(password, bcryptSalt)
        })

        response.json(userDoc)
    } catch (error) {
        response.status(422).json(error)
    }
})

app.post("/login", async (request, response) => {
    const {email, password} = request.body

    const userDoc = await User.findOne({email})

    if(userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password)

        if(passOk) {
            jwt.sign({email: userDoc.email, id: userDoc._id}, jwtSecret, {}, (err, token) => {
                if(err) {
                    throw err
                }

                response.cookie("token", token).json(userDoc)
            })

        } else {
            response.status(422).json("pass not ok")
        }
    } else {
        response.json("not found")
    }
})

app.get("/profile", (request, response) => {
    const {token} = request.cookies

    if(token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) {
                throw err
            }

            const {name, email, _id} = await User.findById(userData.id)

            response.json({name, email, _id})
        })
    } else {
        response.json(null)
    }
})

app.post("/logout", (request, response) => {
    response.cookie("token", "").json(true)
})

const PORT = 4000

app.listen(PORT, console.log(`Server is running on port: ${PORT}`))