//set session
export const setSession = (req, obj) => {
    req.session.userinfo = obj
}

//read session
export const getSession = (req) => {
    console.log(req.session.userinfo)
    return req.session.userinfo ? req.session.userinfo : ''
}

//delete session
export const deleteSession = (req) => {
    req.session.destroy();
}