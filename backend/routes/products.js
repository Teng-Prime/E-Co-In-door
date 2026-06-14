const express = require('express')
const Product = require('../models/Product')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('categoryId', 'name slug').sort({ createdAt: -1 })
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch products' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('categoryId', 'name slug')
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.json(product)
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch product' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { name, description, price, imageUrl, stock, categoryId } = req.body
    if (!name || !description || price === undefined || stock === undefined || !categoryId) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const product = new Product({
      name,
      description,
      price,
      imageUrl,
      stock,
      categoryId
    })

    const saved = await product.save()
    res.status(201).json(saved)
  } catch (error) {
    res.status(500).json({ error: 'Unable to create product' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { name, description, price, imageUrl, stock, categoryId } = req.body
    if (!name || !description || price === undefined || stock === undefined || !categoryId) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, imageUrl, stock, categoryId },
      { new: true }
    )

    if (!updated) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.json(updated)
  } catch (error) {
    res.status(500).json({ error: 'Unable to update product' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete product' })
  }
})

module.exports = router
