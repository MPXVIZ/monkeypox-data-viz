const simpleGit = require('simple-git');
const monkeypoxRepoPath = 'https://github.com/globaldothealth/monkeypox.git';
const getCommitHash = async () => {
    let commitHash = '';
    await simpleGit().listRemote([monkeypoxRepoPath], (err, data) => {
        if (!err) {
            // console.log('data -> ', data);

            const indexOfHead = data.indexOf('\tHEAD'); // Get index of first tab as it will be the HEAD
            // console.log(`Index of HEAD: ${indexOfHead}`);

            commitHash = data.substring(0, indexOfHead); // Grab the substring of the hash
            // console.log(`Last commit hash:\n${commitHash}`);
        } else {
            console.error(err);
            return null;
        }
    });
    return commitHash;
};

module.exports = {
    getCommitHash,
};
