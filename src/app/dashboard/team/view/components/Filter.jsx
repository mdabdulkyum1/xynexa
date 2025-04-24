"use client"; 

import { useState } from "react";
import { ImSearch } from "react-icons/im";

export default function Filter() {
  const [sort, setSort] = useState("Most recently active");
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-wrap lg:justify-between items-center gap-4 p-4">
      <div className="lg:flex gap-4">
        {/* Sort By */}
      <div>
        <label className="text-gray-700 dark:text-gray-200 text-sm block mb-1">Sort by</label>
        <select
          className="border border-gray-600 rounded-lg p-2 w-48"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option>Most recently active</option>
          <option>Least recently active</option>
          <option>Alphabetically A-Z</option>
          <option>Alphabetically Z-A</option>
        </select>
      </div>

      {/* Filter By */}
      <div>
        <label className="text-gray-700 dark:text-gray-200 text-sm block mb-1">Filter by</label>
        <select
          className="border border-gray-600 rounded-lg p-2 w-48"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option className="hover:bg-gray-400" value="">Choose a collection</option>
          <option value="collection1">Collection 1</option>
          <option value="collection2">Collection 2</option>
        </select>
      </div>
      </div>

      {/* Search */}
      <div>
        <label className="text-gray-700 dark:text-gray-200 text-sm block mb-1">Search</label>
        <div className="relative">
          <input
            type="text"
            placeholder="Search boards"
            className="border border-gray-600 rounded-lg p-2 pl-10 w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute left-3 top-3 text-gray-500">
          <ImSearch />
          </span>
        </div>
      </div>
    </div>
  );
}
