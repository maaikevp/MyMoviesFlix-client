import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import { Button, Card, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import moment from 'moment';
// import { FavoriteMovies } from "./favorite-movies";

// import PropTypes from "prop-types";

import { UpdateUser } from "./update-user";



export const ProfileView = ({ token, user, movies, setUser, removeFav, addFav }) => {

  // CURRENT USER DETAILS

  const storedUser = localStorage.getItem("user");
  console.log("storedUser-profile:", JSON.parse(storedUser));
  const User = JSON.parse(storedUser);

  const [username, setUsername] = useState(User.Username);
  const [email, setEmail] = useState(User.Email);
  const [birthday, setBirthday] = useState(User.Birthday);  // 
  const [password, setPassword] = useState();

  const favoriteMovies = User.FavoriteMovies;
  //const favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m.title));
  // Return list of favorite Movies
  // const favoriteMovieList = movies.filter(m => User.FavoriteMovies.includes(m._id));

  console.log("email:", email);
  console.log("username", username);


  //  CHANGE USER DETAILS 

  const formData = {
    UserName: username,
    Email: email,
    // Birthday: birthday,
    Password: password
  };

  formData.Birthday = birthday ? new Date(birthday).toISOString().substring(0, 10) : null;

  const handleSubmit = (event) => {
    event.preventDefault(event);

    console.log("username", user.Username);




    // Send updated user information to the server, endpoint /users/:username
    fetch(`https://movieapi-production-3a3c.up.railway.app//users/${username}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        key: "Access-Control-Allow-Credentials", value: "true",
        key: "Access-Control-Allow-Origin", value: "*"
      }
    }
    )
      .then((response) => {
        if (response.ok) {
          alert("Update successful");
          window.location.reload();
          console.log(response)
          return response.json()
        }
        alert("Update failed");
      })
      .then((user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          setUser(user)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdate = (e) => {
    switch (e.target.type) {
      case "text":
        setUsername(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "date":
        setBirthday(e.target.value);
      default:
    }
  }

  // Delete account

  // Delete User
  const handleDelete = () => {
    fetch(`https://testingmovie-apionrender.onrender.com/users/${username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        key: "Access-Control-Allow-Credentials", value: "true",
        key: "Access-Control-Allow-Origin", value: "*"
      }
    }).then((response) => {
      if (response.ok) {
        setUser(null);
        alert("User has been deleted")
        localStorage.clear();
        navigate('/'); // go back to home page
      } else {
        alert("Something went wrong.")
      }
    })
  }

  return (
    <>
      <Row>

        {/* Profile Information */}
        <Col md={12}>
          <Card className="mt-2 mb-3">
            <Card.Body>
              <Card.Title>Profile Information</Card.Title>
              <p>Name: {username}</p>
              <p>Email: {email}</p>
              {/* <p>Birthday: {birthday}</p> */}
              <p>Date of Birth: {moment(birthday).utc().format('YYYY-MM-DD')}</p>
            </Card.Body>
          </Card>
        </Col>
        {/* UPDATE USER */}
        <Col>
          <UpdateUser
            formData={formData}
            handleUpdate={handleUpdate}
            handleSubmit={handleSubmit}
          />
          <Button onClick={handleDelete} className="mt-1 bg-danger border-danger text-white">Delete User</Button>
        </Col>

      </Row>

      {/* favorite movies */}

      {/* <Row className="justify-content-center">
        {
          favoriteMovies?.length !== 0 ?
            favoriteMovies?.map((movie) => (
              <Col sm={7} md={5} lg={3} xl={2} className="mx-2 mt-2 mb-5 col-6 similar-movies-img" key={movie._id}>
                <MovieCard
                  movie={movie}
                  removeFav={removeFav}
                  addFav={addFav}
                  setIsFavorite={User.FavoriteMovies.includes(movie._id)}
                />
              </Col>
            ))
            : <Col>
              <p>There are no favorites Movies</p>
            </Col>
        }
      </Row> */}

      {/* <Row>
        <Col className="mb-5" xs={12} md={9}>
          <FavoriteMovies
            user={user}
            favoriteMovies={favoriteMovies} />
        </Col>
      </Row> */}



    </>
  );
}



//   ProfileView.propTypes = {
//   //  localUser: PropTypes.object.isRequired,
//     movies: PropTypes.array.isRequired,
//     token: PropTypes.string.isRequired
//   };

