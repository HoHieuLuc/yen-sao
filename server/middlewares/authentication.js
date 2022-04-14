const { AuthenticationError } = require('apollo-server');

const authRequired = (_root, _args, context) => {
    if (!context.currentUser) {
        throw new AuthenticationError('Not authenticated');
    }
};

module.exports = authRequired;