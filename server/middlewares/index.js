const chainMiddlewares = (...middlewares) => {
    return (root, args, context, info) =>
        middlewares.reduce((promise, middleware) => {
            return promise.then(() => middleware(root, args, context, info));
        }, Promise.resolve());
};

module.exports = chainMiddlewares;