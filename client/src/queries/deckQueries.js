import { gql } from '@apollo/client'

export const GET_DECKS = gql`
    query getDecks {
        decks {
            _id
            deckName
            isActive
            lastActive
        }
    }
`;

export const GET_DECK = gql`
    query getDeck($_id: ID!) {
        deck(_id:$_id){
            deckName
            lastActive
            cards{
                _id
                question
                answer
                dueForReview
            }
        }
    }
`
