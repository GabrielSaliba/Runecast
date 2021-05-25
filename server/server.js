const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/server.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3333;

console.log('Server running in port: ', port)

server.use(middlewares);
server.use(router);

server.listen(port);