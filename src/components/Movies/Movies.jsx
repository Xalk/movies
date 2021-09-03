import React, {useCallback, useEffect} from 'react';
import Movie from "../Movie/Movie";
import {useDispatch, useSelector} from "react-redux";
import {getMoviesThunk} from "../../redux/reducers/moviesReducer";
import Loader from "../Loader/Loader";
import s from "./Movies.module.css"

function Movies() {
    let dispatch = useDispatch();

    let moviesState = useSelector(state => ({
        moviesList: state.movies.moviesList,
        isFetching: state.movies.isFetching,
        page: state.movies.page_number

    }));

    const initMovies = useCallback(() => {
        dispatch(getMoviesThunk(moviesState.page));
    }, [dispatch, moviesState.page]);

    useEffect(() => {
        initMovies();
    }, [initMovies]);


    return (
        <>
            {
                moviesState.isFetching ? <Loader/> : <div className={s.moviesContainer}>
                    {
                        moviesState.moviesList.map((m,i) => <Movie
                            key={i}
                            id={m.id}
                            movieImage={m.large_cover_image}
                            title={m.title}
                            year={m.year}
                            rating={m.rating}
                            genres={m.genres}
                        />)
                    }
                </div>
            }

        </>

    );
}

export default Movies;