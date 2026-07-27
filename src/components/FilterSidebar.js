"use client"

import React from 'react'
import { useRouter } from "next/navigation"

const FilterSidebar = ({categories}) => {
  if (!categories || categories.length === 0) {
    return <p className="text-center text-gray-500 py-10">No categories found.</p>;
  }    

  const router = useRouter();

  const handleClick = (categorySlug) => {
    router.push(`/products?category=${categorySlug}`);
  }

  return (
    <aside>
        {categories.map((category) => {
            return (<button 
                        key={category.slug} 
                        onClick={() => handleClick(category.slug)}> {category.name} </button>)
        })}    
    </aside>
  )
}

export default FilterSidebar