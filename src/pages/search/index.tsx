import Search from './components/Search/index'

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50">
      <div className="w-full h-24"></div>
      <div className="
          w-full max-w-xl mx-auto rounded-xl overflow-hidden
        shadow-sm border border-white/50 transition-all duration-200 ease-in-out hover:shadow-md hover:border-blue-50 
        ">
          <Search />
      </div>
    </div>
  )

}
