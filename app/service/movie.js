const fs = require("fs");
import BaseService from "./base";
import { getCurrentDateTime } from "../pkg/dateutil";
import db from "../model/db";
import { md5Encrypt } from "../pkg/utils";
import { setSession, deleteSession, getSession } from "../pkg/secctionUtil";
import config from "../../config/index";
const ObjectId = require("mongodb").ObjectId;

export default class MovieService extends BaseService {
    constructor() {
        super();
    }
    static find(req, res) {
        const classification = config.classification;
        const result = classification.map((item) => {
            let reg = new RegExp(item);
            return db.find("movies", { Genre: reg });
        });
        Promise.all(result).then((ret) => {
            const data = [{
                    type: classification[0],
                    list: ret[0].splice(0, 5),
                },
                {
                    type: classification[1],
                    list: ret[1].splice(0, 5),
                },
                {
                    type: classification[2],
                    list: ret[2].splice(0, 5),
                },
                {
                    type: classification[3],
                    list: ret[3].splice(0, 5),
                },
                {
                    type: classification[4],
                    list: ret[4].splice(0, 5),
                },
            ];
            res.render("index", {
                user: getSession(req),
                data,
                rank: ret[0].sort(sortRank).splice(0, 5),
            });
        });
    }

    static getInfo(req, res) {
        db.find("movies", { _id: ObjectId(req.query.id) }).then((ret) => {
            const reg = new RegExp(ret[0].Genre.split(",")[0]);
            db.find("movies", { Genre: reg }).then((item) => {
                if (ret.length > 0) {
                    db.find("movieinfo", { movie_id: req.query.id })
                        .then((items) => {
                            res.render("movieinfo", {
                                info: ret[0],
                                user: getSession(req),
                                recommands: getRandomArrayElements(item, 7),
                                comment: items,
                                commentLen: items.length,
                            });
                        })
                        .catch(() => {
                            res.render("movieinfo", {
                                info: ret[0],
                                user: getSession(req),
                                recommands: getRandomArrayElements(item, 7),
                                comment: [],
                            });
                        });

                    if (getSession(req)["_id"]) {
                        db.find("movieclick", {
                            user_id: getSession(req)["_id"],
                            movie_id: ret[0]["_id"],
                        }).then((retss) => {
                            if (retss.length <= 0) {
                                db.insert("movieclick", {
                                    user_id: getSession(req)["_id"],
                                    movie_id: ObjectId(req.query.id),
                                    movie_pic: ret[0]["Poster"],
                                    movie_title: ret[0]["Title"],
                                    movie_type: ret[0]['Genre'].split(", ")[0],
                                    createDate: getCurrentDateTime(),
                                    updaeDate: null,
                                });
                            }
                        });
                    }
                } else {
                    res.redirect("/");
                }
            });
        });
    }

    static search(req, res) {
        const reg = new RegExp(req.query.name, "i");
        db.find("movies", { Title: reg }).then((ret) => {
            res.render("search", {
                info: ret,
                user: getSession(req),
            });
        });
    }

    static addInfo(req, res) {
        const id = req.body.id;
        const comment = req.body.comment;
        const rate = req.body.rate;
        const user = getSession(req)["_id"];
        db.find("movieinfo", { movie_id: id, user_id: user }).then((ret) => {
            if (ret.length <= 0) {
                db.insert("movieinfo", {
                        movie_id: id,
                        user_id: user,
                        user_name: getSession(req)["username"],
                        user_avatar: getSession(req)["avatar"],
                        comment: comment,
                        rate: rate,
                        createDate: getCurrentDateTime(),
                        updaeDate: null,
                    })
                    .then((ret) => {
                        res.send(super.ResponseRequest(200, true, "Comment on success"));
                    })
                    .catch((error) => {
                        res.send(super.ResponseRequest(200, false, error));
                    });
            } else {
                res.send(super.ResponseRequest(200, false, "You've already commented"));
            }
        });
    }

    static addMovies(req, res) {
        const userId = getSession(req)["_id"];
        if (!userId) {
            res.send(super.ResponseRequest(200, false, "Please log in again"));
        } else {
            fs.readFile(req.files[0].path, function(err, data) {
                if (err) {
                    console.log("Error");
                } else {
                    const filePath = "../app/public/upload/" + req.files[0].originalname;
                    fs.writeFile(filePath, data, function(err) {
                        const avatar = `/static/upload/${req.files[0].originalname}`;
                        const params = {
                            ...req.body,
                            Poster: avatar,
                            user_id: userId,
                            user_name: getSession(req)["username"],
                            user_avatar: getSession(req)["avatar"],
                        };
                        console.log(params);
                        db.insert("movies", params).then((rets) => {
                            res.send({
                                code: 200,
                                success: true,
                                msg: "Submitted successfully",
                                timestamp: new Date().getTime(),
                            });
                        });
                    });
                }
            });
        }
    }

    static related(req, res) {
        console.log(req.query.name)
        const reg = new RegExp(req.query.name, "i");
        db.find("movies", { Director: reg }).then((ret) => {
            res.render("related", {
                info: ret,
                user: getSession(req),
            });
        });
    }
}

const getRandomArrayElements = (arr, count) => {
    let shuffled = arr.slice(0),
        i = arr.length,
        min = i - count,
        temp,
        index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
};

const sortRank = (a, b) => {
    return parseFloat(a.imdbRating) - parseFloat(b.imdbRating);
};