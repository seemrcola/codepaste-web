import Search from './components/Search/index'
import { Link } from 'react-router-dom'

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50">
      <div className="w-full h-24"></div>
      <div className="w-full max-w-xl mx-auto">
        <div className="
            rounded-xl overflow-hidden
          shadow-sm border border-white/50 transition-all duration-200 ease-in-out hover:shadow-md hover:border-blue-50 
          ">
            <Search />
        </div>
        
        {/* 前往数据库页面按钮 */}
        <div className="mt-6 text-center">
          <Link 
            to="/config"
            className="
              inline-flex items-center gap-2 px-6 py-3 
              bg-white/80 backdrop-blur-sm border border-gray-200/50 
              rounded-lg shadow-sm hover:shadow-md 
              text-gray-700 hover:text-blue-600 
              transition-all duration-200 ease-in-out
              hover:bg-white hover:border-blue-200
            "
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s8-1.79 8-4" />
            </svg>
            <span className="font-medium">前往数据库页面</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
