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
