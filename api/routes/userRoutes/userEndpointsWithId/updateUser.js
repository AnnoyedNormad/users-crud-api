const data = require("../../../sqlite3-data");
const url = require("url");

module.exports = (req, res) => {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk;
    })

    req.on('end', async () => {
        const parsedBody = new URLSearchParams(body);
        const name = parsedBody.get('name');
        const age =  parsedBody.get('age');

        const parsedUrl = url.parse(req.url, true);
        let userId = parsedUrl.pathname.split("/")[2];

        if (!(await data.getUser(+userId))) {
            res.writeHead(404);
            res.end(JSON.stringify({message: 'User not found'}));
        } else if (!(name) && !(age)) {
            res.writeHead(400);
            res.end(JSON.stringify({message: 'Name or age are required'}));
        } else {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(await data.updateUser(+userId, {name: name, age: age})));
        }
    })
}