const router = require('express').Router();
const {
    upsertCommitHashToRedis,
    getLatestCaseData,
    getCommitHash,
    updateRedisWithNewData,
} = require('../middleware/updateRedisData');

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

router.get(
    '/',
    getCommitHash,
    upsertCommitHashToRedis,
    getLatestCaseData,
    updateRedisWithNewData,
    async (req, res) => {
        try {
            const monkeypoxCaseData = req.monkeypoxCaseData;
            console.log('at the end');
            res.status(200).send(monkeypoxCaseData);
        } catch (err) {
            console.log(err);
            res.status(500).send('Something went wrong');
        }
    },
);

module.exports = router;
