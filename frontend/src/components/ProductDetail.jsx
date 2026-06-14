import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return

    async function loadProduct() {
      try {
        const response = await fetch(`/api/products/${id}`)
        if (!response.ok) {
          throw new Error('Unable to load product')
        }
        const data = await response.json()
        setProduct(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  if (loading) {
    return <div className="rounded-3xl bg-white p-8 text-center text-slate-600 shadow-sm">Loading product...</div>
  }

  if (error || !product) {
    return <div className="rounded-3xl bg-white p-8 text-center text-red-600 shadow-sm">{error || 'Product not found'}</div>
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4 rounded-3xl bg-white p-5 shadow-sm">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">{product.name}</h1>
          <p className="mt-2 text-sm text-slate-500">{product.categoryId?.name || 'No category'}</p>
        </div>
        <Link
          to="/"
          className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
        >
          Back to store
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-6 overflow-hidden rounded-3xl bg-slate-100">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} className="h-[420px] w-full object-cover" />
            ) : (
              <div className="flex h-[420px] items-center justify-center text-slate-500">No image available</div>
            )}
          </div>
          <div className="space-y-4">
            <p className="text-xl font-semibold text-slate-900">${product.price.toFixed(2)}</p>
            <p className="text-slate-600">{product.description}</p>
          </div>
        </div>

        <aside className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="space-y-4 text-sm text-slate-600">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Details</h2>
              <p className="mt-2">Stock: {product.stock}</p>
              <p>Category: {product.categoryId?.name || 'Uncategorized'}</p>
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">QR-friendly URL</h2>
              <p className="mt-2 break-all text-slate-700">{window.location.href}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
