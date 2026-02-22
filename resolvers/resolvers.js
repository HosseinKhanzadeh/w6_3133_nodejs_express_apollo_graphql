import MovieModel from '../models/movie.js';


const resolvers = {
  Query: {
    movies: async () => {
      try {
        const movies = await MovieModel.find();
        return movies;
      } catch (err) {
        throw err;
      }
    },
    movie: async (_, { id }) => {
      try {
        const movie = await MovieModel.findById(id);
        return movie;
      } catch (err) {
        throw err;
      }
    },
    moviesByDirector: async (_, { director_name }) => {
      try {
        const movies = await MovieModel.find({ director_name });
        return movies;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    addMovie: () => null,
    updateMovie: () => null,
    deleteMovie: () => '',
  },
};

export default resolvers;