import { getDB } from './init'
import { STORES } from './config'
import type { Category, Snippet } from './schema'

// =============分类操作=============

/**
 * 获取所有分类
 */
export async function getAllCategories(): Promise<Category[]> {
  const db = await getDB()
  return new Promise((resolve, reject) => {
    // 创建事务
    const transaction = db.transaction([STORES.CATEGORIES], 'readonly')
    // 获取对象存储
    const store = transaction.objectStore(STORES.CATEGORIES)
    // 获取所有数据
    const request = store.getAll()
    
    request.onsuccess = () => {
      resolve(request.result)
    }
    
    request.onerror = () => {
      reject(new Error('获取分类列表失败'))
    }
  })
}

/**
 * 根据ID获取分类
 */
export async function getCategoryById(id: number): Promise<Category | null> {
  const db = await getDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.CATEGORIES], 'readonly')
    const store = transaction.objectStore(STORES.CATEGORIES)
    const request = store.get(id)
    
    request.onsuccess = () => {
      resolve(request.result || null)
    }
    
    request.onerror = () => {
      reject(new Error('获取分类失败'))
    }
  })
}

/**
 * 添加分类
 */
export async function addCategory(category: Omit<Category, 'id'>): Promise<number> {
  const db = await getDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.CATEGORIES], 'readwrite')
    const store = transaction.objectStore(STORES.CATEGORIES)
    const request = store.add(category)
    
    request.onsuccess = () => {
      resolve(request.result as number)
    }
    
    request.onerror = () => {
      reject(new Error('添加分类失败'))
    }
  })
}

/**
 * 更新分类
 */
export async function updateCategory(category: Category): Promise<void> {
  const db = await getDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.CATEGORIES], 'readwrite')
    const store = transaction.objectStore(STORES.CATEGORIES)
    const request = store.put({ ...category, updatedAt: new Date() })
    
    request.onsuccess = () => {
      resolve()
    }
    
    request.onerror = () => {
      reject(new Error('更新分类失败'))
    }
  })
}

/**
 * 删除分类
 */
export async function deleteCategory(id: number): Promise<void> {
  const db = await getDB()

  // 删除分类下的代码片段
  try {
    const snippets = await getSnippetsByCategory(id)
    const promises = snippets.map(snippet => deleteSnippet(snippet.id!))
    await Promise.all(promises)
  } catch (error) {
    console.error('删除分类下的代码片段失败', error)
    return
  }

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.CATEGORIES], 'readwrite')
    const store = transaction.objectStore(STORES.CATEGORIES)
    const request = store.delete(id)
    
    request.onsuccess = () => {
      resolve()
    }
    
    request.onerror = () => {
      reject(new Error('删除分类失败'))
    }
  })
}

// =============代码片段操作=============

/**
 * 获取所有代码片段
 */
export async function getAllSnippets(): Promise<Snippet[]> {
  const db = await getDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.SNIPPETS], 'readonly')
    const store = transaction.objectStore(STORES.SNIPPETS)
    const request = store.getAll()
    
    request.onsuccess = () => {
      resolve(request.result)
    }
    
    request.onerror = () => {
      reject(new Error('获取代码片段列表失败'))
    }
  })
}

/**
 * 根据分类ID获取代码片段
 */
export async function getSnippetsByCategory(categoryId: number): Promise<Snippet[]> {
  const db = await getDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.SNIPPETS], 'readonly')
    const store = transaction.objectStore(STORES.SNIPPETS)
    const index = store.index('categoryId')
    const request = index.getAll(categoryId)
    
    request.onsuccess = () => {
      resolve(request.result)
    }
    
    request.onerror = () => {
      reject(new Error('获取分类下的代码片段失败'))
    }
  })
}

/**
 * 根据ID获取代码片段
 */
export async function getSnippetById(id: number): Promise<Snippet | null> {
  const db = await getDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.SNIPPETS], 'readonly')
    const store = transaction.objectStore(STORES.SNIPPETS)
    const request = store.get(id)
    
    request.onsuccess = () => {
      resolve(request.result || null)
    }
    
    request.onerror = () => {
      reject(new Error('获取代码片段失败'))
    }
  })
}

