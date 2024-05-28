
import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BookmarkHeart, BookmarkHeartFill } from "react-bootstrap-icons";

import { ProfileView } from "../profile-view/profile-view";

import "./movie-card.scss";


export const MovieCard = ({ movie, addFav, removeFav, setIsFavorite }) => {
    return (
        <Card className="h-100 card-deck">
            <Card.Img src={movie.ImagePath} variant="top" className="card-img" alt="movie cover" /> <br></br>
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                {/* <Card.Text>{movie.Genre.Name}</Card.Text> */}
                <Link to={`/movies/${encodeURIComponent(movie._id)}`}><Button variant="link">Open</Button>
                </Link>
                <div>
                    {setIsFavorite ? (
                        <BookmarkHeartFill size={40} color="orange" className="fav-button mt-2 me-2 top-0 end-0" onClick={() => removeFav(movie._id)} />
                    ) : (
                        <BookmarkHeart size={40} color="orange" className="fav-button mt-2 me-2 top-0 end-0" onClick={() => addFav(movie._id)} />
                    )}
                </div>
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


