import {moviesAPI} from "../../api/api";

const SET_MOVIES = "SET_MOVIES";
const SET_IS_FETCHING = "SET_IS_FETCHING";
const SET_MOVIE_COUNT = "SET_MOVIE_COUNT";
const SET_LIMIT = "SET_LIMIT";
const SET_CURRENT_MOVIE = "SET_CURRENT_MOVIE";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";

let initialState = {
    isFetching: false,
    movie_count: 0,
    limit: 0,
    page_number: 1,
    moviesList: [],
    currentMovie: null,
    comments: []
}


const moviesReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_MOVIES:
            return {
                ...state,
                moviesList: action.payload
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            }
        case SET_MOVIE_COUNT:
            return {
                ...state,
                movie_count: action.payload
            }
        case SET_LIMIT:
            return {
                ...state,
                limit: action.payload
            }
        case SET_CURRENT_MOVIE:
            return {
                ...state,
                currentMovie: action.payload
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                page_number: action.payload
            }

        default:
            return state
    }

}

const setMovies = (movies) => ({type: SET_MOVIES, payload: movies});
const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, payload: isFetching});
const setMovieCount = (count) => ({type: SET_MOVIE_COUNT, payload: count});
const setLimit = (limit) => ({type: SET_LIMIT, payload: limit});
const setCurrentPage = (page) => ({type: SET_CURRENT_PAGE, payload: page});
export const setCurrentMovie = (currentMovie) => ({type: SET_CURRENT_MOVIE, payload: currentMovie});



export let getMoviesThunk = (page) => {
    return async dispatch => {
        dispatch(setIsFetching(true));
        let data = await moviesAPI.getMovies(page);
        dispatch(setMovies(data.data.movies));
        dispatch(setMovieCount(data.data.movie_count));
        dispatch(setLimit(data.data.limit));
        dispatch(setCurrentPage(page));
        dispatch(setIsFetching(false));
    }
}

export let getCurrentMovieThunk = (movieId) => {
    return async dispatch => {
        dispatch(setIsFetching(true));
        let data = await moviesAPI.getCurrentMovie(movieId);
        dispatch(setCurrentMovie(data.data.movie));
        dispatch(setIsFetching(false));

    }
}


export default moviesReducer;