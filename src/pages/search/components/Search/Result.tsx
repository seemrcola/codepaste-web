import EmptySearchIcon from '../svg/EmptySearchIcon'
import { type Snippet } from '@/db'
import { useState } from 'react'

interface ResultProps {
  data: Snippet[]
  searchQuery: string
}

// Toast 提示组件
function Toast({ show, message }: { show: boolean; message: string }) {
  if (!show) return null

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
      <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  )
}

function ResultItem({ item, searchQuery, onCopySuccess }: { item: Snippet; searchQuery: string; onCopySuccess: () => void }) {
  // 高亮搜索关键词
  const highlightText = (text: string, query: string) => {
    if (!query) return text
    const regex = new RegExp(`(${query})`, 'gi')
    const parts = text.split(regex)
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-yellow-800">{part}</mark>
      ) : (
        part
      )
    )
  }

  // 复制代码到剪贴板
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(item.code)
      onCopySuccess()
    } catch (err) {
      console.error('复制失败:', err)
      // 不实用降级方案 建议用户换更新的浏览器
    }
  }

  return (
    <div 
      className="p-4 py-3 border-b border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 h-20 flex flex-col justify-center cursor-pointer group relative"
      onClick={handleCopyCode}
    >
      <div className="font-medium text-gray-900 mb-1 truncate group-hover:text-blue-700">
        {highlightText(item.name, searchQuery)}
      </div>
      <div className="text-gray-600 text-sm line-clamp-2 overflow-hidden group-hover:text-gray-700">
        {highlightText(item.code, searchQuery)}
      </div>
      {/* 复制提示图标 */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </div>
    </div>
  )
}

function Result({ data, searchQuery }: ResultProps) {
  const [showToast, setShowToast] = useState(false)

  const handleCopySuccess = () => {
    setShowToast(true)
    // 3秒后自动隐藏
    setTimeout(() => {
      setShowToast(false)
    }, 3000)
  }

  if (searchQuery && data.length === 0) {
    return (
      <div className="p-8 text-center">
        <EmptySearchIcon />
        <div className="text-gray-600">
          <div className="text-base font-medium mb-1">未找到相关结果</div>
          <div className="text-sm text-gray-500">尝试使用其他关键词搜索</div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Toast 
        show={showToast} 
        message="代码已复制到剪贴板" 
      />
      <div className="bg-white max-h-[400px] overflow-y-auto better-scrollbar">
        {searchQuery && (
          <div className="px-4 py-2 text-sm text-gray-500 bg-gray-50 border-b border-gray-100">
            找到 {data.length} 个结果
          </div>
        )}
        {data.map((item: Snippet) => (
          <ResultItem key={item.id} item={item} searchQuery={searchQuery} onCopySuccess={handleCopySuccess} />
        ))}
      </div>
    </>
  )
}

export default Result
