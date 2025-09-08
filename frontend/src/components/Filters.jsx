import React from 'react';

const Filters = ({ filters, setFilters }) => {
  return (
    <div className="flex flex-col gap-4 mb-6">
      {/* Category */}
      <select
        className="p-2 border rounded"
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
      >
        <option value="">All Categories</option>
        <option value="Hoodies">Hoodies</option>
        <option value="Jeans">Jeans</option>
        <option value="T-Shirts">T-Shirts</option>
      </select>

      {/* Price */}
      <input
        type="range"
        min="0"
        max="100"
        value={filters.maxPrice}
        onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
        className="accent-red-600"
      />
      <div>Max Price: ${filters.maxPrice}</div>

      {/* Rating */}
      <select
        className="p-2 border rounded"
        value={filters.rating}
        onChange={(e) => setFilters({ ...filters, rating: Number(e.target.value) })}
      >
        <option value="0">All Ratings</option>
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>{r} stars & up</option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
