const getUser = require("./userEndpointsWithId/getUser")
const deleteUser = require("./userEndpointsWithId/deleteUser")
const updateUser = require("./userEndpointsWithId/updateUser")

const userRoutes = (req, res) => {
    const method = req.method;

    switch (method) {
        case 'GET':
            getUser(req, res);
            break;
        case 'PUT':
            updateUser(req, res)
            break;
        case 'DELETE':
            deleteUser(req, res)
            break;
        default:
            res.writeHead(404);
            res.end(JSON.stringify({message: 'Route not found in users'}));
    }
}

module.exports = userRoutes;