import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import fs, { readFile } from 'fs'
const app = express()
const port = 3000
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    fs.readFile("./Models/data.json", "utf-8", (err, data) => {
        if (err) res.send(err.message)
        else {
            res.send(data || [])
        }
    })
})
app.post('/register', (req, res) => {
    const data = JSON.parse(fs.readFileSync("./Models/data.json", "utf-8") || '[]')
    const id = data.length ? data[data.length - 1].id + 1 : 1
    data.push({ ...req.body, id })
    fs.writeFileSync("./Models/data.json", JSON.stringify(data))

    res.json(data)
})
app.post('/login', (req, res) => {
    const data = JSON.parse(fs.readFileSync("./Models/data.json", "utf-8") || '[]')
    const user = data.find(user => user.email == req.body.email && user.password == req.body.password)
    const token = jwt.sign(user, "hello", { expiresIn: "1m" })
    if (user) {
        res.status(200).json({ message: "Login success", status: 200, data: { ...user, token } })
    } else {
        res.status(401).json({ message: "Invalid email or password" })
    }
})

function authMiddleware(req, res, next) {
    const token = req.headers.authorization.split(" ")[1]
    if (token) {
        jwt.verify(token, "hello", (err, decoded) => {
            if (err) return res.status(401).json({ message: "Unauthorized" })
            else {
                console.log("43", decoded)
                req.user = decoded
                next()
            }
        })
    } else {
        res.status(401).json({ message: "Unauthorized" })
    }
}

//"Authorization" : "Bearer token"
//req.body
//private route
app.get("/home", authMiddleware, (req, res) => {
    console.log(req.user)
    res.json(req.user)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))