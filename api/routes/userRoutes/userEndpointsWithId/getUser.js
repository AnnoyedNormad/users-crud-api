const data = require("../../../sqlite3-data");
const url = require("url");

module.exports = async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let userId = parsedUrl.pathname.split("/")[2];

    const user = await data.getUser(+userId)

    if (user) {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(user));
    } else {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({message: 'User not found'}));
    }

}