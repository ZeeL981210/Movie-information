import { index } from '../controller/index'
import { loginView, login, register, logout, forget, userprofile, people, follow, userFollow, publish } from '../controller/user'
import { movieInfo, movieSearch, addInfo, related } from '../controller/movie'

export const GETInterface = {
    '/': index,
    '/login': loginView,
    '/user/logout': logout,
    '/userprofile': userprofile,
    '/movieinfo': movieInfo,
    '/search': movieSearch,
    '/people': people,
    '/user/follow': userFollow,
    '/user/publish': publish,
    '/movie/related': related
}

export const POSTInterface = {
    '/user/register': register,
    '/user/login': login,
    '/user/forget': forget,
    '/movie/addInfo': addInfo,
    '/user/follow': follow,
}

export const PUTInterface = {}

export const DELETEInterface = {}