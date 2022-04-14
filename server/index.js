const { ApolloServer } = require('apollo-server-express');
const { graphqlUploadExpress } = require('graphql-upload');
const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');

const { PORT } = require('./utils/config');
const connectDB = require('./db/connect');
connectDB().then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.log(error);
});

const schema = require('./graphql');
const { getCurrentUser } = require('./controllers/user');

const start = async () => {
    const app = express();
    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        schema,
        context: async ({ req }) => {
            const authHeader = req ? req.headers.authorization : null;
            return getCurrentUser(authHeader);
        }
    });

    await server.start();
    app.use(cors());
    app.use(graphqlUploadExpress());
    app.use('/public', express.static(path.join(__dirname, 'public')));

    server.applyMiddleware({
        app,
        path: '/gql',
        cors: true
    });

    httpServer.listen(PORT, () => {
        console.log(`Server started on http://localhost:${PORT}/gql`);
    });
};

start();