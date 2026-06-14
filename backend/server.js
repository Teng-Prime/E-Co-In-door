const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const categoryRoutes = require('./routes/categories')
const productRoutes = require('./routes/products')

const app = express()
app.use(cors())
app.use(express.json())

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/sellindoor'

mongoose
  .connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  })

app.get('/', (req, res) => {
  res.json({ message: 'Sell In Door backend is running' })
})

app.use('/api/categories', categoryRoutes)
app.use('/api/products', productRoutes)

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
