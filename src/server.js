require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const corsOptions = require("./utils/corsOptions");
const morganOptions = require("./utils/morganOptions");
const startListeningHelper = require("./helpers/startListeningHelper");


const PORT = process.env.PORT || 4000;


class HandlerServer {
  constructor() {
    this._server = express();
  }

  start = async () => {
    this.initMiddlewares();
    this.initRoutes();
    await this.initDataBase();
    this.initErrorMiddleWare();
    this.startListening();
  }

  initMiddlewares = () => {
    this._server.use(express.json());
    this._server.use(cors(corsOptions));
    this._server.use(morgan(morganOptions));
  }

  initErrorMiddleWare = () => {
    console.log("Init error middleware")
  }

  initRoutes = () => {
    console.log("Init routes")
  }

  initDataBase = async () => {
    try {
      await console.log("Init database")
    }
    catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  startListening = () => {
    this._server.listen(PORT, startListeningHelper);
  }
}

module.exports = HandlerServer;