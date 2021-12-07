const routes = require('./users');
const p = require('path');
const constructorMethod = (app) => {
  app.use('/', routes);
  // app.use('*', (req, res) => {
  //   res.redirect('/');
  // });
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};


module.exports = constructorMethod;