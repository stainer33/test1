var dbConfig= require('../DatabaseConfig');
var Sequelize = dbConfig.Sequelize;
var sequelize = dbConfig.sequelize;

//defining schema
var users = sequelize.define('user',
{
  id:{type: Sequelize.INTEGER,
  primaryKey: true,
autoIncrement: true,

},
UserName:{
  type: Sequelize.TEXT,
  allowNull: false
},
Password:{
  type: Sequelize.TEXT,
  allowNull: false
}
},{timestamps:false, freezeTableName:true, tableName: 'usersTable'});

//creating table
users.sync({force: false})
.then(function (result)
{console.log("Table created successfully");
})
 .catch(function (err)
 {console.log(err);
})
module.exports=users;