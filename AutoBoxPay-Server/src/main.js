const express = require('express')
const app = express()
const cors = require('cors')
const connectToDataBase = require('./database')

app.use(cors())
app.use(express.json())

const port = 3000

app.use('/users', require('./routes/userRoutes'))
app.use('/products', require('./routes/productsRoutes'))
app.use('/report', require('./routes/reportRoutes'))
app.use('/photo', require('./routes/photoRoutes'))

async function startServer() {
	try {
		await connectToDataBase()

		app.listen(port, () => {
			console.log(`Listening on port ${port}`)
		})
	} catch (e) {
		console.log('Server Error', e.message)
		process.exit(1)
	}
}

startServer().then(() => console.log('Server is running'))
