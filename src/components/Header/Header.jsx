import React from 'react';
import {NavLink} from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import back from "../../assets/images/send.svg"
import {setCurrentMovie} from "../../redux/reducers/moviesReducer";
import s from "./Header.module.css"

function Header() {
    let dispatch = useDispatch();
    const {currentMovie} = useSelector(state => ({currentMovie: state.movies.currentMovie}));

    const setCurrentMovieNull = () => {
        dispatch(setCurrentMovie(null));
    }

    return (
        <div className={s.header}>

            <div className={s.headerBody}>
                <NavLink to="/">
                    <div onClick={() => currentMovie && setCurrentMovieNull()}>
                        <span>{currentMovie ? currentMovie.title : "Movies"}</span>
                    </div>
                </NavLink>
                {
                    currentMovie ? <NavLink to="/">
                        <div className={s.backButton} onClick={() => setCurrentMovieNull()}>
                            <img src={back} alt=""/>
                        </div>
                    </NavLink> : <Pagination/>
                }


            </div>
        </div>
    );
}

export default Header;