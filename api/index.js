const express = require("express")
const cors = require("cors")
const { default: mongoose } = require("mongoose")
const bcrypt = require("bcryptjs") 
const jwt = require("jsonwebtoken")
const User = require("./models/User.js")
const Place = require("./models/Place.js")
const cookieParser = require("cookie-parser")
const imageDownloader = require("image-downloader")
const multer = require("multer")
const fs = require("fs")

require("dotenv").config()

const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = "ioams9idajdjs9a0dja0990daj"

const app = express()

app.use(express.json())

app.use(cookieParser())

app.use("/uploads", express.static(__dirname+"/uploads"))

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

app.post("/upload-by-link", async (request, response) => {
    const {link} = request.body
    const newName = "photo" + Date.now() + ".jpg"

    await imageDownloader.image({
        url: link,
        dest: __dirname + "/uploads/" +newName
    })

    response.json(newName)
})

const photosMiddleware = multer({dest:"uploads/"})

app.post("/upload", photosMiddleware.array("photos", 100), (request, response) => {
    const uploadedFiles = []
    for(let i = 0; i < request.files.length; i++) {
        const {path, originalname} = request.files[i]
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        const newPath = path + '.' + ext
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace('uploads\\',''))
    }
    
    response.json(uploadedFiles)
})

app.post("/places", (request, response) => {
    const {token} = request.cookies
    const {title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests} = request.body
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
            throw err
        }

        const placeDoc = await Place.create({
            owner: userData.id,
            title, address, photos:addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests
        })

        response.json(placeDoc)
    })
})

app.get("/places", (request, response) => {
    const {token} = request.cookies

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const {id} = userData

        response.json( await Place.find({owner:id}) )
    })
})



const PORT = 4000

app.listen(PORT, console.log(`Server is running on port: ${PORT}`))