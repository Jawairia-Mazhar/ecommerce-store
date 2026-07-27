"use client"

import React from 'react'
import { useRouter } from "next/navigation"

const SearchBar = () => {
    const [searchText, setSearchText] = React.useState("");
    const router = useRouter();
    const handleSearch = (e) => {
        e.preventDefault();
        router.push(`/products?product=${searchText}`);
    }

  return (
    <div className = "flex items-center justify-center mb-4">
        <input 
        value={searchText} 
        onChange={(e)=> {setSearchText(e.target.value)}}
        className="border border-2-pink"/>
        <button onClick={handleSearch} className="border border-2-black">Search</button>
    </div>
  )
}

export default SearchBar