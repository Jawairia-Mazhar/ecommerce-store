const loading = () => {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="relative w-[474] h-96 bg-gray-200 rounded-lg animate-pulse"></div>  
      <div className="flex flex-col gap-4">
        <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mt-2"></div>
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-12 w-40 bg-gray-200 rounded-md animate-pulse mt-4"></div>
      </div>
    </main>
  )
}

export default loading