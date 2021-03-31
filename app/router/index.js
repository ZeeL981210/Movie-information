import { GETInterface, POSTInterface, PUTInterface, DELETEInterface } from './routes'
const bodyParser = require("body-parser");
import { uploadPhoto } from '../controller/user'
import { addMovies } from '../controller/movie'
const multer = require('multer')
const path = require('path')

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });


export const load = e => {
    for (let i of Object.entries(GETInterface)) {
        e.get(i[0], i[1])
    }
    for (let i of Object.entries(POSTInterface)) {
        e.post(i[0], urlencodedParser, i[1])
    }
    for (let i of Object.entries(PUTInterface)) {
        e.put(i[0], i[1])
    }
    for (let i of Object.entries(DELETEInterface)) {
        e.delete(i[0], i[1])
    }


    let upload = multer({
        storage: multer.diskStorage({
            destination: function(req, file, cb) {
                cb(null, 'app/public/upload/');
            },
            filename: function(req, file, cb) {
                cb(null, file.originalname);
            }
        })
    })
    e.post('/user/photo', upload.array('photo'), uploadPhoto)



    e.post('/user/addMovies', upload.array('Poster'), addMovies)
}