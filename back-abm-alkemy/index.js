const server = require("./api/app.js");
const { conn } = require("./api/db.js");

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen({ port: process.env.PORT || 3001 }, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});



// const morgan = require('morgan');
// const express = require('express');
// const cors = require('cors');
// const cookieparser = require('cookie-parser');
// const dotenv = require("dotenv")
// const router = require('./api/routes');
// const Sequelize = require('sequelize');
// const { DataTypes } = require("sequelize");


// dotenv.config()
// const app = express();
// app.use(express.json());
// app.use(morgan("dev"))
// app.use(cors())
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieparser());
// app.use('/', router)

// var sequelize = new Sequelize('abm', 'postgres', 'superperro', {
//   host: 'localhost',
//   dialect: 'postgres',
//   ssl: true,
//   protocol: "postgres",

//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   },const server = require("./src/app.js");
// const { conn } = require("./src/db.js");

// // Syncing all the models at once.
// conn.sync({ force: false }).then(() => {
//   server.listen({ port: process.env.PORT || 3001 }, () => {
//     console.log("%s listening at 3001"); // eslint-disable-line no-console
//   });
// });
//   dialectOptions: {
//     ssl: {
//         require: true,
//         rejectUnauthorized: false // <<<<<< YOU NEED THIS
//     }
// }
// });

// let Abm= sequelize.define(
//   "abm",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     concept: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     amount: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     date: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     type: {
//       type: DataTypes.ENUM("in", "out"),
//       allowNull: false,
//     },
//   },
//   { timestamps: true, createdAt: true, updatedAt: true }
// );

// Abm.sync({force: true}).then(function () {
//   // Table created
//   return Abm.create({
//     concept:'compra',
//     amount:123,
//     date:'2 de enero',
//     type:'out'
//   });
// });

// app.listen(3001, ()=>{
//   console.log("Conected to 3001")
// })

// module.exports = Abm ;
