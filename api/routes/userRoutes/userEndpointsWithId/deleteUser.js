const data = require("../../../sqlite3-data");
const url = require("url");

module.exports = async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let userId = parsedUrl.pathname.split("/")[2];

    if (!await data.getUser(+userId)) {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end(JSON.stringify({message: 'User not found'}));
    } else {
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end(JSON.stringify(await data.deleteUser(+userId)));
    }
}