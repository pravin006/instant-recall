import mongoose from 'mongoose'

const DeckSchema = new mongoose.Schema({
    deckName: {type:String},
    isActive: {type:Boolean},
    lastActive: {type:Date, default: Date.now},
    color:{type:String},
    textColor:{type:String}
})

export default mongoose.model('Deck',DeckSchema)