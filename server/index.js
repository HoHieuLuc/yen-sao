const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const { graphqlUploadExpress } = require('graphql-upload');
const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');

const { PORT, NODE_ENV } = require('./utils/config');
const connectDB = require('./db/connect');
connectDB().then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.log(error);
});

const schema = require('./graphql');
const { getCurrentUser } = require('./controllers/user.controller');

const start = async () => {
    const app = express();
    const httpServer = http.createServer(app);
    const isDevelopment = NODE_ENV === 'development';

    const server = new ApolloServer({
        schema,
        context: async ({ req }) => {
            const authHeader = req ? req.headers.authorization : null;
            return getCurrentUser(authHeader);
        },
        formatError: (error) => {
            console.log(error);
            if (error.message.includes('Operation')) {
                error.message = 'Internal server error';
            }
            return error;
        },
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        introspection: isDevelopment,
        csrfPrevention: true,
    });

    await server.start();

    app.use(cors());
    app.use(helmet({
        crossOriginEmbedderPolicy: false,
        contentSecurityPolicy: false
    }));

    app.use(graphqlUploadExpress());

    app.use(
        '/public',
        express.static(path.join(__dirname, 'public'))
    );

    if (!isDevelopment) {
        app.use(
            '/',
            express.static(path.join(__dirname, 'public', 'build'))
        );
        app.get('*', (req, res) => {
            res.sendFile(
                'index.html',
                { root: path.join(__dirname, 'public', 'build') }
            );
        });
    }

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