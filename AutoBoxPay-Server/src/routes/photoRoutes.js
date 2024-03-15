const { Router } = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const router = Router()

const productImgStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'src/productsPhoto/')
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	},
})

const avatarStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'src/usersAvatar/')
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	},
})

const upload = multer({ storage: productImgStorage })
router.post('/uploadProductImg', upload.single('photo'), (req, res) => {
	res.status(200).send('Photo saved successfully')
})

const uploadAvatar = multer({ storage: avatarStorage })
router.post('/uploadAvatar', uploadAvatar.single('avatar'), (req, res) => {
	console.log('Avatar saved!!')
	res.status(200).send('Avatar saved successfully')
})

router.get('/:imageName', async (req, res) => {
	try {
		const imageName = req.params.imageName
		const imagePath = path.join(__dirname, '../productsPhoto', imageName)
		res.sendFile(imagePath)
	} catch (e) {
		res.status(500).json({ message: 'Something went wrong, try again' })
	}
})

router.get('/avatar/:imageName', async (req, res) => {
	try {
		const imageName = req.params.imageName
		const imagePath = path.join(__dirname, '../usersAvatar', imageName)
		res.sendFile(imagePath)
	} catch (e) {
		res.status(500).json({ message: 'Something went wrong, try again' })
	}
})

module.exports = router
