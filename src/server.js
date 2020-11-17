require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const corsOptions = require("./utils/corsOptions");
const morganOptions = require("./utils/morganOptions");
const mongooseConnect = require("./utils/mongooseConnect");
const startListeningHelper = require("./helpers/startListeningHelper");

const errorMiddleWare = require("./modules/error/middlewares/errorMiddleware")


const PORT = process.env.PORT || 4000;


class HandlerServer {
  constructor() {
    this._server = express();
  }

  start = async () => {
    this.initMiddlewares();
    this.initRoutes();
    await this.initDatabase();
    this.initErrorMiddleWare();
    this.startListening();
  }

  initMiddlewares = () => {
    this._server.use(express.json());
    this._server.use(cors(corsOptions));
    this._server.use(morgan(morganOptions));
  }

  initErrorMiddleWare = () => {
    this._server.use(errorMiddleWare);
  }

  initRoutes = () => {
    console.log("Init routes")
  }

  initDatabase = async () => {
    await mongooseConnect();
  }

  startListening = () => {
    this._server.listen(PORT, startListeningHelper);
  }
}

module.exports = HandlerServer;