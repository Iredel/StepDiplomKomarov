const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
	companyName: { type: String },
	photoUrl: { type: String },
	name: { type: String },
	lastName: { type: String },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: {
		type: String,
		enum: ['user', 'admin'],
	},
})

module.exports = model('User', schema)
