const http = require('http');
const port = 8000;

const server = http.createServer((req, res) => {
    res.end();
})

server.listen(port, console.log(`Server is listening on port: ${port}...`));

