const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();
const db = require('./db.json');

server.use(middlewares);

server.get('/usuarios', (req, res) => {
  if (req.method === 'GET') {
    const paramId = req.query.id;

    if (paramId != null) {
      const result = db.usuarios.find((item) => {
        return item.id == paramId;
      });

      if (result) {
        // const { id, ...user } = result;
        res.status(200).jsonp(result);
      } else {
        res.status(204).jsonp({
          data: {},
          error: {},
        });
      }
    } else {
      const result = db.usuarios;
      if (result) {
        res.status(200).jsonp(result);
      } else {
        res.status(204).jsonp({
          data: {},
          error: {},
        });
      }
    }
  }
});

server.use(router);

server.listen(3004, function () {
  console.log('JSON Server is running');
});
