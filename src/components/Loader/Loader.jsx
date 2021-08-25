import React from 'react';
import loader from "../../assets/images/loading.gif"
import s from "./Loader.module.css"

function Loader() {
    return (
        <div className={s.loaderBody}>
            <img  className={s.loaderImage} src={loader} alt=""/>
        </div>
    );
}

export default Loader;
