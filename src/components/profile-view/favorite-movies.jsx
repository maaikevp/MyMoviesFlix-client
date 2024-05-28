import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { ProfileView } from "../profile-view/profile-view";


export const FavoriteMovies = ({ user, favoriteMovies }) => {
  const storedUser = localStorage.getItem("user");
  console.log("storedUser-profile:", JSON.parse(storedUser));
  const User = JSON.parse(storedUser);
  const favoriteMovieList = User.FavoriteMovies;
  console.log("favoriteMovieList:", favoriteMovieList);

  return (
    <Row>
      <Col md={12}>
        <div>
          <h3>List of my favorite movies</h3>
        </div>
      </Col>
      <Row className="justify-content-center">
        {
          favoriteMovieList?.length !== 0 ?
            favoriteMovieList?.map((movie) => (
              <Col sm={7} md={5} lg={3} xl={2} className="mb-4" key={movie._id}>
                <MovieCard
                  movie={movie}
                  removeFav={removeFav}
                  addFav={addFav}
                  isFavorite={favoriteMovieList.includes(movie._id)}
                />
              </Col>
            ))
            : <Col>
              <p>There are no favorites Movies</p>
            </Col>
        }
      </Row>

      {/* <Row>
        <br />
        {favoriteMovies?.map((movie) => {
          return (
            <Col key={movie.id} md={4}>
              <Link to={`/movies/${movie._id}`} />
              <MovieCard
                isFavorite={user.FavoriteMovies.includes(movie.title)}
                movie={movie}
              />
            </Col>
         );
        })}
      </Row> */}

    </Row>
  );
};
// FavoriteMovies.propTypes = {
// favoriteMovies: PropTypes.array.isRequired
// };