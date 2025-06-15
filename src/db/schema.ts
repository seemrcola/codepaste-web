import { STORES } from './config'

// 数据类型定义
export interface Category {
  id?: number
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface Snippet {
  id?: number
  name: string
  code: string
  language: string
  description: string
  categoryId: number
  createdAt: Date
  updatedAt: Date
}

/**
 * 创建数据库表结构
 * @param db IDBDatabase实例
 */
export function createTables(db: IDBDatabase): void {
  // 创建分类表
  if (!db.objectStoreNames.contains(STORES.CATEGORIES)) {
    const categoryStore = db.createObjectStore(STORES.CATEGORIES, {
      keyPath: 'id',
      autoIncrement: true
    })
    
    // 创建索引
    categoryStore.createIndex('name', 'name', { unique: true })
    categoryStore.createIndex('createdAt', 'createdAt', { unique: false })
    
    console.log('分类表创建成功')
  }

  // 创建代码片段表
  if (!db.objectStoreNames.contains(STORES.SNIPPETS)) {
    const snippetStore = db.createObjectStore(STORES.SNIPPETS, {
      keyPath: 'id',
      autoIncrement: true
    })
    
    // 创建索引
    snippetStore.createIndex('name', 'name', { unique: false })
    snippetStore.createIndex('categoryId', 'categoryId', { unique: false })
    snippetStore.createIndex('language', 'language', { unique: false })
    snippetStore.createIndex('createdAt', 'createdAt', { unique: false })
    
    console.log('代码片段表创建成功')
  }
}

/**
 * 初始化默认数据
 * @param db IDBDatabase实例
 */
export async function initDefaultData(db: IDBDatabase): Promise<void> {
  try {
    // 检查是否已有数据
    const transaction = db.transaction([STORES.CATEGORIES], 'readonly')
    const store = transaction.objectStore(STORES.CATEGORIES)
    const countRequest = store.count()
    
    countRequest.onsuccess = () => {
      console.log('检查分类表是否存在', countRequest.result)
    }
  } catch (error) {
    console.error('初始化默认数据失败:', error)
  }
}

export default {
  createTables,
  initDefaultData
} 
