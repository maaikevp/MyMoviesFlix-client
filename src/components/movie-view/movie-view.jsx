
import PropTypes from "prop-types";

import "./movie-view.scss";

import "../movie-card/movie-card.scss";


export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img src={movie.ImagePath} alt="movie cover" className="card-image" />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director.Name}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre.Name}</span>
            </div>
            <button onClick={onBackClick} className="back-button" style={{ cursor: "pointer" }}>Back</button>
        </div>
    );
};




