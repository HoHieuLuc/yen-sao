// may cause explosion
const chainMiddlewares = (...middlewares) => {
    return (root, args, context) =>
        middlewares.reduce((promise, middleware) => {
            return promise.then(() => middleware(root, args, context));
        }, Promise.resolve());
};

module.exports = chainMiddlewares;