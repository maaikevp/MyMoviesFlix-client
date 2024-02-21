

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