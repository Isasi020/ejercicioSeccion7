const express = require("express");
const cors = require("cors");
const path = require("path");
const routeApi = require("../routes/routeApi");
const routeView = require("../routes/routeView");
const routeAuthentication = require("../routes/routeAuth");
const routeUser = require('../routes/routeUser');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.puerto = process.env.PORT;
    this.moviePath = "/api/movies";
    this.authPath = "/api/auth";
    this.userPath = "/api/user";


    this.conectarDB();

    this.middleware();
    this.getRouteApi();
    this.getRouteUser();
    this.getRouteView();
    this.getRouteAuthentication();
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

  getRouteAuthentication(){
    this.app.use(this.authPath, routeAuthentication);
  }

  getRouteUser(){
    this.app.use(this.userPath, routeUser);
  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log("Servidor corriendo en el puerto: " + process.env.PORT);
    });
  }
}

module.exports = Server;
