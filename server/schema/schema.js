import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLSchema, GraphQLList } from 'graphql'
import { GraphQLDate } from 'graphql-scalars';
import { decks, cards } from '../sampleData.js'

const DeckType = new GraphQLObjectType({
    name: 'Deck',
    fields: () => ({
        deckId: {type: GraphQLID},
        deckName: {type: GraphQLString},
        isActive: {type: GraphQLBoolean},
        lastActive: {type: GraphQLDate},
        cards: {
            type: new GraphQLList(CardType),
            resolve(parent,arg){
                return cards.filter(card => card.deckId === parent.deckId)
            }
        }
    })
})

const CardType = new GraphQLObjectType({
    name: 'Card',
    fields: () => ({
        cardId: {type: GraphQLID},
        deckId: {type: GraphQLID},
        question: {type: GraphQLString},
        answer: {type: GraphQLString},
        dueForReview: {type: GraphQLDate}
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        decks:{
            type: new GraphQLList(DeckType),
            resolve(parent,args){
                return decks
            }
        },
        deck:{
            type: DeckType,
            args: { deckId: {type: GraphQLID} },
            resolve(parent,args){
                return decks.find(deck => deck.deckId === args.deckId)
            }
        },
        
        cards:{
            type: new GraphQLList(CardType),
            resolve(parent,args){
                return cards
            }
        },
        card:{
            type: CardType,
            args: { cardId: {type: GraphQLID} },
            resolve(parent,args){
                return cards.find(card => card.cardId === args.cardId)
            }
        }
    }
})

export default new GraphQLSchema({
    query:RootQuery
})