const mongoose = require("mongoose")
const { Schema } = mongoose;



const QuizCounterSchema = new Schema({
    value: {
        type: Number,
    }
})
const BarberCounter = mongoose.model("quizcounter", QuizCounterSchema)
module.exports = BarberCounter