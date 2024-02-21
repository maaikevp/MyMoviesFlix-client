import { useState } from "react";

import { MovieCard } from "../movie-card/movie-card";

import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {

    const [movies, setmovies] = useState([
        {
            "Genre": {
                "Name": "Comedy",
                "Description": "Intended to amuse and entertain, often characterized by humor and satire."
            },
            "Director": {
                "Name": "Wes Anderson",
                "Bio": "Known for his distinctive visual style and quirky storytelling, Wes Anderson is a Houston-born American filmmaker with a unique cinematic vision.",
                "Birth": 1969,
                "Death": null
            },
            "_id": "659e5e9edc8d06e38ac5ef98",
            "Title": "The Grand Budapest Hotel",
            "Description": "A whimsical caper involving a hotel concierge and his protege as they navigate a series of comedic and mysterious events.",
            "Imagepath": "https://image.tmdb.org/t/p/original/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
            "Actors": [
                "Ralph Fiennes ",
                "Tony Revolori ",
                "Adrien Brody ",
                "Willem Dafoe "
            ],
            "Featured": true
        },
        {
            "Genre": {
                "Name": "Animation",
                "Description": "Movies created through animation techniques, often targeting family audiences."
            },
            "Director": {
                "Name": "Rob Minkoff",
                "Bio": "Director of animated and family-friendly films, Rob Minkoff is known for his work on movies like 'The Lion King' and 'Stuart Little.'",
                "Birth": null,
                "Death": null
            },
            "_id": "659e5e9fdc8d06e38ac5efa0",
            "Title": "The Lion King",
            "Description": "An animated adventure following the journey of a young lion prince named Simba as he navigates the challenges of the African savannah.",
            "Imagepath": "https://image.tmdb.org/t/p/original/cEdPdcSUDYGxVm7Nn3bjaotHqQx.jpg",
            "Actors": [
                "Matthew Broderick ",
                "Jeremy Irons ",
                "James Earl Jones ",
                "Moira Kelly "
            ],
            "Featured": false
        },
        {
            "Genre": {
                "Name": "Adventure",
                "Description": "Films featuring characters on a journey or quest, often involving challenges."
            },
            "Director": {
                "Name": "Rob Minkoff",
                "Bio": "Director of animated and family-friendly films, Rob Minkoff is known for his work on movies like 'The Lion King' and 'Stuart Little.'",
                "Birth": null,
                "Death": null
            },
            "_id": "659e5e9fdc8d06e38ac5efa1",
            "Title": "Stuart Little",
            "Description": "A heartwarming adventure follows Stuart, a small mouse born to a human family, as he embarks on a journey to find his place in the world.",
            "Imagepath": "https://image.tmdb.org/t/p/original/y8FCqlyzgJIX3cXsdoh6KVnTovG.jpg",
            "Actors": [
                "Michael J. Fox ",
                "Geena Davis ",
                "Hugh Laurie ",
                "Jonathan Lipnicki"
            ],
            "Featured": false
        }
    ]);


    // VARIABLES CASE SENSITIVE
    // double quotes around variables are fine 


    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    }


    if (movies.length === 0) {
        return <div>The list is empty! </div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};

// You don’t have to use the name movie if you find it confusing to use the same name as the movie object you’re passing as a value.
// It could, for example, be movieData={movie}

// const [Movies, setBooks] = useState([
//     { id: 1, title: "Eloquent JavaScript" },
//     { id: 2, title: "Mastering JavaScript Functional Programming" },
//     { id: 3, title: "JavaScript: The Good Parts" },
//     { id: 4, title: "JavaScript: The Definitive Guide" },
//     { id: 5, title: "The Road to React" }
// ]);