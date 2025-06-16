import { createContext, useContext } from 'react'
import type { Category, Snippet } from '@/db'
import { getAllCategories, addCategory, deleteCategory, updateCategory } from '@/db'

const CodeContext = createContext({
  currentCategory: null as Category | null,
  currentSnippet: null as Snippet | null,
  categories: [] as Category[],
  snippets: [] as Snippet[],
})

function useCodeContext() {
  const context = useContext(CodeContext)
  if (!context) {
    throw new Error('useCodeContext must be used within a CodeProvider')
  }

  // #region 分类操作
  const setCurrentCategory = (category: Category) => {
    context.currentCategory = category
  }

  const handleAddCategory = async (category: Category) => {
    await addCategory(category)
    context.categories = await getAllCategories()
  }

  const handleDeleteCategory = async (category: Category) => {
    await deleteCategory(category.id!)
    context.categories = await getAllCategories()
  }

  const handleUpdateCategory = async (category: Category) => {
    await updateCategory(category)
    context.categories = await getAllCategories()
  }
  // #endregion

  return {
    ...context,
    setCurrentCategory,
    handleAddCategory,
    handleDeleteCategory,
    handleUpdateCategory,
  }
}

export {
  useCodeContext,
  CodeContext,
}
