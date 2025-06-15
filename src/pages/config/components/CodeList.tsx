import { useState } from 'react'
import AddIcon from './svg/AddIcon'
import SearchIcon from './svg/SearchIcon'
import CloseIcon from './svg/CloseIcon'
import CodeIcon from './svg/CodeIcon'
import DeleteIcon from './svg/DeleteIcon'
import { confirm } from '@/components/ui/Confirm'

import type { Snippet } from '@/db'

const getTypeColor = (type: string) => {
  const colors = {
    txt: 'bg-gray-100 text-gray-700',
    js: 'bg-yellow-100 text-yellow-700',
    ts: 'bg-blue-100 text-blue-700',
    css: 'bg-blue-100 text-blue-700',
    html: 'bg-orange-100 text-orange-700',
    json: 'bg-green-100 text-green-700',
    python: 'bg-green-100 text-green-700',
    java: 'bg-amber-100 text-amber-700',
    cpp: 'bg-purple-100 text-purple-700',
    sql: 'bg-indigo-100 text-indigo-700'
  }
  return colors[type as keyof typeof colors] || 'bg-red-100 text-red-700'
}

interface CodeListProps {
  snippets: Snippet[]
  currentSnippet: Snippet | null
  onAddSnippet: (snippet: Partial<Snippet>) => void
  onSelectSnippet: (snippet: Snippet) => void
  onDeleteSnippet: (snippet: Snippet) => void
  onSearchSnippets: (query: string) => void
}

function CodeList(props: CodeListProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    language: '',
    code: ''
  })
  const [searchQuery, setSearchQuery] = useState('')

  const handleAddCode = async () => {
    if (!formData.name?.trim() || !formData.code?.trim()) return
    await props.onAddSnippet(formData)
    // 重置表单
    handleCancel()
  }

  const handleCancel = () => {
    setFormData({
      name: '',
      description: '',
      language: '',
      code: ''
    })
    setShowAddForm(false)
  }

  const handleDeleteSnippet = async (snippet: Snippet) => {
    const result = await confirm({
      title: '确认删除',
      message: '确定要删除该代码片段吗？该操作不可撤销。',
      confirmText: '删除',
      cancelText: '取消',
      confirmButtonType: 'danger'
    })
    if (result.confirmed) {
      props.onDeleteSnippet(snippet)
    }
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-gray-50/50 to-white">
      {/* 头部 */}
      <div className="p-5 border-b border-gray-200/60 bg-white/90 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-sm">
              <CodeIcon className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">代码片段</h2>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium hover:scale-105 active:scale-95"
          >
            <AddIcon className="w-4 h-4" />
            新建
          </button>
        </div>

        {/* 搜索框 */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="搜索片段..."
            className="w-full pl-12 pr-12 py-3.5 text-gray-700 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 placeholder:text-gray-400 shadow-sm hover:shadow-md"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                props.onSearchSnippets(e.currentTarget.value)
              }
              if (e.key === 'Escape') {
                setSearchQuery('')
                props.onSearchSnippets('')
              }
            }}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            <button 
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-1.5 transition-all duration-200"
              onClick={() => {
                setSearchQuery('')
                props.onSearchSnippets('')
              }}
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 代码片段列表 */}
      <div className="flex-1 overflow-y-auto better-scrollbar">
        <div className="p-3">
          {/* 新增表单 */}
          {showAddForm && (
            <div className="mb-4 p-5 text-gray-700 rounded-xl border-2 border-blue-200 bg-gradient-to-r from-blue-50/50 to-purple-50/50 backdrop-blur-sm animate-slideDown">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3 text-blue-600">
                  <AddIcon className="w-5 h-5" />
                  <span className="font-semibold text-lg">新建代码片段</span>
                </div>
                <button
                  onClick={handleCancel}
                  className="p-2 hover:bg-white/60 rounded-xl transition-all duration-200 text-gray-500 hover:text-gray-700"
                >
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* 片段名称和编程语言 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      片段名称
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="输入片段名称"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 placeholder:text-gray-400 bg-white/80"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      编程语言
                    </label>
                    <input
                      type="text"
                      value={formData.language}
                      onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                      placeholder="如：JavaScript"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 placeholder:text-gray-400 bg-white/80"
                    />
                  </div>
                </div>

                {/* 描述 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    描述
                  </label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="简单描述这个代码片段的用途"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 placeholder:text-gray-400 bg-white/80"
                  />
                </div>

                {/* 代码内容 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    代码内容
                  </label>
                  <textarea
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="在这里输入您的代码..."
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 placeholder:text-gray-400 font-mono text-sm resize-none bg-white/80"
                  />
                </div>

                {/* 按钮 */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 px-6 py-3 text-gray-600 bg-white/70 border border-gray-200 rounded-xl hover:bg-white/90 hover:border-gray-300 transition-all duration-200 font-medium"
                  >
                    取消
                  </button>
                  <button
                    type="button"
                    onClick={handleAddCode}
                    disabled={!formData.name?.trim() || !formData.code?.trim()}
                    className="flex-1 px-6 py-3 text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-sm hover:shadow-md disabled:shadow-none"
                  >
                    添加
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 代码片段列表 */}
          {props.snippets.map((snippet) => {
            const isCurrentSnippet = props.currentSnippet?.id === snippet.id
            return (
              <div
                key={snippet.id}
                className={`relative p-4 mb-3 rounded-xl border-[2px] cursor-pointer transition-all duration-200 group shadow-sm overflow-hidden ${isCurrentSnippet
                    ? 'border-blue-300 bg-blue-50/30 shadow-md'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/30 bg-white hover:shadow-md'
                  }`}
                  onClick={() => props.onSelectSnippet(snippet)}
              >
                {/* 内容层 */}
                <div className="relative flex gap-3 min-w-0">
                  <div className="flex-1 min-w-0">
                    {/* 标题和类型 */}
                    <div className="flex items-center justify-between mb-2 gap-3">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors truncate flex-1 min-w-0">
                        {snippet.name}
                      </h3>
                      <span className={`px-3 py-1 text-xs rounded-lg font-medium border flex-shrink-0 ${getTypeColor(snippet.language)}`}>
                        {snippet.language}
                      </span>
                    </div>

                    {/* 副标题 */}
                    <p className="text-sm text-gray-500 mb-3 line-clamp-1">{snippet.description}</p>
                    
                    {/* 内容预览 */}
                    <div className="text-sm text-gray-600 font-mono bg-gray-50 p-3 rounded-lg border border-gray-100 group-hover:border-gray-200 transition-all duration-200 overflow-hidden max-h-20">
                      <div className="line-clamp-3 whitespace-pre-wrap break-words overflow-hidden text-ellipsis">
                        {snippet.code}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 删除按钮触发区域 - 1rem范围内hover显示 */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center group/delete">
                  <button 
                    className="border-2 border-red-500 opacity-0 group-hover/delete:opacity-100 p-2 hover:bg-red-50 rounded-lg transition-all duration-400 transform hover:scale-110 hover:rotate-12 flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteSnippet(snippet)
                    }}
                    title="删除代码片段"
                  >
                    <DeleteIcon className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CodeList 
