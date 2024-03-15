const { Router } = require('express')
const router = Router()
const Report = require('../models/report')

router.post('/createReport', async (req, res) => {
	try {
		const {
			buyer,
			buyerEmail,
			purchaseTime,
			productPrice,
			productPhoto,
			productName,
			companyName,
		} = req.body

		const report = new Report({
			buyer,
			buyerEmail,
			purchaseTime,
			productPrice,
			productPhoto,
			productName,
			companyName,
		})

		await report.save()

		res.status(201).json({ message: 'Report successfully created' })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
})

router.delete('/deleteReport/:id', async (req, res) => {
	try {
		const { id } = req.params
		const result = await Report.findByIdAndDelete(id)

		if (!result) {
			return res.status(404).json({ error: 'Report not found' })
		}
		res.status(200).json({ message: 'Report successfully deleted' })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
})

router.post('/byEmail', async (req, res) => {
	const { email } = req.body
	try {
		const reports = await Report.find({ buyerEmail: email })
		if (reports.length === 0) {
			return res.status(404).json({ error: 'No reports found for this email' })
		}
		res.status(200).json(reports)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
})

router.post('/byCompanyName', async (req, res) => {
	const { companyName } = req.body
	if (!companyName) {
		return res.status(400).json({ error: 'Email parameter is required' })
	}
	try {
		const reports = await Report.find({ companyName: companyName })
		if (reports.length === 0) {
			return res.status(404).json({ error: 'No reports found for this email' })
		}
		res.status(200).json(reports)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
})

module.exports = router
