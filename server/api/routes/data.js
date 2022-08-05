const fetch = require('node-fetch');
const router = require('express').Router();
const getCommitHash = require('../../utils/getCommitHash').getCommitHash();
module.exports = router;

// This sets up a route to localhost:3000/random and goes off and hits
// cat-fact.herokuapp.com/facts/random

/**
 * @GET '/api/data'
 * @since 0.1v
 * @desc Get the list of ALL monkeypox cases
 *
 * Steps:
 * - Get commit hash from globaldothealth/monkeypox github repo
 * - Check Redis if most recent commit hash is the same
 * - If they are the same, grab the data from Redis
 * - If they aren't the same, replace Redis data with udpated data and send back to client
 */
router.get('/', async (req, res) => {
    try {
        const commitHash = await getCommitHash;

        const apiResponse = await fetch(
            'https://raw.githubusercontent.com/globaldothealth/monkeypox/main/latest.json',
        );
        const apiResponseJson = await apiResponse.json();
        res.status(200).send(apiResponseJson);
    } catch (err) {
        console.log(err);
        res.status(500).send('Something went wrong');
    }
});
