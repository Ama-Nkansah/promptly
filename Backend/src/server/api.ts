import express from "express";
import cors from "cors";
import { handleUserTask } from "../agent/taskAgent.js";
import bycrpt from "bcrypt"
import { PrismaClient } from "../generated/prisma/client.js";
const app = express();
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import jwt from "jsonwebtoken"


const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter })

app.use(cors());
app.use(express.json());

<<<<<<< HEAD
app.post("/server", async (req, res) => {
    const { task, content ,value} = req.body;
=======
app.post("/agent", async (req, res, next) => {
    const { task, content, value } = req.body;
>>>>>>> upstream/main
    try {
        const result = await handleUserTask(task, content, value);
        console.log(result)
        res.send(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/signup", async (req, res, next) => {
    const data = req.body;

    const hashedPassword = await bycrpt.hash(data.password, 15)
    data.password = hashedPassword
    // stored body in database
    try {
        const userAlreadyExist = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        })
        if (userAlreadyExist) throw new Error("Email already exist! Please login")
        const result = await prisma.user.create({ data });
        const token = jwt.sign(result.id, process.env.JWT_SECRET);
        delete result.password
        res.status(201).json({
            message: "User created successfully",
            result,
            token
        })
        next()
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const userAlreadyExist = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!userAlreadyExist) throw new Error("Email does not exist.Please signup")
        const isPassword = await bycrpt.compare(password, userAlreadyExist.password)

        if (!isPassword) throw new Error("Invalid Credentials")
         const token = jwt.sign(userAlreadyExist.id,process.env.JWT_SECRET)
        delete userAlreadyExist.password
        res.status(200).json({
            message:"User login successful",
            result:userAlreadyExist,
            token
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
})



// app.use((error:any,req:any,res:any,next:any)=>{
//    console.log(error)
//    res.status(500).json({error})
//    next()
// })


export function startServer(port = 5000) {
    app.listen(port, () => {
        console.log(`Agent running on http://localhost:${port}`);
    });
}
