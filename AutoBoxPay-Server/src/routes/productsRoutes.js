const { Router } = require('express')
const router = Router()
const Product = require('../models/product')
const verifyToken = require('../middleware/tokenMiddleware')
const findCollection = require('../middleware/collectionNameMiddleware')
const { BSON } = require('mongodb')

router.use(verifyToken)
router.use(findCollection)

router.post('/createProduct', async (req, res) => {
	try {
		const { productName, productDescription, productPrice, productPhoto } = req.body

		const product = new Product({
			productName,
			productDescription,
			productPrice,
			productPhoto,
		})

		await req.productCollection.insertOne(product)

		res.json({ message: 'Product successfully created' })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
})

router.post('/getProduct/', async (req, res) => {
	try {
		const productId = new BSON.ObjectId(req.body.productId)
		const product = await req.productCollection.findOne({ _id: productId })

		if (!product) {
			return res.status(404).json({ error: 'Product not found' })
		}

		res.json(product)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
})

router.post('/deleteProduct', async (req, res) => {
	try {
		const productId = new BSON.ObjectId(req.body.productId)
		const result = await req.productCollection.deleteOne({ _id: productId })

		if (result.deletedCount === 0) {
			return res.status(404).json({ error: 'Product not found' })
		}

		res.json({ message: 'Product successfully deleted' })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
})

router.post('/updateProduct/', async (req, res) => {
	try {
		const productId = new BSON.ObjectId(req.body.productId)
		const existingProduct = await req.productCollection.findOne({ _id: productId })
		if (!existingProduct) {
			return res.status(404).json({ error: 'Product not found' })
		}
		const { productName, productDescription, productPrice, productPhoto } = req.body
		existingProduct.productName = productName || existingProduct.productName
		existingProduct.productDescription =
			productDescription || existingProduct.productDescription
		existingProduct.productPrice = productPrice || existingProduct.productPrice
		existingProduct.productPhoto = productPhoto || existingProduct.productPhoto

		await req.productCollection.updateOne({ _id: productId }, { $set: existingProduct })

		res.json({ message: 'Product successfully updated', updatedProduct: existingProduct })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
})

router.post('/getAllProducts', async (req, res) => {
	try {
		const products = await req.productCollection.find({}).toArray()
		res.json(products)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
})

module.exports = router