/**
 * 搜索代码片段
 */
export async function searchSnippets(query: string, categoryId?: number): Promise<Snippet[]> {
  const snippets = await getAllSnippets()
  const lowerQuery = query.toLowerCase()
  let filteredSnippets = snippets.filter(snippet => 
    snippet.name.toLowerCase().includes(lowerQuery) ||
    snippet.code.toLowerCase().includes(lowerQuery) ||
    snippet.description.toLowerCase().includes(lowerQuery)
  )
  if (categoryId) {
    filteredSnippets = filteredSnippets.filter(snippet => snippet.categoryId === categoryId)
  }
  return filteredSnippets
}

/**
 * 根据编程语言获取代码片段
 */
export async function getSnippetsByLanguage(language: string): Promise<Snippet[]> {
  const db = await getDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.SNIPPETS], 'readonly')
    const store = transaction.objectStore(STORES.SNIPPETS)
    const index = store.index('language')
    const request = index.getAll(language)
    
    request.onsuccess = () => {
      resolve(request.result)
    }
    
    request.onerror = () => {
      reject(new Error('获取指定语言的代码片段失败'))
    }
  })
}

/**
 * 添加代码片段
 */
export async function addSnippet(snippet: Omit<Snippet, 'id'>): Promise<number> {
  const db = await getDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.SNIPPETS], 'readwrite')
    const store = transaction.objectStore(STORES.SNIPPETS)
    const request = store.add(snippet)
    
    request.onsuccess = () => {
      resolve(request.result as number)
    }
    
    request.onerror = () => {
      reject(new Error('添加代码片段失败'))
    }
  })
}

/**
 * 更新代码片段
 */
export async function updateSnippet(snippet: Snippet): Promise<void> {
  const db = await getDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.SNIPPETS], 'readwrite')
    const store = transaction.objectStore(STORES.SNIPPETS)
    const request = store.put({ ...snippet, updatedAt: new Date() })
    
    request.onsuccess = () => {
      resolve()
    }
    
    request.onerror = () => {
      reject(new Error('更新代码片段失败'))
    }
  })
}

/**
 * 删除代码片段
 */
export async function deleteSnippet(id: number): Promise<void> {
  const db = await getDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.SNIPPETS], 'readwrite')
    const store = transaction.objectStore(STORES.SNIPPETS)
    const request = store.delete(id)
    
    request.onsuccess = () => {
      resolve()
    }
    
    request.onerror = () => {
      reject(new Error('删除代码片段失败'))
    }
  })
}

/**
 * 批量删除分类下的所有代码片段
 */
export async function deleteSnippetsByCategory(categoryId: number): Promise<void> {
  const snippets = await getSnippetsByCategory(categoryId)
  const promises = snippets.map(snippet => deleteSnippet(snippet.id!))
  await Promise.all(promises)
}

// =============统计操作=============

/**
 * 获取分类统计信息
 */
export async function getCategoryStats(): Promise<{ categoryId: number; count: number }[]> {
  const snippets = await getAllSnippets()
  const stats = new Map<number, number>()
  
  snippets.forEach(snippet => {
    const count = stats.get(snippet.categoryId) || 0
    stats.set(snippet.categoryId, count + 1)
  })
  
  return Array.from(stats.entries()).map(([categoryId, count]) => ({
    categoryId,
    count
  }))
}

/**
 * 获取编程语言统计信息
 */
export async function getLanguageStats(): Promise<{ language: string; count: number }[]> {
  const snippets = await getAllSnippets()
  const stats = new Map<string, number>()
  
  snippets.forEach(snippet => {
    const count = stats.get(snippet.language) || 0
    stats.set(snippet.language, count + 1)
  })
  
  return Array.from(stats.entries()).map(([language, count]) => ({
    language,
    count
  }))
}

export default {
  // 分类操作
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
  
  // 代码片段操作
  getAllSnippets,
  getSnippetsByCategory,
  getSnippetById,
  searchSnippets,
  getSnippetsByLanguage,
  addSnippet,
  updateSnippet,
  deleteSnippet,
  deleteSnippetsByCategory,
  
  // 统计操作
  getCategoryStats,
  getLanguageStats
} 
