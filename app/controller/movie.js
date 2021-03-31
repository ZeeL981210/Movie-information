import movie from '../service/movie'

export const movieInfo = (req, res) => {
    movie.getInfo(req, res)
}

export const movieSearch = (req, res) => {
    movie.search(req, res)
}

export const addInfo = (req, res) => {
    movie.addInfo(req, res)
}


export const addMovies = (req, res) => {
    movie.addMovies(req, res)
}


export const related = (req, res) => {
    movie.related(req, res)
}