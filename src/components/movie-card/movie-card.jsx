
// Here you import the PropTypes library
import PropTypes from "prop-types";


// The BookCard function component 
export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div
            onClick={() => {
                onMovieClick(movie);
            }}
        >
            {movie.Title}
        </div>
    );
};


// Here is where we define all the props constraints for the BookCard

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string,
        Imagepath: PropTypes.string.isRequired,
        Director: PropTypes.string
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};




// 2 options

//  Accessing the props argument
// export const BookCard = (props) => {
//     return <div>{props.book.title}</div>;
//   };


//   Destructured the props argument
// export const BookCard = ({ book }) => {
//     return <div>{book.title}</div>;
// };


// old
//   export const BookCard = () => {
//     return <div>some title</div>;
// };