const loading = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array(8).fill(null).map((_, index) => 
                <div className="bg-gray-200 h-64 rounded-lg animate-pulse" key={index}></div>
            )}
        </div>   
    </main>
  )
}

export default loading 