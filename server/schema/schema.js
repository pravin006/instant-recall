import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLSchema, GraphQLList } from 'graphql'
import { GraphQLDate } from 'graphql-scalars';
// import { decks, cards } from '../sampleData.js'

import Deck from '../models/Deck.js'
import Card from '../models/Card.js'

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
                return Card.find({ deckId: parent._id })
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
                return Deck.find()
            }
        },
        deck:{
            type: DeckType,
            args: { deckId: {type: GraphQLID} },
            resolve(parent,args){
                return Deck.findById(args.deckId)
            }
        },
        
        cards:{
            type: new GraphQLList(CardType),
            resolve(parent,args){
                return Card.find()
            }
        },
        card:{
            type: CardType,
            args: { cardId: {type: GraphQLID} },
            resolve(parent,args){
                return Card.findById(args.cardId)
            }
        }
    }
})

export default new GraphQLSchema({
    query:RootQuery
})