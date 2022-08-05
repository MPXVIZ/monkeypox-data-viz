const fetch = require('node-fetch');
const simpleGit = require('simple-git');
const monkeypoxRepoPath = 'https://github.com/globaldothealth/monkeypox.git';

const getCommitHash = async (req, res, next) => {
    await simpleGit().listRemote([monkeypoxRepoPath], (err, data) => {
        try {
            const indexOfHead = data.indexOf('\tHEAD'); // Get index of first tab as it will be the HEAD
            // console.log(`Index of HEAD: ${indexOfHead}`);

            req.commitHash = data.substring(0, indexOfHead); // Grab the substring of the hash
            // console.log(`Last commit hash:\n${commitHash}`);
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
        req.newHash = redisHash === commitHash;
        if (!req.newHash) {
            await client.set('SHA_HASH', commitHash, {
                EX: req.redisExpiration,
            });
        }
        req.redisHash = req.newHash ? redisHash : commitHash;

        next();
    } catch (error) {
        console.error(error);
    }
};
const getLatestCaseData = async (req, res, next) => {
    try {
        const client = req.redisClient;
        const newHash = req.newHash;

        if (newHash) {
            console.log('get data from repo');
            const apiResponse = await fetch(
                'https://raw.githubusercontent.com/globaldothealth/monkeypox/main/latest.json',
            );
            req.monkeypoxCaseData = await apiResponse.json();

            next();
        } else {
            console.log('get data from redis');
            req.monkeypoxCaseData = client.hGetAll('MONKEYPOX_CASE_DATA');
        }
        next();
    } catch (error) {}
};

const updateRedisWithNewData = async (req, res, next) => {
    try {
        const client = req.redisClient;
        const caseData = req.monkeypoxCaseData;
        const stringifiedMPData = caseData.map(mpCase => {
            const { ID } = mpCase;

            return {
                ID,
                data: JSON.stringify(mpCase),
            };
        });
        console.log(stringifiedMPData);
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
                console.log('true');
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
    upsertCommitHashToRedis,
    getLatestCaseData,
    getCommitHash,
    updateRedisWithNewData,
};
