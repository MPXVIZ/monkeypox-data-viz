const dotenv = require('dotenv');
const fetch = require('node-fetch');
const simpleGit = require('simple-git');
dotenv.config();
const monkeypoxRepoPath = process.env.MONKEYPOX_REPO_PATH;
const latestJsonPath = process.env.LATEST_JSON_PATH;
const tsCountryCSV = process.env.TS_COUNTRY_CSV;
const tsConfirmedCSV = process.env.TS_CONFIRMED_CSV;

const getRecentCommitHash = async (req, res, next) => {
    await simpleGit().listRemote([monkeypoxRepoPath], (err, data) => {
        try {
            // Get index of first tab as it will be the HEAD
            const indexOfHead = data.indexOf('\tHEAD');

            // Grab the substring of the hash
            req.commitHash = data.substring(0, indexOfHead);
            next();
        } catch (error) {
            console.error(err);
        }
    });
};

const upsertCommitHashToRedis = async (req, res, next) => {
    try {
        const client = req.redisClient;
        const commitHash = req.commitHash;
        const redisHash = await client.get('SHA_HASH');
        req.isNewHash = redisHash !== commitHash;
        if (req.isNewHash) {
            await client.set('SHA_HASH', commitHash, {
                EX: req.redisExpiration,
            });
            await client.set('LAST_UPDATED', Date.now().toString(), {
                EX: req.redisExpiration,
            });
        }

        next();
    } catch (error) {
        console.error(error);
    }
};

const getLatestCaseData = async (req, res, next) => {
    try {
        const client = req.redisClient;
        const isNewHash = req.isNewHash;

        if (isNewHash) {
            console.log('get data from repo');
            const apiResponse = await fetch(latestJsonPath);

            req.monkeypoxCaseData = await apiResponse.json();

            next();
        } else {
            console.log('get data from redis');
            const redisResponse = await client.hVals('MONKEYPOX_CASE_DATA');

            req.monkeypoxCaseData = redisResponse.map(mpCase => {
                return JSON.parse(mpCase);
            });
        }
        next();
    } catch (error) {}
};

const updateRedisWithNewData = async (req, res, next) => {
    try {
        if (!req.isNewHash) {
            console.log('its an oldhash');
            return next();
        }
        console.log('its a newHash');
        const client = req.redisClient;
        const caseData = req.monkeypoxCaseData;
        const stringifiedMPData = caseData.map(mpCase => {
            const { ID } = mpCase;

            return {
                ID,
                data: JSON.stringify(mpCase),
            };
        });

        for (const mpCase of caseData) {
            const { ID } = mpCase;
            const redisCase = await client.hGet(
                'MONKEYPOX_CASE_DATA',
                mpCase.ID,
            );
            const stringifiedCase = {
                ID,
                data: JSON.stringify(mpCase),
            };
            if (redisCase && redisCase !== stringifiedCase.data) {
            } else {
                await client.hSet(
                    'MONKEYPOX_CASE_DATA',
                    mpCase.ID,
                    stringifiedCase.data,
                    {
                        EX: req.redisExpiration,
                    },
                );
            }
        }
        next();
    } catch (error) {}
};

module.exports = {
    getRecentCommitHash,
    upsertCommitHashToRedis,
    getLatestCaseData,
    updateRedisWithNewData,
};
