const {
    getRecentCommitHash,
    upsertCommitHashToRedis,
    getLatestCaseData,
    updateRedisWithNewData,
} = require('./updateRedisData');

describe('getRecentCommitHash', () => {
    it.todo('should get the most recent hash');
    it.todo('should store the hash into the request');
});
describe('upsertCommitHashToRedis', () => {
    it.todo('should check to see if a hash exists in redis');
    it.todo('should add the hash if it does not exist');
    it.todo('should update the redis cache if the hashes are not the same');
});

describe('getLatestCaseData', () => {
    it.todo('should fetch the json file');
    it.todo('should parse the data into a json');
    it.todo('should store data in request');
});
