import { gql } from '@apollo/client'

export const GET_ME = gql `
{
    me {
        _id
        username
        email
        password
        bookCount
        savedBooks {
            _id
            authors
            description
            bookId
            image
            link
            title
        }
    }
}
`