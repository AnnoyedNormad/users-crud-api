const data = require("../../../data");
const url = require("url");

module.exports = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let userId = parsedUrl.pathname.split("/")[2];

    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify(data.getUser(+userId)));
}