const express = require('express')
const Category = require('../models/Category')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 })
    res.json(categories)
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch categories' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { name, slug, image } = req.body
    if (!name || !slug) {
      return res.status(400).json({ error: 'Name and slug are required' })
    }

    const category = new Category({ name, slug, image })
    const saved = await category.save()
    res.status(201).json(saved)
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Category slug already exists' })
    }
    res.status(500).json({ error: 'Unable to create category' })
  }
})

module.exports = router
