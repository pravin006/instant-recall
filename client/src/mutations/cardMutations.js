import { gql } from '@apollo/client'

export const UPDATE_CARD = gql`
    mutation updateCard($_id: ID!, $question:String!, $answer:String!){
        updateCard(_id:$_id, question:$question, answer:$answer){
            _id
            question
            answer
            dueForReview
        }
    }
`