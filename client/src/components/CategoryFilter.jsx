export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="flex gap-2 overflow-auto pb-2">
      <button
        onClick={() => onSelect(null)}
        className={`px-3 py-1 rounded-full border ${selected === null ? "bg-purple-600 text-white" : "bg-white"}`}
      >All</button>
      {categories.map(cat => (
        <button
          key={cat._id}
          onClick={() => onSelect(cat._id)}
          className={`px-3 py-1 rounded-full border ${selected === cat._id ? "bg-purple-600 text-white" : "bg-white"}`}
        >{cat.name}</button>
      ))}
    </div>
  );
}
