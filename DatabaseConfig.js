
var Sequelize = require('sequelize');
var sequelize = new Sequelize('test', 'root', 'stainer33', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  //to export to index
  module.exports={Sequelize, sequelize};