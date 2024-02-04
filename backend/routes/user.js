const express = require("express")
const zod = require("zod")
const router = express.Router()
const jwt = require("jsonwebtoken")
const { User } = require("../db")
const { Account } = require("../db")
const { JWT_SECRET } = require("../config")
const { authMiddleware } = require("../middleware");


const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

const signupBody = zod.object({
    userName: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})
router.post("/signup", async (req, res) => {
    const { userName, firstName, lastName, password } = req.body



    try {
        const { success } = signupBody.safeParse(req.body)
        if (!success) {
            return res.status(411).json({
                message: "Email already taken / Incorrect inputs"
            })
        }

        const emailExit = await User.findOne({ userName })
        if (emailExit) {
            return res.status(401).json({
                message: "Email already taken / Incorrect inputs"
            })
        }
        if (success) {
            const data = await User.create({
                userName, firstName, lastName, password
            })
            const userId = data._id

            await Account.create({
                userId,
                balance: 1 + Math.random() * 10000
            })
            const token = jwt.sign({ userId }, JWT_SECRET)
            return res.status(200).json({
                message: "User created successfully",
                token: token
            })
        } else {
            return res.status(400).json({
                "err": "There is some error"
            })
        }

    } catch (err) {
        return res.status(400).json({
            "err": "There is some error"
        })
    }

})

router.post("/signin", async (req, res) => {

    try {
        const { success } = signinBody.safeParse(req.body)
        if (!success) {
            return res.status(411).json({
                message: "Incorrect inputs"
            })
        }
        const user = await User.findOne({
            userName: req.body.username,
            password: req.body.password
        });

        if (user) {
            const userID = user._id
            const token = jwt.sign({ userID }, JWT_SECRET)
            return res.status(200).json({
                token: token
            })
        }

        return res.status(411).json({
            message: "Error while logging in"
        })
    } catch (err) {
        return res.status(411).json({
            message: "Error while logging in"
        })
    }

})

router.put("/", authMiddleware, async (req, res) => {

    const checkUpdateBody = updateBody.safeParse(req.body)



    if (!checkUpdateBody) {
        return res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne({
        _id: req.userId
    }, req.body)

    return res.json({
        message: "Updated successfully"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || ""
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })
    return res.status(200).json({
        users
    })
})

router.get("/me", authMiddleware, async (req, res) => {
    return res.status(200).json({
        message: "User is verified.",
        _id: req.userId
    })
})
module.exports = router