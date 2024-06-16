const data = require("../../../sqlite3-data");

module.exports = (req, res) => {
    res.writeHead(200, {"Content-Type": "application/json"})

    data.usersList().then(function (usersList) {
        if (usersList.length === 0) {
            res.end(JSON.stringify({message: "There are no users here yet("}));
        } else {
            res.end(JSON.stringify(usersList));
        }
    })
}