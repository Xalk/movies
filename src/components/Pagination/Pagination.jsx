import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getMoviesThunk} from "../../redux/reducers/moviesReducer";
import s from "./Pagination.module.css"

function Pagination() {

    const dispatch = useDispatch();
    const {currentPage, isFetching} = useSelector(state => ({
        currentPage: state.movies.page_number,
        isFetching: state.movies.isFetching

    }));

    const getCurrentPage = (page) => {
        dispatch(getMoviesThunk(page));
    }

    return (
        <div className={s.pagination}>
            {
                currentPage - 1 > 0 &&
                <div className={isFetching ? s.button + " " + s.disable : s.button}
                     onClick={() => getCurrentPage(currentPage - 1)}>{currentPage - 1}</div>
            }
            <div className={s.button + " " + s.currentPage}>{currentPage}</div>
            <div className={isFetching ? s.button + " " + s.disable : s.button}
                 onClick={() => getCurrentPage(currentPage + 1)}>{currentPage + 1}</div>
        </div>
    );
}

export default Pagination;