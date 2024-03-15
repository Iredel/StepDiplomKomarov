const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
	productName: { type: String, required: true },
	productDescription: { type: String, required: true },
	productPrice: { type: Number, required: true },
	productPhoto: { type: String, required: true },
})

module.exports = model('Product', schema)
