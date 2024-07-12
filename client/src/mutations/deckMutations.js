import { gql } from '@apollo/client'


export const ADD_DECK = gql`
    mutation addDeck($name: String!) {
        addDeck(deckName: $name) {
            _id
            deckName
            isActive
            lastActive
        }
    }
`;

export const DELETE_DECK = gql`
    mutation deleteDeck($_id: ID!) {
        deleteDeck(_id: $_id) {
            _id
        }
    }
`;
