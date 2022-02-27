const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express')
const { signToken, authMiddleware } = require('../utils/auth');


const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const data = await User.findOne({ _id: context.user._id })
        return data
      }
      throw new AuthenticationError('You seem to be not logged in.');
    },
  },
  Mutation: {
    addUser: async (parent, args) => {

      try {
        const user = await User.create(args)
        const token = signToken(user)

        return { token, user }
      } catch (err) {
        console.log(err, ' add usererrrrr!!')
      }

    },
    login: async (parent, { email, password }) => {
      try {


        const user = await User.findOne({ email })
        if (!user) {
          throw new AuthenticationError('Sorry, I could not find your login info in my database.')
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new AuthenticationError('Sorry, your password seems to be incorrect.')
        }
        const token = signToken(user)
        return { token, user }
      } catch (err) {
        console.log('ERR!!! for login', err)
      }
    },
    saveBook: async (parent, { input }, context) => {
      console.log('Context!!!', context.user)
      console.log('BOood!!!', input)
      if (context.user) {
        try {
          const myuser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $push: { savedBooks: input } },
            { new: true }
          )
          return myuser
        } catch (err) {
          console.log(err)
          throw new AuthenticationError('Sorry, something went wrong.')
        }
      }

    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
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
