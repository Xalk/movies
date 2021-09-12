import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCurrentMovieThunk, setCurrentMovie} from "../../redux/reducers/moviesReducer";
import rate from "../../assets/images/Vector.png";
import send from "../../assets/images/send.svg";
import s from "./MovieDetailsPage.module.css"

import Loader from "../Loader/Loader";

function MovieDetailsPage({match}) {

    let dispatch = useDispatch();
    let movieId = match.params.movieId;


    const initCurrentMovie = useCallback(() => {
        dispatch(getCurrentMovieThunk(movieId));
    }, [dispatch, movieId]);

    useEffect(() => {
        initCurrentMovie();
        initCommentsDB();
    }, [initCurrentMovie]);


    useEffect(() => {
        return () => dispatch(setCurrentMovie(null));
    }, [dispatch]);


    let movieState = useSelector(state => ({
        isFetching: state.movies.isFetching,
        currentMovie: state.movies.currentMovie,
        comments: state.movies.comments
    }));


    const [commentText, setCommentText] = useState("");
    const [currentComments, setCurrentComments] = useState([]);

    const onChangeHandler = (e) => {
        setCommentText(commentText.trim() ? e.target.value : e.target.value.trim());
    }

    const addComment = (text) => {
        if (text) {
            let d = new Date().toString().slice(0, 24);
            let newComment = {
                commentId: Math.floor(Math.random() * 10 ** 5),
                movieId: movieId,
                commentText: text,
                time: d,
                author: "You"
            }
            setCurrentComments([...currentComments, newComment]);
            setCommentText("");
            return newComment;
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("commentsDB", JSON.stringify(currentComments));
    }


    const initCommentsDB = () => {
        let dbStr = localStorage.getItem("commentsDB");
        let db = JSON.parse(dbStr);
        if (db) {
            setCurrentComments(db);
        }
    }

    const deleteComment = (commentId) => {
        let filteredComments = currentComments.filter(c => c.commentId !== commentId);
        setCurrentComments(filteredComments);
        localStorage.setItem("commentsDB", JSON.stringify(filteredComments));
    }

    return (
        <>
            {
                movieState.isFetching ? <Loader/> :
                    movieState.currentMovie && <div className={s.detailsContainer}>
                        <div className={s.left}>
                            <div className={s.image}>
                                <img className={s.coverImage}
                                     src={movieState.currentMovie.large_cover_image} alt=""/>
                                <div className={s.ratingBlock}>
                                    <img src={rate} alt=""/>
                                    <div
                                        className={s.ratingNum}>{movieState.currentMovie.rating}</div>
                                </div>
                            </div>

                        </div>
                        <div className={s.right}>
                            <div className={s.shortInfoMovie}>
                                <div className={s.titleMovie}>{movieState.currentMovie.title}</div>
                                <div className={s.trailer}>
                                    {
                                        movieState.currentMovie.yt_trailer_code ?
                                            <a href={`https://www.youtube.com/watch?v=${movieState.currentMovie.yt_trailer_code}`}>
                                                <button>TRAILER</button>
                                            </a> :
                                            <a href={`https://www.youtube.com/results?search_query=${movieState.currentMovie.title} trailer`}>
                                                <button>TRAILER</button>
                                            </a>
                                    }

                                </div>
                                <div className={s.yearMovie}>{movieState.currentMovie.year}</div>
                                <div>{movieState.currentMovie.genres.map((g, i) => <div
                                    className={s.genreItem} key={`${g}_${i}`}>{g}</div>)}</div>
                                <div className={s.synopsis}>Synopsis</div>
                                <div className={s.movieAbout}>{movieState.currentMovie.description_full}</div>
                            </div>
                            <div className={s.commentsBody}>
                                <form action=""
                                      onSubmit={(e) => handleSubmit(e)}
                                      onKeyDown={(e) => {
                                          if (e.code === "Enter") {
                                              localStorage.setItem("commentsDB", JSON.stringify([...currentComments, addComment(commentText)]));
                                          }
                                      }}
                                >
                                    <div className={s.commentsTitle}>Comments</div>
                                    <div className={s.outputComments}>
                                        {
                                            currentComments && currentComments.filter(m => m.movieId === movieId).map((c, i) =>
                                                <div className={s.comment} key={`${c}_${i}`}>
                                                    <div className={s.author}>{c.author}</div>
                                                    <div className={s.time}>{c.time}</div>
                                                    <div className={s.text}>{c.commentText}</div>
                                                    <div className={s.delButton}
                                                         onClick={() => deleteComment(c.commentId)}>
                                                    </div>
                                                </div>)
                                        }
                                    </div>
                                    <div className={s.inputArea}>
                                        <textarea onChange={onChangeHandler}
                                                  value={commentText} placeholder="Leave a comment"
                                        >
                                        </textarea><br/>
                                        <button type="submit" className={s.buttonComm}
                                                onClick={() => addComment(commentText)}>
                                            <img src={send} alt=""/>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
            }
        </>
    );
}

export default MovieDetailsPage;
