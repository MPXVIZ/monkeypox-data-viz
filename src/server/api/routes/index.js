const express = require("express")

const router = express.Router()

router.use("/data", require("./data"))
// mount auth routes at /auth
// router.use("/auth", authRoutes)

// mount user routes at /users
// router.use("/users", userRoutes)

module.exports = router
