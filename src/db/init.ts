import { DB_NAME, DB_VERSION } from './config'
import { createTables } from './schema'

// 数据库实例
let dbInstance: IDBDatabase | null = null

/**
 * 初始化IndexedDB数据库
 * @returns Promise<IDBDatabase>
 */
export function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    // 如果数据库已经初始化，直接返回
    if (dbInstance) {
      resolve(dbInstance)
      return
    }

    // 检查浏览器是否支持IndexedDB
    if (!window.indexedDB) {
      reject(new Error('当前浏览器不支持IndexedDB'))
      return
    }

    // 打开数据库
    const request = window.indexedDB.open(DB_NAME, DB_VERSION)

    // 数据库升级/创建时的回调
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      console.log('正在创建/升级数据库...')
      
      // 创建表结构
      createTables(db)
    }

    // 数据库打开成功
    request.onsuccess = (event) => {
      dbInstance = (event.target as IDBOpenDBRequest).result
      console.log('数据库初始化成功')
      
      // 监听数据库意外关闭
      dbInstance.onclose = () => {
        console.warn('数据库连接已关闭')
        dbInstance = null
      }
      
      // 监听数据库版本变化
      dbInstance.onversionchange = () => {
        console.warn('数据库版本已更新，请刷新页面')
        dbInstance?.close()
        dbInstance = null
      }
      
      resolve(dbInstance)
    }

    // 数据库打开失败
    request.onerror = (event) => {
      const error = (event.target as IDBOpenDBRequest).error
      console.error('数据库初始化失败:', error)
      reject(error)
    }

    // 数据库被阻塞（通常是其他标签页正在使用旧版本）
    request.onblocked = () => {
      console.warn('数据库升级被阻塞，请关闭其他标签页')
      reject(new Error('数据库升级被阻塞'))
    }
  })
}

/**
 * 获取数据库实例
 * @returns Promise<IDBDatabase>
 */
export async function getDB(): Promise<IDBDatabase> {
  if (dbInstance) {
    return dbInstance
  }
  return await initDB()
}

/**
 * 关闭数据库连接
 */
export function closeDB(): void {
  if (dbInstance) {
    dbInstance.close()
    dbInstance = null
    console.log('数据库连接已关闭')
  }
}

/**
 * 删除数据库
 * @returns Promise<void>
 */
export function deleteDB(): Promise<void> {
  return new Promise((resolve, reject) => {
    // 先关闭现有连接
    closeDB()
    
    const deleteRequest = window.indexedDB.deleteDatabase(DB_NAME)
    
    deleteRequest.onsuccess = () => {
      console.log('数据库删除成功')
      resolve()
    }
    
    deleteRequest.onerror = () => {
      const error = new Error('数据库删除失败')
      console.error('数据库删除失败:', error)
      reject(error)
    }
    
    deleteRequest.onblocked = () => {
      console.warn('数据库删除被阻塞，请关闭所有标签页')
      reject(new Error('数据库删除被阻塞'))
    }
  })
}

export default {
  initDB,
  getDB,
  closeDB,
  deleteDB
} 
