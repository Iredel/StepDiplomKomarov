const mongoose = require('mongoose')

const connectToDataBase = async () => {
	await mongoose.connect(
		'mongodb+srv://Iredl:F0R8blRCamCNx5HG@iredlbase.tmzxujf.mongodb.net/?retryWrites=true&w=majority',
	)
}

module.exports = connectToDataBase
