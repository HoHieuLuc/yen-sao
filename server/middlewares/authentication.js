const { AuthenticationError, ForbiddenError } = require('apollo-server');

const authRequired = (_root, _args, context) => {
    if (!context.currentUser) {
        throw new AuthenticationError('Not authenticated');
    }
};

const adminRequired = (_root, _args, context) => {
    if (!context.currentUser || context.currentUser.role !== 'admin') {
        throw new ForbiddenError('Bạn không được phép làm điều này');
    }
};

module.exports = {
    authRequired,
    adminRequired
};