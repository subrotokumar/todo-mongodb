const mongoose = require('mongoose')

const TodoScheme = new mongoose.Schema({
	record: { type: String, required: true },
	data: { type: Number, default: Date.now },
}, { collection: 'todo' })

const model = mongoose.model('TodoModel', TodoScheme)

module.exports = model