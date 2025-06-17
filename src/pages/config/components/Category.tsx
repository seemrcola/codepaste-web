import { useState } from 'react'
import AddIcon from './svg/AddIcon'
import ExportIcon from './svg/ExportIcon'
import CategoryIcon from './svg/CategoryIcon'
import type { Category } from '@/db'
import { confirm } from '@/components/ui/Confirm'
import CategoryItem from "@/pages/config/components/CategoryItem.tsx";

interface SidebarProps {
  categories: Category[]
  currentCategory: Category | null
  onSelectCategory: (category: Category) => void
  onAddCategory: (category: Category) => void
  onDeleteCategory: (category: Category) => void
  onUpdateCategory: (category: Category) => void
}

function Sidebar(props: SidebarProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null)
  const [editingCategoryName, setEditingCategoryName] = useState('')

  // 处理添加新分类
  const handleAddCategory = () => {
    props.onAddCategory({
      name: newCategoryName,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    handleCancelAdd()
  }

  // 处理取消添加
  const handleCancelAdd = () => {
    setNewCategoryName('')
    setShowAddForm(false)
  }

  // 处理删除分类
  const handleDeleteCategory = async (category: Category) => {
    const result = await confirm({
      title: '确认删除',
      message: '确定要删除该分类吗？删除分类会删除该分类下的所有笔记。',
      confirmText: '删除',
      cancelText: '取消',
      confirmButtonType: 'danger'
    })
    if (result.confirmed) {
      await props.onDeleteCategory(category)
    }
  }

  // 处理开始编辑分类
  const handleStartEdit = (category: Category) => {
    setEditingCategoryId(category.id!)
    setEditingCategoryName(category.name)
  }

  // 处理保存编辑
  const handleSaveEdit = async () => {
    if (editingCategoryId && editingCategoryName.trim()) {
      const categoryToUpdate = props.categories.find(c => c.id === editingCategoryId)
      if (categoryToUpdate) {
        await props.onUpdateCategory({
          ...categoryToUpdate,
          name: editingCategoryName.trim(),
          updatedAt: new Date()
        })
      }
    }
    handleCancelEdit()
  }

  // 处理取消编辑
  const handleCancelEdit = () => {
    setEditingCategoryId(null)
    setEditingCategoryName('')
  }

  return (
    <div className="h-full flex flex-col">
      {/* 头部 */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-sm">
              <CategoryIcon className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">分类列表</h2>
          </div>
          <div className="flex items-center gap-3">
            <button 
              className="p-1 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer border-2 border-blue-400"
              onClick={() => setShowAddForm(true)}
              title="添加分类"
            >
              <AddIcon className="w-5 h-5 text-blue-600" />
            </button>
            <button 
              className="p-1 bg-green-50 hover:bg-green-100 rounded-lg transition-colors cursor-pointer border-2 border-green-400"
              title="导出数据"
            >
              <ExportIcon className="w-5 h-5 text-green-600" />
            </button>
          </div>
        </div>
      </div>

      {/* 添加分类表单 */}
      {showAddForm && (
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-violet-50 via-blue-50 to-cyan-50 animate-slideDown">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-violet-600 animate-fadeIn">
              <div className="animate-bounce">
                <AddIcon className="w-4 h-4" />
              </div>
              <span className="font-medium">添加新分类</span>
            </div>
            <button 
              onClick={handleCancelAdd}
              className="text-violet-400 hover:text-violet-600 hover:rotate-90 transition-all duration-300 transform hover:scale-110"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-3 animate-fadeInUp">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="请输入分类名称"
              className="w-full px-4 py-3 text-gray-600 border-2 border-violet-200 rounded-xl focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all duration-300 transform focus:scale-105 bg-white/80 backdrop-blur-sm"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddCategory()
                }
              }}
            />
            
            <div className="flex gap-3">
              <button
                onClick={handleCancelAdd}
                className="flex-1 px-4 py-2.5 text-gray-600 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-white/80 hover:shadow-md transform hover:scale-105 transition-all duration-200 border border-gray-200"
              >
                取消
              </button>
              <button
                onClick={handleAddCategory}
                disabled={!newCategoryName.trim()}
                className="flex-1 px-4 py-2.5 text-white bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl hover:from-green-600 hover:to-emerald-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none"
              >
                添加
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 分类列表 */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-2">
          { props.categories.map((category) => (<CategoryItem
            key={category.id}
            category={category}
            editingCategoryId={editingCategoryId}
            editingCategoryName={editingCategoryName}
            onSelectCategory={props.onSelectCategory}
            currentCategory={props.currentCategory}
            setEditingCategoryName={setEditingCategoryName}
            handleSaveEdit={handleSaveEdit}
            handleCancelEdit={ handleCancelEdit}
            handleStartEdit={handleStartEdit}
            handleDeleteCategory={handleDeleteCategory}
          />))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar 
