const url = require('url');

const userRoutes = require('./userRoutes/userRoutes');
const userRoutesWithIdR = require('./userRoutes/userRoutesWithId');

const router = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname

    if (path === '/users') {
        userRoutes(req, res)
    } else if (path.startsWith('/users/')) {
        userRoutesWithIdR(req, res)
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(404);
        res.end(JSON.stringify({message: 'Route not found'}));
    }
}

module.exports = router;