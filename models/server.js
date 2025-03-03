const express = require("express");
const cors = require("cors");
const path = require("path");
const routeApi = require("../routes/routeApi");
const routeView = require("../routes/routeView");
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.puerto = process.env.PORT;
    this.moviePath = "/api/movies";

    this.conectarDB();

    this.middleware();
    this.getRouteApi();
    this.getRouteView();
  }

  middleware() {
    this.app.use(cors({ origin: "http://localhost:8080" }));
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  async conectarDB() {
      await dbConnection();
    }

  getRouteApi(){
    this.app.use(this.moviePath, routeApi);
  }

  getRouteView(){
    this.app.use("/", routeView);
  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log("Servidor corriendo en el puerto: " + process.env.PORT);
    });
  }
}

module.exports = Server;
