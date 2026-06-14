import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

export default function QrGenerator() {
  const [url, setUrl] = useState(window.location.origin)
  const [qrDataUrl, setQrDataUrl] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    generateQr(window.location.origin)
  }, [])

  async function generateQr(value) {
    try {
      setError(null)
      const dataUrl = await QRCode.toDataURL(value, { margin: 2, width: 280 })
      setQrDataUrl(dataUrl)
    } catch (err) {
      setError('Unable to generate QR code')
    }
  }

  function handleChange(event) {
    const nextUrl = event.target.value
    setUrl(nextUrl)
    generateQr(nextUrl)
  }

  return (
    <div className="space-y-8 rounded-3xl bg-white p-6 shadow-sm">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">QR Code Generator</h1>
        <p className="mt-2 text-slate-600">Enter any product or category URL to generate a mobile-ready QR code.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">URL</label>
          <input
            type="url"
            value={url}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
          />
          <p className="text-sm text-slate-500">Use a product link like <span className="font-medium">{window.location.origin}/products/&lt;product-id&gt;</span>.</p>
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
        </div>

        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 p-6">
          {qrDataUrl ? (
            <img src={qrDataUrl} alt="QR code" className="h-72 w-72 object-contain" />
          ) : (
            <div className="text-slate-500">Generating...</div>
          )}
        </div>
      </div>
    </div>
  )
}
