import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLSchema, GraphQLList, GraphQLNonNull } from 'graphql'
import { GraphQLDate } from 'graphql-scalars';
// import { decks, cards } from '../sampleData.js'

import Deck from '../models/Deck.js'
import Card from '../models/Card.js'

const DeckType = new GraphQLObjectType({
    name: 'Deck',
    fields: () => ({
        _id: {type: GraphQLID},
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
        _id: {type: GraphQLID},
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
            args: { _id: {type: GraphQLID} },
            resolve(parent,args){
                return Deck.findById(args._id)
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
            args: { _id: {type: GraphQLID} },
            resolve(parent,args){
                return Card.findById(args._id)
            }
        }
    }
})


const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addDeck: {
            type: DeckType,
            args: {
                deckName: {type: GraphQLNonNull(GraphQLString)},
                isActive: {type: GraphQLBoolean},
                lastActive: {type: GraphQLDate}
            },
            resolve(parent,args){
                const deck = new Deck({
                    deckName: args.deckName,
                    isActive: args.isActive || true,
                    lastActive: args.lastActive || Date.now()
                })
                return deck.save()
            }
        },

        deleteDeck:{
            type: DeckType,
            args: { _id: {type: GraphQLNonNull(GraphQLID)}},
            resolve(parent,args){
                return Deck.findOneAndDelete({ _id: args._id })
            }
        },

        updateDeck:{
            type:DeckType,
            args:{
                _id: {type: GraphQLNonNull(GraphQLID)},
                deckName: {type: GraphQLString},
                isActive: {type: GraphQLBoolean},
                lastActive: {type: GraphQLDate},
            },
            resolve(parent,args){
                return Deck.findByIdAndUpdate(args._id, {
                    $set: {
                        deckName: args.deckName,
                        isActive: args.isActive,
                        lastActive: args.lastActive,
                    }},
                    { new: true }
                )
            }
        },

        addCard:{
            type: CardType,
            args: {
                deckId: {type: GraphQLNonNull(GraphQLID)},
                question: {type: GraphQLNonNull(GraphQLString)},
                answer: {type: GraphQLNonNull(GraphQLString)},
            },
            resolve(parent,args){
                const card = new Card({
                    deckId: args.deckId,
                    question: args.question,
                    answer: args.answer,
                    dueForReview: Date.now()
                })
                return card.save()
            }
        },

        deleteCard:{
            type: CardType,
            args: {_id:{type: GraphQLNonNull(GraphQLID)}},
            resolve(parent, args){
                return Card.findOneAndDelete({ _id: args._id })
            }
        },

        updateCard:{
            type: CardType,
            args: {
                _id: {type: GraphQLNonNull(GraphQLID)},
                question: {type: GraphQLString},
                answer: {type: GraphQLString},
                dueForReview: {type: GraphQLDate}
            },
            resolve(parent, args){
                return Card.findByIdAndUpdate(args._id, {
                    $set: {
                        question: args.question,
                        answer: args.answer,
                        dueForReview: args.dueForReview
                    }},
                    { new: true }
                )
            }
        }
    }
})

export default new GraphQLSchema({
    query:RootQuery,
    mutation: mutation
})