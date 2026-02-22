import MovieModel from '../models/movie.js';

// Resolvers define the technique for fetching the types defined in the schema.

const resolvers = {
  Query: {
    movies: () => [],
    movie: () => null,
    moviesByDirector: () => [],
  },
  Mutation: {
    addMovie: () => null,
    updateMovie: () => null,
    deleteMovie: () => '',
  },
};

export default resolvers;