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
    addMovie: async (_, { name, director_name, production_house, release_date, rating }) => {
      try {
        const newMovie = new MovieModel({
          name,
          director_name,
          production_house,
          release_date,
          rating,
        });
        await newMovie.save();
        return newMovie;
      } catch (err) {
        throw err;
      }
    },
    updateMovie: () => null,
    deleteMovie: () => '',
  },
};

export default resolvers;