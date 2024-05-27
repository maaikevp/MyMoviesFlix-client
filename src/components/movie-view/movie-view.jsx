
// import PropTypes from "prop-types";
import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

import "./movie-view.scss";
import "../movie-card/movie-card.scss";


export const MovieView = ({ movies }) => {

    const { movieId } = useParams();
    const movie = movies.find((movie) => movie._id === movieId);


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
            <Link to={`/`}>
                <button className="back-button" style={{ cursor: "pointer" }}>Back</button>
            </Link>

        </div>
    );
};
// MovieView.propTypes = {
//     Movies: PropTypes.shape({
//         Title: PropTypes.string,
//         Description: PropTypes.string,
//         Genre: PropTypes.string,
//         Director: PropTypes.string,
//     }).isRequired
// };