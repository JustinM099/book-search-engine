const { User } = require('../models');
const { signToken, authMiddleware } = require('../utils/auth');

//TOKENS?!?!?

const resolvers = {
  Query: {
    user: async () => {
      return User.findOne({})
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args)
      return user;
    },
    login: async (parent, args) => {
        const user = await User.findOne(args)
    }
  },
};

module.exports = resolvers;

// const router = require('express').Router();
// const {
//   createUser,
//   getSingleUser,
//   saveBook,
//   deleteBook,
//   login,
// } = require('../../controllers/user-controller');

// // import middleware
// const { authMiddleware } = require('../../utils/auth');

// // put authMiddleware anywhere we need to send a token for verification of user
// router.route('/').post(createUser).put(authMiddleware, saveBook);

// router.route('/login').post(login);

// router.route('/me').get(authMiddleware, getSingleUser);

// router.route('/books/:bookId').delete(authMiddleware, deleteBook);

// module.exports = router;
