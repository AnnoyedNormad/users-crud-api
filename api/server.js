const http = require('http');
const router = require('./routes/router');


const server = http.createServer(router)

const port = process.env.PORT || 3001;

server.listen(port, () => {
    console.log("server listening on port " + port);
})