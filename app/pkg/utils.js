const md5 = require('md5')

export const md5Encrypt = e => {
    return md5(e)
}