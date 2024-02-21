
export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img src={movie.Imagepath} />
            </div>
            <div>
                <span> Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span> Genre: </span>
                <span>{movie.Genre.Name}</span>
            </div>
            <div>
                <span> Director: </span>
                <span>{movie.Director.Name}</span>
            </div>
            <div>
                <span> Actors: </span>
                <span>{movie.Actors}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};