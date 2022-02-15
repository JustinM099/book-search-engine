const { User } = require('../models');

const resolvers = {
  Query: {
    tech: async () => {
      return Tech.find({});
    },
    matchups: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Matchup.find(params);
    },
  },
  Mutation: {
    createMatchup: async (parent, args) => {
      const matchup = await Matchup.create(args);
      return matchup;
    },
    createVote: async (parent, { _id, techNum }) => {
      const vote = await Matchup.findOneAndUpdate(
        { _id },
        { $inc: { [`tech${techNum}_votes`]: 1 } },
        { new: true }
      );
      return vote;
    },
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
