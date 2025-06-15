import { type CodeType } from './type'
import EmptySearchIcon from '../svg/EmptySearchIcon'

interface ResultProps {
  data: CodeType[]
  searchQuery: string
}

function ResultItem({ item, searchQuery }: { item: CodeType; searchQuery: string }) {
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

  return (
    <div className="p-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
      <div className="font-medium text-gray-900 mb-1">
        {highlightText(item.name, searchQuery)}
      </div>
      <div className="text-gray-600 text-sm">
        {highlightText(item.content, searchQuery)}
      </div>
    </div>
  )
}

function Result({ data, searchQuery }: ResultProps) {
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
    <div className="bg-white max-h-[400px] overflow-y-auto better-scrollbar">
      {searchQuery && (
        <div className="px-4 py-2 text-sm text-gray-500 bg-gray-50 border-b border-gray-100">
          找到 {data.length} 个结果
        </div>
      )}
      {data.map((item: CodeType) => (
        <ResultItem key={item.id} item={item} searchQuery={searchQuery} />
      ))}
    </div>
  )
}

export default Result
