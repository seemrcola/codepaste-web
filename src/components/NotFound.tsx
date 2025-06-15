import { Link } from 'react-router-dom'

// 自定义404 SVG图标
function NotFoundIcon() {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto"
    >
      {/* 背景圆圈 */}
      <circle
        cx="100"
        cy="100"
        r="90"
        fill="url(#gradient1)"
        fillOpacity="0.1"
      />

      {/* 404数字 - 4 */}
      <path
        d="M60 70 L60 100 L80 100 M80 70 L80 110"
        stroke="url(#gradient2)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* 404数字 - 0 */}
      <ellipse
        cx="100"
        cy="90"
        rx="15"
        ry="20"
        stroke="url(#gradient2)"
        strokeWidth="6"
        fill="none"
      />

      {/* 404数字 - 4 */}
      <path
        d="M120 70 L120 100 L140 100 M140 70 L140 110"
        stroke="url(#gradient2)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* 装饰性元素 */}
      <circle cx="50" cy="50" r="3" fill="url(#gradient3)" opacity="0.6" />
      <circle cx="150" cy="50" r="4" fill="url(#gradient3)" opacity="0.4" />
      <circle cx="40" cy="150" r="2" fill="url(#gradient3)" opacity="0.8" />
      <circle cx="160" cy="140" r="3" fill="url(#gradient3)" opacity="0.5" />

      {/* 装饰线条 */}
      <path
        d="M30 130 Q50 120 70 130"
        stroke="url(#gradient2)"
        strokeWidth="2"
        fill="none"
        opacity="0.3"
      />
      <path
        d="M130 160 Q150 150 170 160"
        stroke="url(#gradient2)"
        strokeWidth="2"
        fill="none"
        opacity="0.3"
      />

      {/* 渐变定义 */}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col justify-center items-center px-4">
      <div className="text-center max-w-md">
        {/* 404 SVG图标 */}
        <div className="mb-8 animate-pulse">
          <NotFoundIcon />
        </div>

        {/* 错误信息 */}
        <div className="space-y-4 mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            页面走丢了
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            抱歉，您访问的页面可能已被移动或删除
            <br />
            <span className="text-sm text-gray-500">让我们帮您找到正确的路径</span>
          </p>
        </div>

        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/config"
            className="group inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            返回首页
          </Link>
          <Link
            to="/search"
            className="group inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5 mr-2 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            搜索代码
          </Link>
        </div>

        {/* 底部提示 */}
        <div className="mt-12 text-sm text-gray-400">
          <p>如果问题持续存在，请联系技术支持</p>
        </div>
      </div>

      {/* 背景装饰 */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  )
}

export default NotFound
