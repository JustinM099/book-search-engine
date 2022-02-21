const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express')
const { signToken, authMiddleware } = require('../utils/auth');


const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const data = await User.findOne({_id: context.user_id})
        return data
      }
      throw new AuthenticationError('You seem to be not logged in.');
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args)
      const token = signToken(user)
      return { token, user }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({  email })
      if (!user) {
        throw new AuthenticationError('Sorry, I could not find your login info in my database.')
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Sorry, your password seems to be incorrect.')
      }
      const token = signToken(user)
      return { token, user }
    },
    saveBook: async (parent, { book }, context) =>  {
      if(context.user){
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
        { $push: { savedBooks: book } },
        { new: true }
        )
        return user
      } else {
        throw new AuthenticationError('Sorry, something went wrong.')
      }

    },
    deleteBook: async (parent, { book }, context) => {
      if(context.user){
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: book } },
          { new: true }
        )
        return user
      } else {
        throw new AuthenticationError('Sorry, something went wrong.')
      }
    }
  },
};

module.exports = resolvers;
