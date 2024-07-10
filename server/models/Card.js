import mongoose from 'mongoose'

const CardSchema = new mongoose.Schema({
    deckId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Deck'
    },
    question: {type:String},
    answer: {type:String},
    dueForReview: {type:Date},
})

export default mongoose.model('Card',CardSchema)