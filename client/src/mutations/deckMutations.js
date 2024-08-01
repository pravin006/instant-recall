import { gql } from '@apollo/client'


export const ADD_DECK = gql`
    mutation addDeck($name: String!, $color: String!, $textColor: String!) {
        addDeck(deckName: $name, color:$color, textColor:$textColor) {
            _id
            deckName
            isActive
            lastActive
            color
            textColor
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

export const UPDATE_DECK = gql`
    mutation updateDeck($id: ID!, $name: String!, $color: String!, $textColor: String!) {
        updateDeck(_id: $id, deckName: $name, color:$color, textColor:$textColor) {
            _id
            deckName
            isActive
            lastActive
            color
            textColor
        }
    }
`;