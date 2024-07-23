import mongoose from 'mongoose'
import Card from './Card.js'

const DeckSchema = new mongoose.Schema({
    deckName: {type:String},
    isActive: {type:Boolean},
    lastActive: {type:Date, default: Date.now},
    color:{type:String},
    textColor:{type:String}
})

DeckSchema.pre('findOneAndDelete', { document: false, query: true }, async function (next) {
    const deckId = this.getQuery()._id
    await Card.deleteMany({ deckId })
    next()
})

export default mongoose.model('Deck',DeckSchema)