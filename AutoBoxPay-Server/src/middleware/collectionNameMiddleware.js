const { connection } = require('mongoose')
const findCollection = async (req, res, next) => {
	try {
		const { companyName } = req.body
		const productCollectionName = `products_${companyName}`

		const existingProductCollection = await connection.db.collection(productCollectionName)

		if (!existingProductCollection) {
			return res.status(404).json({ error: 'Collection not found' })
		}

		req.productCollection = existingProductCollection
		next()
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
}

module.exports = findCollection
