import { useEffect, useState } from 'react'

const INITIAL_FORM = {
  name: '',
  description: '',
  price: 0,
  imageUrl: '',
  stock: 0,
  categoryId: ''
}

export default function AdminDashboard() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(INITIAL_FORM)
  const [selectedId, setSelectedId] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    const [categoriesRes, productsRes] = await Promise.all([
      fetch('/api/categories'),
      fetch('/api/products')
    ])
    setCategories(await categoriesRes.json())
    setProducts(await productsRes.json())
  }

  function updateForm(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function resetForm() {
    setSelectedId(null)
    setForm(INITIAL_FORM)
    setMessage(null)
  }

  function editProduct(product) {
    setSelectedId(product._id)
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl || '',
      stock: product.stock,
      categoryId: product.categoryId?._id || ''
    })
    setMessage(null)
  }

  async function handleSave() {
    try {
      const method = selectedId ? 'PUT' : 'POST'
      const url = selectedId ? `/api/products/${selectedId}` : '/api/products'
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!response.ok) {
        throw new Error('Failed to save product')
      }
      setMessage(selectedId ? 'Product updated.' : 'Product created.')
      resetForm()
      loadData()
    } catch (error) {
      setMessage(error.message)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this product?')) return
    const response = await fetch(`/api/products/${id}`, { method: 'DELETE' })
    if (response.ok) {
      setMessage('Product deleted.')
      loadData()
      if (selectedId === id) resetForm()
    } else {
      setMessage('Unable to delete product.')
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Admin Dashboard</h1>
        <p className="mt-2 text-slate-600">Use this page to add, update, or remove products from the store.</p>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">Product editor</h2>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">Name</label>
            <input
              value={form.name}
              onChange={(e) => updateForm('name', e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
            />
            <label className="block text-sm font-medium text-slate-700">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => updateForm('description', e.target.value)}
              rows={4}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">Price</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => updateForm('price', Number(e.target.value))}
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Stock</label>
                <input
                  type="number"
                  value={form.stock}
                  onChange={(e) => updateForm('stock', Number(e.target.value))}
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
                />
              </div>
            </div>
            <label className="block text-sm font-medium text-slate-700">Image URL</label>
            <input
              value={form.imageUrl}
              onChange={(e) => updateForm('imageUrl', e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
            />
            <label className="block text-sm font-medium text-slate-700">Category</label>
            <select
              value={form.categoryId}
              onChange={(e) => updateForm('categoryId', e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              {selectedId ? 'Update product' : 'Add product'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
            >
              Clear
            </button>
          </div>
          {message ? <p className="mt-4 text-sm text-slate-700">{message}</p> : null}
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">Product list</h2>
          <div className="space-y-3">
            {products.map((product) => (
              <div key={product._id} className="rounded-3xl border border-slate-200 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{product.name}</p>
                    <p className="text-sm text-slate-500">${product.price.toFixed(2)} • Stock {product.stock}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => editProduct(product)}
                      className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(product._id)}
                      className="rounded-2xl border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-600 transition hover:border-rose-400 hover:bg-rose-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
