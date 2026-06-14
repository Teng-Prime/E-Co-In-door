import { Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetail from './components/ProductDetail'
import AdminDashboard from './components/AdminDashboard'
import QrGenerator from './pages/QrGenerator'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <Link to="/" className="text-2xl font-semibold text-slate-900">
            Sell In Door
          </Link>
          <nav className="flex flex-wrap gap-3 text-sm font-semibold text-slate-600">
            <Link to="/" className="transition hover:text-slate-900">
              Store
            </Link>
            <Link to="/qr" className="transition hover:text-slate-900">
              QR
            </Link>
            <Link to="/admin" className="transition hover:text-slate-900">
              Admin
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/qr" element={<QrGenerator />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<div className="rounded-3xl bg-white p-8 text-center text-slate-700 shadow-sm">Page not found</div>} />
        </Routes>
      </main>
    </div>
  )
}
