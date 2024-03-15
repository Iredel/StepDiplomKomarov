const { Router } = require('express')
const router = Router()
const bcrypt = require('bcrypt')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { connection } = require('mongoose')

router.post(
	'/signUp',
	[
		check('email', 'Wrong email').isEmail(),
		check('password', 'Minimum password length 6 characters').isLength({ min: 6 }),
		check('userRole', 'Invalid user role').isIn(['user', 'admin']),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Incorrect registration data',
				})
			}

			const { userRole } = req.body

			let user
			if (userRole === 'admin') {
				const { companyName, photoUrl, email, password } = req.body
				const candidate = await User.findOne({ email })

				if (candidate) {
					return res.status(400).json({ message: 'This user already exists' })
				}

				const hashedPassword = await bcrypt.hash(password, 12)
				user = new User({
					companyName,
					photoUrl,
					email,
					password: hashedPassword,
					role: userRole,
				})

				await user.save()

				const productCollectionName = `products_${companyName}`
				await connection.db.createCollection(productCollectionName)
			} else {
				const { email, photoUrl, name, lastName, password } = req.body
				const candidate = await User.findOne({ email })

				if (candidate) {
					return res.status(400).json({ message: 'This user already exists' })
				}
				const hashedPassword = await bcrypt.hash(password, 12)

				user = new User({
					email,
					photoUrl,
					name,
					lastName,
					password: hashedPassword,
					role: userRole,
				})

				await user.save()
			}

			res.status(201).json({
				message: 'User created',
			})
		} catch (error) {
			console.error('Error creating user:', error)
			res.status(500).json({ error: 'Internal Server Error' })
		}
	},
)

router.post(
	'/signIn',
	[
		check('email', 'Enter a correct email').normalizeEmail().isEmail(),
		check('password', 'Wrong data').exists(),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Incorrect login information',
				})
			}

			const { email, password } = req.body

			const user = await User.findOne({ email })

			if (!user) {
				return res.status(400).json({ message: 'User is not found' })
			}

			const isMatch = await bcrypt.compare(password, user.password)

			if (!isMatch) {
				return res.status(400).json({ message: 'Invalid data, try again' })
			}

			const token = jwt.sign(
				{
					userId: user.id,
					role: user.role,
				},
				'bankai',
				{
					expiresIn: '1h',
				},
			)

			res.json({
				token,
				userId: user.id,
				email: user.email,
				companyName: user.companyName,
				photoUrl: user.photoUrl,
				name: user.name,
				lastName: user.lastName,
				role: user.role,
			})
		} catch (error) {
			console.error('Error signing in user:', error)
			res.status(500).json({ error: 'Internal Server Error' })
		}
	},
)

module.exports = router
