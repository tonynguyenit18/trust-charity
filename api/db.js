const Sequelize =require('sequelize') ;

const User =require ('./models/User');

const path = require('path');
const os =require ('os');

const sequelize = new Sequelize(null, null, null, {
  dialect: 'sqlite',
  storage: path.join(os.tmpdir(), 'db.sqlite'),
  logging: false
});

// Init all models
User(sequelize);

sequelize.sync();

module.exports= sequelize;
