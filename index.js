import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import movieSchema from './schemas/schema.js';
import movieResolvers from './resolvers/resolvers.js';
import mongoose from 'mongoose';
import fs from 'fs';
import Movie from './models/movie.js';

import { ApolloServer }  from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';

const app = express();

dotenv.config();

const DB_CONNECTION = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.${process.env.CLUSTER_ID}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`

const connectDB = async() => {
    await mongoose.connect(DB_CONNECTION)
}

async function startServer() {
    const server = new ApolloServer({
      typeDefs: movieSchema,
      resolvers: movieResolvers
    });

    await server.start();

    app.use(
      '/graphql', 
      cors(),
      express.json(),
      expressMiddleware(server)
    );

    app.listen(process.env.PORT, async () => {
      console.log(`🚀 Server ready at http://localhost:${process.env.PORT}/graphql`);

      try {
        await connectDB();
        console.log('Connected to MongoDB Atlas');
      } catch (error) {
        console.log(`Unable to connect to DB : ${error.message}`);
      }
    })
}

startServer();