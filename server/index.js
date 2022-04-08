const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();
const express = require('express');
const http = require('http');

const schema = require('./graphql');

const start = async () => {
    const app = express();
    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        schema
    });

    await server.start();

    server.applyMiddleware({
        app,
        path: '/gql'
    });

    const PORT = process.env.PORT || 3001;

    httpServer.listen(PORT, () => {
        console.log(`Server started on http://localhost:${PORT}/gql`);
    });
};

start();