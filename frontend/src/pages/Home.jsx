import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import CategoryList from '../components/CategoryList'

export default function Home() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadData() {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/products')
        ])
        if (!categoriesRes.ok || !productsRes.ok) {
          throw new Error('Unable to load data')
        }

        const [categoriesData, productsData] = await Promise.all([
          categoriesRes.json(),
          productsRes.json()
        ])

        setCategories(categoriesData)
        setProducts(productsData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products
    return products.filter((product) => product.categoryId?._id === selectedCategory._id)
  }, [products, selectedCategory])

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Mobile QR Store</h1>
        <p className="mt-2 text-slate-600">Choose a category to filter products and use product links for QR-ready URLs.</p>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">Categories</h2>
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Products</h2>
            <p className="mt-1 text-sm text-slate-500">Tap any product to open a mobile-friendly detail page.</p>
          </div>
          {selectedCategory ? (
            <button
              type="button"
              onClick={() => setSelectedCategory(null)}
              className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-900"
            >
              Show all
            </button>
          ) : null}
        </div>

        {loading ? (
          <div className="py-16 text-center text-slate-600">Loading products...</div>
        ) : error ? (
          <div className="py-16 text-center text-red-600">{error}</div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-16 text-center text-slate-600">No products found.</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <Link
                key={product._id}
                to={`/products/${product._id}`}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-56 overflow-hidden bg-slate-200">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-500">No image</div>
                  )}
                </div>
                <div className="p-5">
                  <div className="mb-2 text-sm uppercase tracking-[0.3em] text-slate-500">
                    {product.categoryId?.name || 'Uncategorized'}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">{product.name}</h3>
                  <p className="mt-3 line-clamp-2 text-slate-600">{product.description}</p>
                  <div className="mt-5 flex items-center justify-between text-sm font-semibold text-slate-900">
                    <span>${product.price.toFixed(2)}</span>
                    <span>Stock: {product.stock}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
