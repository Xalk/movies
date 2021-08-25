import * as axios from "axios";


let instance = axios.create({
    baseURL: 'https://yts.mx/api/v2/'
})


export let moviesAPI = {
    getMovies(page) {
        return instance.get(`list_movies.json?page=${page}&limit=16`).then(res => res.data);
    },

    getCurrentMovie(movieId) {
        return instance.get(`movie_details.json?movie_id=${movieId}`).then(res => res.data);
    }
}