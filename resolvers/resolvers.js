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
    updateMovie: async (_, { id, name, director_name, production_house, release_date, rating }) => {
      try {
        const update = {};
        if (name !== undefined) update.name = name;
        if (director_name !== undefined) update.director_name = director_name;
        if (production_house !== undefined) update.production_house = production_house;
        if (release_date !== undefined) update.release_date = release_date;
        if (rating !== undefined) update.rating = rating;

        const updatedMovie = await MovieModel.findByIdAndUpdate(id, update, {
          new: true,
          runValidators: true,
        });
        if (!updatedMovie) {
          throw new Error('Movie not found');
        }
        return updatedMovie;
      } catch (err) {
        throw err;
      }
    },
    deleteMovie: async (_, { id }) => {
      try {
        const deletedMovie = await MovieModel.findByIdAndDelete(id);
        if (!deletedMovie) {
          throw new Error('Movie not found');
        }
        return 'Movie deleted successfully';
      } catch (err) {
        throw err;
      }
    },
  },
};

export default resolvers;