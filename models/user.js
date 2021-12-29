const SequelizeMain=require('sequelize');

const sequelize=require('../util/database');

const User=sequelize.define('user',{
    id:{
        type:SequelizeMain.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    email:{
        type:SequelizeMain.STRING,
        allowNull:false
    },    
    name:SequelizeMain.STRING
});

module.exports=User;