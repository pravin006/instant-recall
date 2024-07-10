import mongoose from 'mongoose'

const DeckSchema = new mongoose.Schema({
    deckId: {type:String},
    deckName: {type:String},
    isActive: {type:Boolean},
    lastActive: {type:Date},
})

export default mongoose.model('Deck',DeckSchema)