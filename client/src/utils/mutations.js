import { gql } from '@apollo/server'

export const LOGIN_USER = gql`
  mutation login($password: String!, $email: String!) {
    login( email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!){
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        } 
    }
`

export const SAVE_BOOK = gql`
    mutation saveBook($book: bookInput!){
        saveBook(book: $book){
            _id
            username
            email
            savedBooks{
                authors
                description
                bookId
                image
                link
                title
        }
    }
`

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!){
        removeBook(bookId: $bookId){
            _id
            username
            savedBooks
        }
    }
`