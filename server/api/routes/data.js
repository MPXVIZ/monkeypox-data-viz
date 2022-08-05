const fetch = require("node-fetch")
const router = require("express").Router()
module.exports = router

// This sets up a route to localhost:3000/random and goes off and hits
// cat-fact.herokuapp.com/facts/random
router.get("/", async (req, res) => {
	try {
		const apiResponse = await fetch(
			"https://raw.githubusercontent.com/globaldothealth/monkeypox/main/latest.json"
		)
		const apiResponseJson = await apiResponse.json()
		// await db.collection('collection').insertOne(apiResponseJson)
		// console.log(apiResponseJson)
		res.status(200).send(apiResponseJson)
	} catch (err) {
		console.log(err)
		res.status(500).send("Something went wrong")
	}
})
