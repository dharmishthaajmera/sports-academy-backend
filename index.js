require("dotenv").config();

const app = require("./app");
const {sequelize} = require('./models');
const { commonErrorHandler } = require("./helper/errorHandler");

const startServer = async function () {
  try {
    sequelize.authenticate();
    console.log("... Microservice db ✔");
    app.listen(process.env.SERVER_PORT);
    console.log(`--- Server started on ${process.env.SERVER_PORT} ---\n\n`);
  } catch (error) {
    commonErrorHandler(res, error, 500);
  }
};

startServer();
