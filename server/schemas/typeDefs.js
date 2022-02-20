//import gql
const { gql } = require('apollo-server-express')


const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    _id: ID!
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Query {
    me: [User]
  }

  type Auth {
      token: ID!
      user: User
  }

  input bookInput {
      authors: [String]
      description: String!
      bookId: String!
      image: String
      link: String
      title: String!
  }

  type Mutation {
    login(email: String!, password: string!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: bookInput!): User
    removeBook(bookId: String!): User
  }
`

module.exports = typeDefs