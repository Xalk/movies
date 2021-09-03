import React, {useState} from 'react';
import ratePhoto from "../../assets/images/Vector.png"
import {NavLink} from "react-router-dom";
import nullPictureMovie from "../../assets/images/nullPictureMovie.png"
import s from "./Movie.module.css"

function Movie({id, movieImage, title, year, genres, rating}) {
    return (
        <div className={s.movieElement}>
            <NavLink to={"/movie/" + id}>
                <div className={s.movieBlock}>
                    {
                        <Img img={movieImage} preloader={nullPictureMovie}/>
                    }

                    <div className={s.movieInfo}>
                        <div className={s.rating}>
                            <img src={ratePhoto} alt=""/>
                            <div>
                                {rating === 0 ? "No rating" : rating}
                            </div>
                        </div>

                        <div className={s.genres}>
                            {
                                genres && genres.map((g,i) => <div key={i}>{g}</div>)
                            }
                        </div>
                        <button className={s.buttonMore}>More</button>
                    </div>
                </div>
                <div className={s.subtitle}>
                    <div className={s.title}>{title}</div>
                    <div className={s.year}>{year}</div>
                </div>

            </NavLink>

        </div>
    );
}


const Img = ({img, preloader}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    let bg = new Image();
    bg.src = img;
    bg.onload = () => {
        setIsLoaded(true);
    };

    return isLoaded ? <img className={s.moviePhoto} src={img} alt=""/> :
        <img className={s.moviePhoto}  src={preloader} alt=""/>;
};


export default Movie;