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


// GENERATE MAIN PAGE VIEW
/**
   * Making the api call for the Get All Movies endpoint
  */

export const MainView = () => {
    const storedUser = localStorage.getItem("user"); // JSON.parse(
    const storedToken = localStorage.getItem("token");
    //console.log("storedUser:", JSON.parse(storedUser));
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [query, setQuery] = useState("");
    let User = JSON.parse(storedUser);

    // console.log("user favs", user.FavoriteMovies);
    // console.log("user", user.Username);    
    // console.log("user favs", User.FavoriteMovies);
    // console.log("user", User.Username);


    // rest of the code

    useEffect(() => {

        /**
     * Making the api call for the Get All Movies endpoint
     * @returns {Observable<any>} - Observable for the API response.
     */

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
                setFilteredMovies(moviesFromApi);
            });
    }, [token]);


    // Search function
    /**
     * Search function for Movies.
     * @param {string} query - Searchquery
     * @returns {Observable<any>} -resulting movies
     */
    const handleSearch = (e) => {

        let query = e.target.value;
        let storedMovies = movies;
        setQuery(query);
        console.log("Searchbar value: ", query);
        console.log("Stored movies: ", storedMovies);

        //Filter movies by title and genre
        let filteredMovies = storedMovies.filter((movie) => {
            // Check if the movie's title or genre includes the search query
            return (
                movie.Title.toLowerCase().includes(query.toLowerCase()) ||
                movie.Genre.Name.toLowerCase().includes(query.toLowerCase()) ||
                movie.Director.Name.toLowerCase().includes(query.toLowerCase())
            );
        });
        console.log("Filtered movies: ", filteredMovies);
        //Update the state with the filtered movies
        setFilteredMovies(filteredMovies);
    };

    // Add Favorite Movie
    /**
   * Making the api call for the Add a Movie to Favourite Movies endpoint.
   * @param {string} username - Users username for getting favorite Movies.
   * @param {any} movieID - Movie for adding to favorite Movies.
   * @returns {Observable<any>} - Observable for the API response.
   */
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
    /**
   * Making the api call for the delete movie endpoint.
   * @param {string} username - Users username for getting favorite Movies.
   * @param {any} movieID - Movie for adding to favorite Movies.
   * @returns {Observable<any>} - Observable for the API response.
   */
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
                query={query}
                handleSearch={handleSearch}
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
                                        {filteredMovies.map((movie) => (
                                            <Col lg={3} className="mx-2 mt-2 mb-5 col-6 p-1" key={movie._id}  >
                                                <MovieCard className="h-100 card-deck"
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
                                ) : query ? (
                                    <Navigate to="/" replace />
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


