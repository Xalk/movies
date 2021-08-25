import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getMoviesThunk} from "../../redux/reducers/moviesReducer";
import s from "./Pagination.module.css"

function Pagination() {

    const dispatch = useDispatch();
    const {currentPage} = useSelector(state => ({
        currentPage: state.movies.page_number
    }));

    const getCurrentPage = (page) => {
        dispatch(getMoviesThunk(page));
    }

    return (
        <div className={s.pagination}>
            {
                currentPage - 1 > 0 &&
                <div className={s.button} onClick={() => getCurrentPage(currentPage - 1)}>{currentPage - 1}</div>
            }
            <div className={s.button + " " + s.currentPage}>{currentPage}</div>
            <div className={s.button} onClick={() => getCurrentPage(currentPage + 1)}>{currentPage + 1}</div>
        </div>
    );
}

export default Pagination;