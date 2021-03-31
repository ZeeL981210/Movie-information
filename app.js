require("babel-register");
//path
import path from "path";

import config from "./config/index";
import * as print from "./config/print";
import * as router from "./app/router/index";
import mongo from "./app/model/db";
import { initMovieData } from "./app/controller/init";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");


const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo")(session);
app.use(cookieParser());
app.use(
    session({
        secret: config.session.secret,
        resave: false,
        saveUninitialized: true,
        rolling: true,
        store: new MongoStore({
            url: `${config.mongo.host}/${config.mongo.db}`,
        }),
    })
);

router.load(app);

app.set("views", path.join(__dirname, "app/views"));
app.set("view engine", "ejs");


app.use("/static", express.static(path.join(__dirname, "app/public")));


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "");
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
});

app.listen(config.port, () => {
    mongo,
    print.print({
        domain: "http://127.0.0.1",
        port: config.port,
        mongo: `${config.mongo.host}/${config.mongo.db}`,
    });
});