const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
	buyer: { type: String, required: true },
	buyerEmail: { type: String, required: true },
	purchaseTime: { type: String, required: true },
	productPrice: { type: Number, required: true },
	productPhoto: { type: String, required: true },
	productName: { type: String, required: true },
	companyName: { type: String, required: true },
})

module.exports = model('Report', schema)
