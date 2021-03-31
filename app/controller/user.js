import user from "../service/user"
import { getSession } from '../pkg/secctionUtil'

export const loginView = (req, res) => {
    return res.render('login')
}

export const login = (req, res) => {
    user.userLogin(req, res)
}

export const logout = (req, res) => {
    user.userLogout(req, res)
}

export const forget = (req, res) => {
    user.forget(req, res)
}

export const register = (req, res) => {
    user.userIsExist(req.body, res, e => {
        if (e) {
            user.createUser(req.body, res)
        }
    })
}

export const userprofile = (req, res) => {

    user.userprofile(req, res)
}


export const uploadPhoto = (req, res) => {
    user.uploadPhoto(req, res)
}

export const people = (req, res) => {
    user.people(req, res)
}

export const follow = (req, res) => {
    user.follow(req, res)
}
export const userFollow = (req, res) => {
    user.userFollow(req, res)
}


export const publish = (req, res) => {
    res.render('publish', {
        user: getSession(req),
    })
}