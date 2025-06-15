import { useRef } from 'react'
import SearchIcon from '../svg/SearchIcon'
import CloseIcon from '../svg/CloseIcon'

interface SearchProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

function SearchInput({ searchQuery, setSearchQuery }: SearchProps): React.JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      inputRef.current?.blur()
    }
  }

  const clearSearch = () => {
    setSearchQuery('')
    inputRef.current?.focus()
  }

  return (
    <div className="relative flex items-center bg-white/80 backdrop-blur-sm">
      {/* 搜索图标 */}
      <div className="flex items-center justify-center w-10 h-10 ml-3">
        <SearchIcon
          size={18}
          className="text-gray-500"
        />
      </div>

      {/* 输入框 */}
      <input
        ref={inputRef}
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="搜索..."
        className="flex-1 px-3 py-3 text-base bg-transparent border-none outline-none placeholder-gray-400 text-gray-800"
      />

      {/* 清除按钮 */}
      {searchQuery.length > 0 && (
        <div
          className='w-8 h-8 mr-3 flex items-center justify-center cursor-pointer'
          onClick={clearSearch}
        >
          <CloseIcon
            size={18}
            className="text-gray-500"
          />
        </div>
      )}
    </div>
  )
}

export default SearchInput
