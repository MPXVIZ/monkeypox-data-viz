const express = require("express")

const router = express.Router()

router.use("/data", require("./data"))

router.use((req, res, next) => {
	const error = new Error("Not Found")
	error.status = 404
	next(err)
})

module.exports = router
