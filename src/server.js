require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");


const corsOptions = require("./utils/corsOptions");
const morganOptions = require("./utils/morganOptions");


const PORT = process.env.PORT || 4000;


class HandlerServer {
  constructor() {
    this._server = express();
  }

  start = async () => {

  }

  initMiddlewares = () => {
    this._server.use(express.json());
    this._server.use(cors(corsOptions));
    this._server.use(morgan(morganOptions));
  }

  initErrorMiddleWare = () => {

  }

  initRoutes = () => {

  }

  initDataBase = () => {
    try {

    }
    catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  startListening = () => {
    this._server.listen(PORT, () => {
      console.log("Server is listening on port", PORT); // out to separate module
    });
  }

}