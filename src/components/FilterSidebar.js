"use client"

import React from 'react'
import { useRouter, useSearchParams } from "next/navigation"

const FilterSidebar = ({categories}) => {
  const searchParams = useSearchParams();

  if (!categories || categories.length === 0) {
    return <p className="text-center text-gray-500 py-10">No categories found.</p>;
  }    

  const router = useRouter();

  const handleClick = (categorySlug) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", categorySlug);
    params.delete("product");
    router.push(`/products?${params.toString()}`);
  }

  const handleSortChange = (event) => {
    const params = new URLSearchParams(searchParams); 
    params.set("sort", event.target.value)
    router.push(`/products?${params.toString()}`)
  }

  return (
    <aside>
      {categories.map((category) => {
        return (<button 
                  key={category.slug} 
                  onClick={() => handleClick(category.slug)}> {category.name} </button>)
        })}  

      <select 
      value={searchParams.get("sort") || "featured"} //Now the dropdown's displayed value is always driven directly by the URL
      onChange={(e) => handleSortChange(e)}>
        <option value="featured">Featured</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>    
    </aside>
  )
}

export default FilterSidebar