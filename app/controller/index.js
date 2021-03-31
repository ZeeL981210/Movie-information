import movie from '../service/movie'

export const index = (req, res) => {
    movie.find(req, res)
}