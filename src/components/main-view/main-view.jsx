import React from "react";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Row";

// // VARIABLES CASE SENSITIVE
// // double quotes around variables are fine


export const MainView = () => {
    const storedUser = localStorage.getItem("user"); // JSON.parse(
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);


    // rest of the code


    useEffect(() => {

        if (!token) {
            return;
        }

        fetch("https://testingmovie-apionrender.onrender.com/movies", {
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

    return (
        <Row>
            <Row className="justify-content-md-center">
                {!user ? (
                    <Col md={5}>
                        <row>
                            <LoginView
                                onLoggedIn={(user, token) => {
                                    setUser(user);
                                    setToken(token);
                                }}
                            />
                        </row>
                        <br />
                        <hr />
                        <row>
                            <SignupView />
                        </row>
                    </Col>
                ) : selectedMovie ? (
                    <Col md={8} >
                        <MovieView
                            key={movies.id}
                            movie={selectedMovie}
                            onBackClick={() => setSelectedMovie(null)}
                        />

                    </Col>
                ) : movies.length === 0 ? (
                    <div>The list is empty!</div>
                ) : (
                    <>
                        {movies.map((movie) => (
                            <Col className="mb-5" key={movie.id} md={3}>
                                <MovieCard
                                    movie={movie}
                                    onMovieClick={(newSelectedMovie) => {
                                        setSelectedMovie(newSelectedMovie);
                                    }}
                                />
                            </Col>
                        ))}
                        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
                    </>
                )}
            </Row>
        </Row>
    );
};
