import Sidebar from './components/Sidebar'
import CodeList from './components/CodeList'
import CodeEditor from './components/CodeEditor'
import { useState, useEffect } from 'react'
import type { Category, Snippet } from '@/db'
import { 
  getAllCategories, 
  addCategory, 
  deleteCategory, 
  updateCategory,
  getSnippetsByCategory,
  addSnippet,
  deleteSnippet,
  searchSnippets,
  updateSnippet
} from '@/db'

function ConfigPage() {
  console.log('render ConfigPage')

  // 所有数据操作统一在这里处理
  const [categories, setCategories] = useState<Category[]>([])
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null)

  const [snippets, setSnippets] = useState<Snippet[]>([])
  const [currentSnippet, setCurrentSnippet] = useState<Snippet | null>(null)

  // 全屏状态
  const [isFullscreen, setIsFullscreen] = useState(false)

  // 切换全屏
  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // ######## categories ########

  useEffect(() => { 
    fetchCategories('init')
  }, [])

  // 获取分类列表
  const fetchCategories = async (mode: 'init' | 'del' | 'add' | 'update', id?: number) => {
    const categories = await getAllCategories()
    setCategories(categories)
    if(mode === 'init') {
      setCurrentCategory(categories[0] || null)
    }
    if(mode === 'add') {
      setCurrentCategory(categories[categories.length - 1] || null)
    }
    if(mode === 'del') {
      // 如果是删除别的分类 则什么也不变
      if(id !== currentCategory?.id) return
      // 如果是删除当前分类 则重置为第一个分类
      setCurrentCategory(categories[0] || null)
    }
    if(mode === 'update') {
      // nothing to do
    }
  }

  // 添加分类
  const handleAddCategory = async (category: Category) => {
    await addCategory(category)
    fetchCategories('add', category.id)
  }

  // 删除分类
  const handleDeleteCategory = async (category: Category) => {
    await deleteCategory(category.id!)
    fetchCategories('del', category.id)
  }

  // 更新分类
  const handleUpdateCategory = async (category: Category) => {
    await updateCategory(category)
    fetchCategories('update', category.id)
  }

  // ######## snippets ########
  useEffect(() => {
    if (currentCategory) {
      fetchSnippets(currentCategory.id!, 'init')
    }
    else {
      setSnippets([])
      setCurrentSnippet(null)
    }
  }, [currentCategory])

  // 获取代码片段列表
  const fetchSnippets = async (categoryId: number, mode: 'init' | 'add' | 'del' | 'update', id?: number) => {
    const snippets = await getSnippetsByCategory(categoryId)
    setSnippets(snippets)
    
    if(mode === 'init') {
      setCurrentSnippet(snippets[0] || null)
    }
    if(mode === 'add') {
      setCurrentSnippet(snippets[snippets.length - 1] || null)
    }
    if(mode === 'del') {
      // 如果是删除别的代码片段 则什么也不变
      if(id !== currentSnippet?.id) return
      // 如果是删除当前代码片段 则重置为第一个代码片段
      setCurrentSnippet(snippets[0] || null)
    }
    if(mode === 'update') {
      // nothing to do
    }
  }

  const handleAddSnippet = async (snippet: Partial<Snippet>) => {
    await addSnippet({
      ...snippet,
      categoryId: currentCategory!.id,
      createdAt: new Date(),
      updatedAt: new Date()
    } as Snippet)
    fetchSnippets(currentCategory!.id!, 'add')
  }

  const handleDeleteSnippet = async (snippet: Snippet) => {
    await deleteSnippet(snippet.id!)
    fetchSnippets(currentCategory!.id!, 'del', snippet.id)
  }

  const handleSearchSnippets = async (query: string) => {
    const snippets = await searchSnippets(query, currentCategory!.id)
    setSnippets(snippets)
  }

  const handleUpdateSnippet = async (snippet: Snippet) => {
    await updateSnippet(snippet)
    fetchSnippets(currentCategory!.id!, 'update', snippet.id)
  }

  return (
    <div className="h-screen bg-gray-50 p-6">
      <div className='h-full border-2 border-blue-400 box-shadow-lg rounded-lg flex overflow-hidden'>
        {/* 左侧边栏 - 分类列表 */}
        <div className={`bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300 ${
          isFullscreen ? 'w-0 opacity-0 overflow-hidden' : 'w-64 opacity-100'
        }`}>
          <Sidebar 
            categories={categories}
            currentCategory={currentCategory}
            onSelectCategory={setCurrentCategory}
            onAddCategory={handleAddCategory}
            onDeleteCategory={handleDeleteCategory}
            onUpdateCategory={handleUpdateCategory}
          />
        </div>

        {/* 中间 - 代码片段列表 */}
        <div className={`bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300 ${
          isFullscreen ? 'w-0 opacity-0 overflow-hidden' : 'w-96 opacity-100'
        }`}>
          <CodeList 
            snippets={snippets}
            currentCategory={currentCategory}
            currentSnippet={currentSnippet}
            onSelectSnippet={setCurrentSnippet}
            onAddSnippet={handleAddSnippet}
            onDeleteSnippet={handleDeleteSnippet}
            onSearchSnippets={handleSearchSnippets}
          />
        </div>

        {/* 右侧 - 代码编辑器 */}
        <div className="flex-1 bg-white transition-all duration-300">
          <CodeEditor 
            currentSnippet={currentSnippet}
            onUpdateSnippet={handleUpdateSnippet}
            isFullscreen={isFullscreen}
            onToggleFullscreen={handleToggleFullscreen}
          />
        </div>
      </div>
    </div>
  )
}

export default ConfigPage
