const mongodb = require("mongodb");
import config from "../../config/index";

class Db {
    static getInstance() {
        if (!Db.instance) {
            Db.instance = new Db();
        }
        return Db.instance;
    }

    constructor() {
        this._dbClient = null;
        this.connect();
    }
    connect() {
        return new Promise((resolve, reject) => {
            if (!this._dbClient) {
                mongodb.connect(
                    `${config.mongo.host}/${config.mongo.db}`, { useNewUrlParser: true },
                    (err, client) => {
                        if (err) {
                            reject(err);
                        } else {
                            this._dbClient = client.db(config.db);
                            resolve(this._dbClient);
                        }
                    }
                );
            } else {
                resolve(this._dbClient);
            }
        });

    }

    find(collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                const result = db.collection(collectionName).find(json);
                result.toArray((err, docs) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(docs);
                    }
                });
            });
        });
    }

    insert(collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).insertOne(json, (err, result) => {
                    if (err) {
                        console.log("新增失败");
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        });
    }

    update(collectionName, json1, json2) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).updateOne(
                    json1, {
                        $set: json2,
                    },
                    (err, result) => {
                        if (err) {
                            console.log("Fail to update");
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    }
                );
            });
        });
    }

    remove(collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).deleteOne(json, (err, result) => {
                    if (err) {
                        console.log("Fail to add");
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        });
    }
}

export default Db.getInstance();