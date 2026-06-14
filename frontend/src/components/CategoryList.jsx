export default function CategoryList({ categories, selectedCategory, onSelect }) {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${selectedCategory ? 'border-slate-300 bg-white text-slate-700 hover:border-slate-900' : 'border-slate-900 bg-slate-900 text-white'}`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category._id}
          type="button"
          onClick={() => onSelect(category)}
          className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${selectedCategory?._id === category._id ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300 bg-white text-slate-700 hover:border-slate-900'}`}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}
