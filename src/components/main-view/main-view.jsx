import React from "react";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";

import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";


// parcel src/index.html

export const MainView = () => {
    const storedUser = localStorage.getItem("user"); // JSON.parse(
    const storedToken = localStorage.getItem("token");
    //console.log("storedUser:", JSON.parse(storedUser));
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    let User = JSON.parse(storedUser);

    // console.log("user favs", user.FavoriteMovies);
    // console.log("user", user.Username);    
    // console.log("user favs", User.FavoriteMovies);
    // console.log("user", User.Username);


    // rest of the code

    useEffect(() => {

        if (!token) {
            return;
        }

        fetch("https://movieapi-production-3a3c.up.railway.app/movies", {
            headers:
            {
                Authorization: `Bearer ${token}`,
                key: "Access-Control-Allow-Credentials", value: "true",
                key: "Access-Control-Allow-Origin", value: "*"
            }
        })

            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const moviesFromApi = data.map((movie) => {
                    return {
                        _id: movie._id,
                        Title: movie.Title,
                        ImagePath: movie.Imagepath,
                        Description: movie.Description,
                        Genre: {
                            Name: movie.Genre.Name
                        },
                        Director: {
                            Name: movie.Director.Name
                        }
                    };
                });
                setMovies(moviesFromApi);

            });
    }, [token]);



    // Add Favorite Movie

    const addFav = (_id) => {

        fetch(`https://movieapi-production-3a3c.up.railway.app/users/${User.Username}/movies/${_id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                //key: "Access-Control-Allow-Credentials", value: "true",
                key: "Access-Control-Allow-Origin", value: "*"
            }
        }).then((response) => {
            if (response.ok) {
                console.log('response', response) //json.stringify
                return response.json();

            } else {
                alert("Failed to add");
            }
        }).then((user) => {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                setUser(user);
                setIsFavorite(true);
            }
        }).catch(error => {
            console.error('Error: ', error);
        });
    };


    // Remove Favorite Movie
    const removeFav = (_id) => {

        fetch(`https://movieapi-production-3a3c.up.railway.app/users/${User.Username}/movies/${_id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                // key: "Access-Control-Allow-Credentials", value: "true",
                key: "Access-Control-Allow-Origin", value: "*"
            }
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Failed to remove")
            }
        }).then((user) => {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                setUser(user);
                setIsFavorite(false);
            }
        }).catch(error => {
            console.error('Error: ', error);
        });
    };

    return (
        <BrowserRouter>
            <NavigationBar user={user}
                // query={searchQuery}
                // handleSearch={handleSearch}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null)
                    localStorage.clear()
                }} />
            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        {/* <LoginView onLoggedIn={(user) => setUser(user)} /> */}
                                        <LoginView
                                            onLoggedIn={(user, token) => {
                                                setUser(user);
                                                setToken(token);
                                            }}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <Col md={8}>
                                        <MovieView
                                            movies={movies}
                                            removeFav={removeFav}
                                            addFav={addFav} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <>
                                        {movies.map((movie) => (
                                            <Col className="mb-4" key={movie._id} md={3}>
                                                <MovieCard
                                                    movie={movie}
                                                    removeFav={removeFav}
                                                    addFav={addFav}
                                                    setIsFavorite={User.FavoriteMovies.includes(movie._id)}
                                                />
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <Col md={8}>
                                        <ProfileView
                                            user={user}
                                            movies={movies}
                                            setUser={setUser}
                                            token={token}
                                        // removeFav={removeFav}
                                        // addFav={addFav}
                                        // setIsFavorite={User.FavoriteMovies.includes(movie._id)}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};


