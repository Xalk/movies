import './App.css';
import Header from "./components/Header/Header";
import Movies from "./components/Movies/Movies";
import {Route} from "react-router-dom";
import MovieDetailsPage from "./components/MovieDetailsPage/MovieDetailsPage";

function App() {
    return (
        <>
            <Header/>
            <div className="container">
                <Route exact path="/" component={Movies}/>
                <Route path="/movie/:movieId?" component={MovieDetailsPage}/>
            </div>
        </>
    );
}

export default App;
