const createUser = require("./userEndpoints/createUser")
const listUsers = require("./userEndpoints/listUsers")

const userRoutes = (req, res) => {
    const method = req.method;

    switch (method) {
        case 'GET':
            listUsers(req, res)
            break;
        case 'POST':
            createUser(req, res)
            break;
        default:
            res.writeHead(404);
            res.end(JSON.stringify({message: 'Route not found in users'}));
    }
}

module.exports = userRoutes;