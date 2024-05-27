
import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-card.scss";


export const MovieCard = ({ movie }) => {
    return (
        <Card className="h-100 card-deck">
            <Card.Img src={movie.ImagePath} variant="top" className="card-img" alt="movie cover" /> <br></br>
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Genre.Name}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie._id)}`}><Button variant="link">Open</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};


// Prop constraints

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string,
        Imagepath: PropTypes.string, //.isRequired,
        //Director: PropTypes.string
    }).isRequired,

};


