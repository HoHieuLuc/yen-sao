const { AuthenticationError } = require('apollo-server');

const authRequired = (root, args, context) => {
    if (!context.currentUser) {
        throw new AuthenticationError('Not authenticated');
    }
};

module.exports = authRequired;