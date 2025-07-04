export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent">
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-2 rounded-full border font-medium transition-colors duration-200 shadow-sm
          ${selected === null
            ? "bg-purple-600 text-white border-purple-600"
            : "bg-white text-gray-700 border-gray-300 hover:bg-purple-50"}
        `}
      >
        All
      </button>
      {categories.map(cat => (
        <button
          key={cat._id}
          onClick={() => onSelect(cat._id)}
          className={`px-4 py-2 rounded-full border font-medium transition-colors duration-200 shadow-sm
            ${selected === cat._id
              ? "bg-purple-600 text-white border-purple-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-purple-50"}
          `}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
