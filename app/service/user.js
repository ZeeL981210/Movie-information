import BaseService from "./base";
import { getCurrentDateTime } from "../pkg/dateutil";
import db from "../model/db";
import { md5Encrypt } from "../pkg/utils";
import { setSession, deleteSession, getSession } from "../pkg/secctionUtil";
const fs = require("fs");
const multiparty = require("multiparty");
const ObjectId = require("mongodb").ObjectId;

export default class UserService extends BaseService {
    constructor() {
        super();
    }
    static userIsExist(e, res, callback) {
        db.find("user", { username: e.name })
            .then((ret) => {
                if (ret.length > 0) {
                    res.send(
                        super.ResponseRequest(200, false, "This user already exists")
                    );
                } else {
                    callback(true);
                }
            })
            .catch((error) => {
                res.send(super.ResponseRequest(200, false, error));
            });
    }

    static createUser(e, res) {
        db.insert("user", {
                username: e.name,
                password: e.pwd,
                account_type: e.type,
                createDate: getCurrentDateTime(),
                updaeDate: null,
            })
            .then((ret) => {
                res.send(super.ResponseRequest(200, true, "User created successfully"));
            })
            .catch((error) => {
                res.send(super.ResponseRequest(200, false, error));
            });
    }

    static userLogin(req, res) {
        db.find("user", { username: req.body.name, password: req.body.pwd })
            .then((ret) => {
                if (ret.length > 0) {
                    req.session.userinfo = ret[0];
                    // res.redirect('/')
                    res.send(super.ResponseRequest(200, true, "Login successful"));
                } else {
                    res.send(
                        super.ResponseRequest(
                            200,
                            false,
                            "User does not exist or password error"
                        )
                    );
                }
            })
            .catch((error) => {
                console.log(error);
                res.send(super.ResponseRequest(200, false, error));
            });
    }

    static userLogout(req, res) {
        deleteSession(req);
        res.redirect("/");
    }

    static forget(req, res) {
        db.find("user", { username: req.body.name }).then((ret) => {
            if (ret.length > 0) {
                db.update("user", ret[0], {
                    ...ret[0],
                    password: "000000",
                    updaeDate: getCurrentDateTime(),
                });
                res.send(super.ResponseRequest(200, true, "Password reset succeeded"));
            } else {
                res.send(super.ResponseRequest(200, false, "The user does not exist"));
            }
        });
    }

    static people(req, res) {
        db.find("user", { _id: ObjectId(req.query.id) }).then((ret) => {
            db.find("userfollow", { user_id: getSession(req)["_id"], friend_id: req.query.id }).then((rets) => {
                db.find("movieclick", { user_id: req.query.id }).then((retss) => {
                    db.find("userfollow", { user_id: req.query.id }).then((followPerson) => {
                        db.find("userfollow", { friend_id: req.query.id }).then((byFollowPerson) => {
                            res.render("viewperson", {
                                user: getSession(req),
                                info: ret[0],
                                followPerson,
                                byFollowPerson,
                                movies: retss.splice(0, 4),
                                isFollow: rets.length > 0
                            });
                        })
                    })
                });
            });
        });
    }

    static follow(req, res) {
        db.find("userfollow", {
            user_id: req.body.user_id,
            friend_id: req.body.friend_id,
        }).then((ret) => {
            if (ret.length > 0) {
                db.remove("userfollow", {
                        user_id: req.body.user_id,
                        friend_id: req.body.friend_id,
                    }).then((rets) => {
                        res.send(super.ResponseRequest(200, true, "Cancel attention successfully"));
                    })
                    .catch((error) => {
                        res.send(super.ResponseRequest(200, false, error));
                    });
            } else {
                db.insert("userfollow", {
                        user_id: req.body.user_id,
                        friend_id: req.body.friend_id,
                        friend_name: req.body.friend_name,
                        friend_avatar: req.body.friend_avatar,
                        createDate: getCurrentDateTime(),
                        updaeDate: null,
                    })
                    .then((rets) => {
                        console.log(rets)
                        res.send(super.ResponseRequest(200, true, "Focus on success"));
                    })
                    .catch((error) => {
                        res.send(super.ResponseRequest(200, false, error));
                    });
            }
        });
    }

    static userprofile(req, res) {
        const userId = getSession(req)["_id"];
        db.find("userfollow", { user_id: userId }).then((rets) => {
            db.find("movieclick", { user_id: userId }).then((retss) => {
                db.find("userfollow", { friend_id: req.query.id }).then((p) => {
                    db.find("movies", { user_id: userId }).then((rett) => {
                        const type = moreValue(retss.map(item => {
                            return [item['movie_type']]
                        }).flat()).element
                        db.find("movies", { Genre: new RegExp(type) }).then(rec => {
                            const recommend = rec.sort((a, b) => {
                                return a['imdbRating'] - b['imdbRating']
                            }).splice(0, 5);
                            res.render("userprofile", {
                                user: getSession(req),
                                friend: rets,
                                movies: retss.splice(0, 3),
                                publish: rett,
                                person: p,
                                recommend
                            });
                        });
                    })
                });
            });
        });
    }

    static userFollow(req, res) {
        const userId = getSession(req)["_id"];
        if (userId) {
            db.find("movieclick", { user_id: userId }).then((retss) => {
                if (retss.length > 0) {
                    res.send(
                        super.ResponseRequest(200, true, {
                            data: retss.reverse().splice(0, 5),
                        })
                    );
                } else {
                    res.send(super.ResponseRequest(200, false));
                }
            });
        }
    }

    static uploadPhoto(req, res) {
        if (!req.body.id) {
            res.send(super.ResponseRequest(200, false, "Please log in again"));
        } else {
            fs.readFile(req.files[0].path, function(err, data) {
                if (err) {
                    console.log("Error");
                } else {
                    const filePath = "../app/public/upload/" + req.files[0].originalname;
                    fs.writeFile(filePath, data, function(err) {
                        db.find("user", { _id: ObjectId(req.body.id) }).then((ret) => {
                            if (ret.length > 0) {
                                const avatar = `/static/upload/${req.files[0].originalname}`;
                                db.update("user", ret[0], {
                                    ...ret[0],
                                    avatar: avatar,
                                    updaeDate: getCurrentDateTime(),
                                });
                                res.send({
                                    success: true,
                                    avatar: avatar,
                                });
                            } else {
                                res.send({ success: false });
                            }
                        });
                    });
                }
            });
        }
    }
}

function getFileExtendingName(filename) {
    var reg = /\.[^\.]+$/;
    var matches = reg.exec(filename);
    if (matches) {
        return matches[0];
    }
    return "";
}

const moreValue = arr => {
    if (!arr) return false;
    if (arr.length === 1) return 1;
    let res = {}
    let maxNum = 0;
    let maxValue = null;
    for (let i = 0; i < arr.length; i++) {
        let val = arr[i]
        res[val] === undefined ? res[val] = 1 : res[val]++;
        if (res[val] > maxNum) {
            maxNum = res[val];
            maxValue = val
        }
    }
    return {
        element: maxValue,
        count: maxNum
    };
}